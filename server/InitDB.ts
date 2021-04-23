import Category from './models/Category'

// init values of categories
export const categories = [
  { name: 'arts' },
  { name: 'biographies' },
  { name: 'business' },
  { name: 'comics' },
  { name: 'cooking' },
  { name: 'education' },
  { name: 'health' },
  { name: 'history' },
  { name: 'horror' },
  { name: 'math' },
  { name: 'medical' },
  { name: 'philosophy' },
  { name: 'religion' },
  { name: 'sci-fi' },
  { name: 'science' },
  { name: 'sports' },
  { name: 'travel' },
]

/**
 * return array of category names
 *
 * @param categories array of category objects
 */
const toNames = (categories: Array<{ name: string }>) => {
  const result: Array<string> = []
  categories.forEach((category) => {
    result.push(category.name)
  })
  return result
}

/**
 * initialize mongoDB
 */
const initDB = async () =>
  new Promise((resolve) => {
    console.log('initializing Categories...')
    Category.find({ name: { $in: toNames(categories) } }, (err, dbCategories) => {
      if (err) console.log(err)
      let diff: Array<{ name: string }> = []
      if (dbCategories) {
        diff = categories.filter(
          // only in categories
          (category) => !dbCategories.some((dbCategory) => (dbCategory as any).name === category.name),
        )
      }
      diff.forEach((category) => {
        Category.create(category, (err, results) => {
          if (err) console.log(err)
          console.log(results)
          console.log('Category initialized')
          resolve(true)
        })
      })
      if (!diff.length) resolve(true)
    })
  })

export default initDB
