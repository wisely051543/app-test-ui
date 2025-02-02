/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { TagIcon, FolderIcon } from '@heroicons/react/24/solid'
import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Category from '@/components/Category'
import siteMetadata from '@/data/siteMetadata'

import catgData from 'app/category-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

function ActiveLink({ children, slugKey }: { children: React.ReactNode; slugKey: string }) {
  const pathname = usePathname()

  return decodeURI(pathname.split('/categories/')[1]) === slug(slugKey) ? (
    <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">{children}</h3>
  ) : (
    <Link
      href={`/categories/${slug(slugKey)}`}
      className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
      aria-label={`View posts tagged ${slugKey}`}
    >
      {children}
    </Link>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const catgCounts = catgData.catgCount as Record<string, number>
  const catgRel = catgData.catgRel as Record<string, string[]>

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  const catgRelKeys = Object.keys(catgRel)
  const sortedRelCatgs = catgRelKeys.sort((a, b) => a.localeCompare(b))

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-12">
          <div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags, categories } = post
                return (
                  <li key={path} className="py-5">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </Link>
                          </h2>
                          <dl>
                            <dt className="sr-only">Published on</dt>
                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                              <time dateTime={date} suppressHydrationWarning>
                                {formatDate(date, siteMetadata.locale)}
                              </time>
                            </dd>
                          </dl>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
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
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="px-6 py-4">
              <Link
                href={`/categories`}
                className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
              >
                全部分類
              </Link>
              <ul>
                {sortedRelCatgs.map((city) => {
                  return (
                    <li key={city} className="my-3">
                      <ul>
                        <ActiveLink slugKey={city}>{`${city} (${catgCounts[city]})`}</ActiveLink>
                        {catgRel[city].map((dist) => {
                          return (
                            <li key={dist} className="my-3 pl-4">
                              <ActiveLink
                                slugKey={dist}
                              >{`${dist} (${catgCounts[dist]})`}</ActiveLink>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
