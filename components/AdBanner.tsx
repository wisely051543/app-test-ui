'use client'

import { useEffect, useState } from 'react'

const AdBanner = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 568) // Adjust the threshold as needed
    }

    handleResize() // Check the screen size on initial render
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const adContainer = document.getElementById('ad-container')
    if (!adContainer) return

    const adOptions = isLargeScreen
      ? {
          key: '9e6959592706f59d38d709e352feb3d0',
          format: 'iframe',
          height: 60,
          width: 468,
        }
      : {
          key: '14809a155122295bd8e02c975cc28175',
          format: 'iframe',
          height: 250,
          width: 300,
        }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.innerHTML = `
      atOptions = ${JSON.stringify(adOptions)};
    `
    adContainer.appendChild(script)

    const invokeScript = document.createElement('script')
    invokeScript.type = 'text/javascript'
    invokeScript.src = `//www.topcreativeformat.com/${adOptions.key}/invoke.js`
    adContainer.appendChild(invokeScript)

    return () => {
      adContainer.innerHTML = ''
    }
  }, [isLargeScreen])

  return <div id="ad-container" className="flex h-[250px] w-[100%] justify-center md:h-[60px]" />
}

export default AdBanner
