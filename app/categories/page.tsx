import Link from '@/components/Link'
import Category from '@/components/Category'
import { slug } from 'github-slugger'
import catgData from 'app/category-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const catgCounts = catgData.catgCount as Record<string, number>
  const catgKeys = Object.keys(catgCounts)
  const sortedCatg = catgKeys.sort((a, b) => a.localeCompare(b))

  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            分類
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {catgKeys.length === 0 && 'No categories found.'}
          {sortedCatg.map((t) => {
            return (
              <div key={t} className="mb-2 mr-5 mt-2">
                <Category text={t} />
                <Link
                  href={`/categories/${slug(t)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                  aria-label={`View posts tagged ${t}`}
                >
                  {` (${catgCounts[t]})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}