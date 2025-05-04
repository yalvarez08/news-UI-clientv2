import React from 'react'
import './ArticleModal.css'

// function for modal view when user selects article
const ArticleModal = ({ show, article, onClose }) => {
  if (!show) { // if show is false, render nothing
    return null
  }
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
            <p className='modal-source'>Source: {article.sources}</p>
            <p className='modal-date'>{new Date(article.created_at).toLocaleString(
              'en-US', {
              month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
            }
            )}
            </p>
            <p className='modal-articleText'>
              {article.summary && `${article.summary}...`}
            </p>
            <a href={article.sources} target='_blank'
              rel='noopener noreferrer' className='continue-read'>
              Read more
            </a>
          </>
        )}
      </div>
    </div>
  )
}

export default ArticleModal
