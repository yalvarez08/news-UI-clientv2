import React, { useEffect, useState } from 'react'
import ArticleModal from './ArticleModal'
import './News.css'
import axios from 'axios'

const categories = ['Science', 'Technology', 'Sports', 'Business', 'Health']

// function for the news homepage
const News = () => {

    const [headline, setHeadline] = useState(null)
    const [news, setNews] = useState([])
    const [categoryOpt, setCategoryOpt] = useState('Science')
    const [showModal, setShowModal] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState(null)
    const apiKey = import.meta.env.VITE_API_KEY

    // fetch data to render updated news data
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const url = `https://eventregistry.org/api/v1/article/getArticles?apiKey=${apiKey}&categoryUri=news/${categoryOpt}&lang=eng`
                // wait for response from server to proceed with get request
                const response = await axios.get(url)

                const fetchedNews = response.data.articles?.results || []

                fetchedNews.forEach((article) => {
                    if (!article.image) {
                        article.image = 'image not available' // display if article has no image
                    }
                })
                setHeadline(fetchedNews[0])
                setNews(fetchedNews.slice(1, 7))
                console.log(fetchedNews)
            } catch (error) {
                console.error('Error fetching news:', error)
            }
        }

        fetchNews()
    }, [categoryOpt])

    // function which handles user interaction when selecting a news category 
    const handleSelectedCategory = (e, category) => {
        e.preventDefault()
        setCategoryOpt(category) // sets the category state to the one selected by user
    }

    // function which handles user interaction when selecting an article
    const handleSelectedArticle = (article) => {
        setSelectedArticle(article)
        setShowModal(true)
    }

    return (
        <div className="news-app">
            <div className="news-header">
                <h1 className='logo'>Capstone News App</h1>
            </div>
            <div className='news-content'>
                <nav className='nav-bar'>
                    <h1 className='nav-heading'>
                        Categories
                    </h1>
                    <div className='categories'>
                        {categories.map((category) => (
                            <a href="#" className='nav-link'
                                key={category} onClick={(e) => handleSelectedCategory(e, category)}>
                                {category}
                            </a>
                        ))}
                    </div>
                </nav>
                <div className='news-section'>
                    {headline && (
                        <div className='headline'
                            onClick={() => handleSelectedArticle(headline)}>
                            <img src={headline.image} alt={headline.title} />
                            <h2 className='headline-title'>
                                {headline.title}
                            </h2>
                        </div>
                    )}

                    <div className='news-grid'>
                        {news.map((article, index) => (
                            <div className='grid-item'
                                key={index}
                                onClick={() => handleSelectedArticle(article)}>
                                <img src={article.image} alt={article.title} />
                                <h3>{article.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
                <ArticleModal show={showModal} article={selectedArticle}
                    onClose={() => setShowModal(false)} />
            </div>
            <footer>
                <p className='foot-cpyrt'>
                    <span>AI News Aggregator</span>
                </p>
                <p>&copy; All Rights Reserved. By CMSC495 Group 5.</p>
            </footer>
        </div>
    )
}

export default News