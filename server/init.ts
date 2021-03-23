import Category from './models/Category'
// {name: 'Music'},
const categories = [
  { name: 'Arts' },
  { name: 'Biographies' },
  { name: 'Business' },
  { name: 'Comics' },
  { name: 'Computers & Tech' },
  { name: 'Cooking' },
  { name: 'Education' },
  { name: 'Fiction' },
  { name: 'Health & Fitness' },
  { name: 'History' },
  { name: 'Horror' },
  { name: 'Literatrue' },
  { name: 'Math' },
  { name: 'Medical' },
  { name: 'Philosophy' },
  { name: 'Religion' },
  { name: 'Sci-Fi' },
  { name: 'Science' },
  { name: 'Social Science' },
  { name: 'Sports' },
  { name: 'Travel' },
]

const initDB = async () =>
  new Promise((resolve) => {
    console.log('initializing Categories...')
    Category.create(categories, (err, docs) => {
      if (err) console.log(err)
      console.log(docs)
      console.log('Category initialized')
      resolve(docs)
    })
  })

export default initDB
