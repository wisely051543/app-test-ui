'use client'

import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./Map'), { ssr: false })

const IMap = (props) => {
  return <Map {...props} />
}

export default IMap
