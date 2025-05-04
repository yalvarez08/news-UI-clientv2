import React, { useEffect, useState } from 'react'
import News from './components/News'
import './index.css' 

const App = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  if (isMobile) {
    return (
      <div className='mobile-block'>
        <div className='construction-icon'>🚧</div>
        <h1>Under Construction!</h1>
        <h2>This application does not currently run on mobile devices.</h2>
      </div>
    )
  }

  return (
    <div className='container'>
      <News />
    </div>
  )
}

export default App
