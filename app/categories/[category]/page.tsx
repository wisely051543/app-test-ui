import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithCategories'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import catgData from 'app/category-data.json'

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  const category = decodeURI(params.category)
  return genPageMetadata({
    title: category,
    description: `${siteMetadata.title} ${category} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${category}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const catgCounts = catgData.catgCount as Record<string, number>
  const catgKeys = Object.keys(catgCounts)
  const paths = catgKeys.map((catg) => ({
    category: encodeURI(catg),
  }))
  return paths
}

export default function CatgPage({ params }: { params: { category: string } }) {
  const catgory = decodeURI(params.category)
  // Capitalize first letter and convert space to dash
  const title = catgory[0].toUpperCase() + catgory.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) => post.categories && post.categories.map((t) => slug(t)).includes(catgory)
      )
    )
  )
  if (filteredPosts.length === 0) {
    return notFound()
  }
  return <ListLayout posts={filteredPosts} title={title} />
}
