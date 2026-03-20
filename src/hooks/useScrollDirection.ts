import { useEffect, useRef, useState } from 'react'

const useScrollDirection = () => {
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setHidden(currentScrollY > lastScrollY.current && currentScrollY > 56)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return hidden
}

export default useScrollDirection
