import express, { Request, Response } from 'express'
import { callbackPromise } from 'nodemailer/lib/shared'
import bookDB from '../../models/Product'
import categoryDB from '../../models/Category'
import SpellChecker from 'spellchecker'
exports.Search = async (req, res) => {
  var keyword = req.query.keyword
  var pageNum = Number(req.query.pageNum)
  var pageSize = Number(req.query.pageSize)
  var persist = req.query.persist === 'true'
  console.log(keyword + ' ' + pageNum + ' ' + pageSize + ' ' + persist)
  var suggestion
  if (!keyword) {
    return res.status(400).send({ message: 'Enter something' })
  }
  console.log('keyword->' + keyword)
  console.log('persist -> ' + persist)
  if (persist) {
    let misspelled = SpellChecker.isMisspelled(keyword)
    if (misspelled) {
      suggestion = SpellChecker.getCorrectionsForMisspelling(keyword)[0]
      if (suggestion) keyword = suggestion
    }
  }
  console.log('keyword after check ->')
  console.log(keyword)
  const bookList = await bookDB.find().exec()
  if (bookList) {
    var foundBooks = await findBooks(bookList, keyword)
    if (foundBooks) {
      if (!(foundBooks.length < (pageNum - 1) * 10)) {
        console.log('books =>' + foundBooks)
        return res.status(200).send({
          book: foundBooks.slice((pageNum - 1) * 10, Math.min(foundBooks.length, pageNum * 20)),
          suggestion: suggestion,
        })
      }
    }
  }
  return res.status(200).send({
    book: [],
    suggestion: suggestion,
  })
}
async function findBooks(bookList, keyword) {
  console.log('keyword -> ' + keyword)
  var foundBooks
  let foundCategory = await categoryDB.findOne({ name: keyword }).exec()
  if (foundCategory) foundBooks = await bookDB.find({ categoryId: foundCategory.id }).exec()
  console.log('books->' + foundBooks)
  if (!foundBooks) {
    console.log('foundBooks')
    keyword = keyword.split(' ')
    for (let i = 0; i < bookList.length; i++) {
      let cnt = 0
      for (let j = 0; j < keyword.length; j++) {
        let s = bookList[i].name.toLowerCase().split(' ')
        let used = new Array(s.length).fill(false)
        for (let k = 0; k < s.length; k++) {
          let jw = 0
          if (used[k]) continue
          jw = await jaro_winkler(keyword[j], s[k])
          //console.log(jw + ' ' + keyword[j] + ' ' + s[k])
          if (jw > 0.7) {
            console.log('wtf?? ' + jw)
            used[k] = true
            cnt++
            break
          }
        }
      }
      console.log(cnt + '  ----  ' + keyword.length / 3)
      if (cnt > keyword.length / 3) {
        if (!foundBooks) foundBooks = []
        foundBooks.push(bookList[i])
      }
    }
  }
  return foundBooks
}
async function jaro_winkler(s1, s2) {
  if (s1 == s2 || (s2.includes(s1) && s1.length >= s2.length / 3)) return 1
  let l1 = s1.length
  let l2 = s2.length
  if (!l1 || !l2) {
    return 0
  }
  let m = 0,
    t = 0,
    dj,
    range = Math.abs(Math.floor(Math.max(l1, l2) / 2) - 1),
    match1 = new Array(s1.length),
    match2 = new Array(s2.length)
  for (let i = 0; i < l1; i++) {
    for (let j = Math.max(0, i - range); j < Math.min(l2, i + range + 1); j++) {
      if (!match1[i] && !match2[j] && s1[i] == s2[j]) {
        m++
        match1[i] = match2[j] = true
        break
      }
    }
  }
  if (!m) return 0
  let k = 0
  for (let i = 0; i < l1; i++) {
    if (match1[i])
      for (let j = k; j < l2; j++) {
        if (match2[j]) {
          k = j + 1
          break
        }
        if (s1[i] != s2[j]) {
          t++
        }
      }
  }
  t /= 2
  dj = (m / l1 + m / l2 + (m - t) / m) / 3
  if (dj >= 0.7) {
    let i, l
    i = l = 0
    while (s1[i] == s2[i] && i < Math.min(Math.min(l1, l2), 4)) {
      i++
      l++
    }
    dj = dj + l * 0.1 * (1 - dj)
  }
  return dj
}
