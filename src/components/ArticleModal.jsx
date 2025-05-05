import React, { useEffect, useRef, useState } from 'react'
import './ArticleModal.css'

// function for modal view when user selects article
const ArticleModal = ({ show, article, onClose }) => {
  const modalContentRef = useRef(null)
  const [showScrollBtn, setShowScrollBtn] = useState(false)

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [show])

  useEffect(() => {
    const handleScroll = () => {
      if (modalContentRef.current) {
        setShowScrollBtn(modalContentRef.current.scrollTop > 200)
      }
    }

    const modal = modalContentRef.current
    if (modal) modal.addEventListener('scroll', handleScroll)

    return () => {
      if (modal) modal.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  if (!show) return null

  return (  // if show is true, render full content of selected article
    <div className='modal'>
      <div className='modal-content'>
        <span className='close-btn'
          onClick={onClose}>
          <i className='fa-solid fa-xmark'></i>
        </span>
        {article && (
          <>
            <img src={article.image} alt={article.title} className='modal-img' />
            <h2 className='modal-title'>{article.title}</h2>
            <p className='modal-date'>{new Date(article.created_at).toLocaleString(
              'en-US', {
              month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
            }
            )}
            </p>
            <a className='modal-source-link'
              href={article.sources} target='_blank'
              rel='noopener noreferrer'>
              View Orginal Source
            </a>
            <p className='modal-articleText'>
              {article.content && `${article.content}`}
            </p>
          </>
        )}
        {showScrollBtn && (
          <button className='scroll-to-top-btn' onClick={scrollToTop}>
            ↑ Top
          </button>
        )}
      </div>
    </div>
  )
}

export default ArticleModal
