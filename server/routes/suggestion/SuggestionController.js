import bookDB from '../../models/Product'

exports.Suggest = async (req, res) => {
  //console.log(req.body)
  var interests = req.body.interests
  var max = req.body.max
  let selections = {}
  //console.log(interests)
  //console.log(max)
  for (let i = 0; max > 0; max--) {
    var interest = JSON.stringify(interests[Math.floor(Math.random() * interests.length)])
    if (!selections[interest]) selections[interest] = 0
    selections[interest] += 1
  }
  //console.log(selections)
  var books = []
  for (let key of Object.keys(selections)) {
    var count = selections[key]
    var category = JSON.parse(key)
    let booksOfCategory = await bookDB.find({ categoryId: category._id }).exec()
    //console.log(booksOfCategory)
    if (booksOfCategory) {
      if (booksOfCategory.length > count) {
        books.push(booksOfCategory.slice[(0, count)])
      } else books.push(booksOfCategory)
    }
  }
  return res.status(200).send(books)
}
