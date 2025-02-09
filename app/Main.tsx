import { TagIcon, FolderIcon } from '@heroicons/react/24/solid'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Category from '@/components/Category'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags, categories } = post
            return (
              <li key={slug} className="py-4">
                <article>
                  <div className="space-y-2">
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <dl>
                            <dt className="sr-only">Published on</dt>
                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                            </dd>
                          </dl>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="base text-right font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          查看更多 &rarr;
                        </Link>
                      </div>
                      <div className="flex flex-wrap items-center space-x-1">
                        {categories.length > 0 && (
                          <>
                            <FolderIcon className="size-4 text-gray-400" />
                            <div className="flex flex-wrap">
                              {categories.map((catg) => (
                                <Category key={catg} text={catg} />
                              ))}
                            </div>
                          </>
                        )}
                        {tags.length > 0 && (
                          <>
                            <TagIcon className="size-4 text-gray-400" />
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-center pt-6 text-base font-medium leading-6">
          <Link href="/blog" aria-label="All posts">
            全部文章
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
