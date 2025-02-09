import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Tag from '@/components/Tag'
import Category from '@/components/Category'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

function generateTocNumbering(toc) {
  const numbering = [] as number[]
  const result = toc.map((item) => {
    const depth = item.depth
    if (numbering.length < depth) {
      numbering.push(1)
    } else if (numbering.length === depth) {
      numbering[depth - 1]++
    } else {
      numbering.splice(depth)
      numbering[depth - 1]++
    }
    return {
      ...item,
      number: numbering.join('.'),
    }
  })
  return result
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { toc, path, date, title, tags, categories } = content
  const basePath = path.split('/')[0]
  const numberedToc = generateTocNumbering(toc)

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 sm:hidden md:block xl:col-start-1 xl:row-start-2 xl:divide-y">
                {toc && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xl uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      文章目錄
                    </h2>
                    <ol>
                      {numberedToc.map(({ value, url, number, depth }) => (
                        <li key={value}>
                          <Link
                            href={`#${value}`}
                            style={{ paddingLeft: `${depth - 1}rem` }}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          >
                            {number}. {value}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                {categories && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xl uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      分類
                    </h2>
                    <div className="flex flex-wrap">
                      {categories.map((catg) => (
                        <Category key={catg} text={catg} />
                      ))}
                    </div>
                  </div>
                )}
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xl uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      標籤
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && prev.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          上一篇文章
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          下一篇文章
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
