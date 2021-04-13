import Category from './models/Category'
// {name: 'Music'},
export const categories = [
  { name: 'arts' },
  { name: 'biographies' },
  { name: 'business' },
  { name: 'comics' },
  { name: 'computers & Tech' },
  { name: 'cooking' },
  { name: 'education' },
  { name: 'fiction' },
  { name: 'health' },
  { name: 'history' },
  { name: 'horror' },
  { name: 'literatrue' },
  { name: 'math' },
  { name: 'medical' },
  { name: 'philosophy' },
  { name: 'religion' },
  { name: 'sci-fi' },
  { name: 'science' },
  { name: 'social science' },
  { name: 'sports' },
  { name: 'travel' },
]

const toNames = (categories: Array<{ name: string }>) => {
  const result: Array<string> = []
  categories.forEach((category) => {
    result.push(category.name)
  })
  return result
}

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
