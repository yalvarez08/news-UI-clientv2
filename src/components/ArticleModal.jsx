import React from 'react'
import './ArticleModal.css'

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
                        <p className='modal-source'>Source: {article.source.name}</p>
                        <p className='modal-date'>{new Date(article.publishedAt).toLocaleString(
                            'en-US', {
                            month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        }
                        )}</p>
                        <p className='modal-articleText'>
                            {article.content}
                        </p>
                        <a href={article.url} target='_blank'
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