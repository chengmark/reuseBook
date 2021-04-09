import express, { Request, Response } from 'express'
import { callbackPromise } from 'nodemailer/lib/shared'
import bookDB from '../../models/Product'
import categoryDB from '../../models/Category'
exports.Book = async (req, res) => {
  //console.log('zashel');
  var title = req.params.searchTitle.split(' ')
  if (!title) {
    return res.status(400).send({ message: 'Enter something' })
  }

  //console.log("1");
  const dbs = await bookDB.find().exec()
  // console.log(dbs);
  if (dbs) {
    var ans = []
    for (let i = 0; i < dbs.length; i++) {
      let cnt = 0
      for (let j = 0; j < title.length; j++) {
        title[j] = title[j].toLowerCase()
        //console.log("=====>" + dbs[i].name);
        let s = dbs[i].name.toLowerCase().split(' ')
        for (let k = 0; k < s.length; k++) {
          let jw = jaro_winkler(title[j], s[k])
          if (jw > 0.7) {
            cnt++
            break
          }
        }
      }
      // console.log(title + " " + title.length + " " + cnt);
      if (cnt > title.length / 3) ans.push(dbs[i], cnt / title.length)
    }
    res.status(200).send(ans)
  }
}
exports.Category = async (req, res) => {
  //console.log('zashel');
  var title = req.params.searchTitle.split(' ')
  if (!title) {
    return res.status(400).send({ message: 'Enter something' })
  }
  //console.log("1");
  const dbs2 = await bookDB.find().exec()
  for (let i = 0; i < dbs2.length; i++) console.log('-===->' + dbs2[i].categoryId)
  const dbs = await categoryDB.find().exec()
  // console.log(dbs);
  if (dbs) {
    var ans = []
    for (let i = 0; i < dbs.length; i++) {
      let cnt = 0
      for (let j = 0; j < title.length; j++) {
        title[j] = title[j].toLowerCase()
        //console.log("=====>" + dbs[i].name);
        let s = dbs[i].name.toLowerCase().split(' ')
        for (let k = 0; k < s.length; k++) {
          let jw = jaro_winkler(title[j], s[k])
          if (jw > 0.7) {
            cnt++
            break
          }
        }
      }
      //console.log(title + " " + title.length + " " + cnt);
      if (cnt > title.length / 3) {
        //console.log(dbs[i]);
        //console.log(dbs[i].id);
        await bookDB.find({ categoryId: dbs[i].id }).then((data) => {
          for (let x = 0; x < data.length; x++) {
            let similarity = cnt / title.length
            ans.push(data[i])
          }
        })
      }
    }
    console.log(ans)
    res.status(200).send('asd  -> ' + ans)
  }
}
function jaro_winkler(s1, s2) {
  // console.log(s1+ " -- " + s2);
  //  console.log("jw1");
  if (s1 == s2 || (s2.includes(s1) && s1.length >= s2.length / 3)) return 1
  let l1 = s1.length
  let l2 = s2.length
  if (!l1 || !l2) {
    return 0
  }
  // console.log("jw2");
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
  // console.log("jw2.5");
  if (!m) return 0
  //  console.log("jw3");
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
  // console.log("jw4");
  t /= 2
  // console.log(m + " " + t + " " + l1 + " " + l2)
  dj = (m / l1 + m / l2 + (m - t) / m) / 3
  if (dj >= 0.7) {
    let i, l
    i = l = 0
    //     console.log("jw5");
    while (s1[i] == s2[i] && i < Math.min(Math.min(l1, l2), 4)) {
      i++
      l++
    }
    // console.log("jw6");
    dj = dj + l * 0.1 * (1 - dj)
  }
  // console.log(dj);
  //return dj;
}
