'use client'

import { TagCloud as NativeTagCloud } from 'react-tagcloud'

export default function TagCloud({ tags }) {
  return (
    <NativeTagCloud
      minSize={12}
      maxSize={35}
      tags={tags}
      onClick={(tag) => alert(`'${tag.value}' was selected!`)}
    />
  )
}
