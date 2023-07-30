import { useEffect, useState } from "react"

const STANDARD_MOBILE_WIDTH = 480

const useCheckIsMobile = () => {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    if (window !== undefined) {
      const handleResize = () => {
        setMobile(window.innerWidth <= STANDARD_MOBILE_WIDTH)
      }

      console.log('resizingWindow')

      window.addEventListener('resize', handleResize)

      setMobile(window.innerWidth <= STANDARD_MOBILE_WIDTH)

      return () => {
        window.removeEventListener('resize', handleResize)
      }

    } else {
      console.log('settingMobileFase')
      setMobile(false)
    }
  }, [])

  return { mobile }
}

export default useCheckIsMobile