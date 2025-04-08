import React, { useEffect, useState } from 'react'
import newsImage from '../assets/images/newsImage.jpg'
import './News.css'
import axios from 'axios'

const News = () => {

    const [headline, setHeadline] = useState(null)
    const [news, setNews] = useState([])

    // fetch data to render updated news data
    useEffect(() => {
        const fetchNews = async () => {
            const url = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&apikey=ded415d5fa27479bb6e1fda4ba11af77`
            // wait for response from server to proceed with get request
            const response = await axios.get(url)

            const fetchedNews = response.data.articles

            fetchedNews.forEach((article) => {
                if (!article.image) {
                    article.image = 'image not available' // display if article has no image
                }
            })

            setHeadline(fetchedNews[0])
            setNews(fetchedNews.slice(1, 7))

            console.log(news)
        }

        fetchNews()
    }, [])
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
                        <a href="#" className='nav-link'>Science</a>
                        <a href="#" className='nav-link'>Entertainment</a>
                        <a href="#" className='nav-link'>Sports</a>
                        <a href="#" className='nav-link'>Business</a>
                        <a href="#" className='nav-link'>Health</a>
                    </div>
                </nav>
                <div className='news-section'>
                    {headline && (
                        <div className='headline'>
                            <img src={headline.image} alt={headline.title} />
                            <h2 className='headline-title'>
                                {headline.title}
                            </h2>
                        </div>
                    )}

                    <div className='news-grid'>
                        {news.map((article, index) => (
                            <div className='grid-item'
                                key={index}>
                                <img src={article.image} alt={article.title} />
                                <h3>{article.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
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