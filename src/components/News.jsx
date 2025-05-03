import React, { useEffect, useState } from 'react'
import ArticleModal from './ArticleModal'
import './News.css'
import axios from 'axios'

// TODO: Move to get the categories from the api, hardcoded until then, also move to central service
const categories =
  [
    {
      id: 1,
      slug: "politics",
      name: "Politics",
    },
    {
      id: 2,
      slug: "world",
      name: "World",
    },
    {
      id: 3,
      slug: "technology",
      name: "Technology",
    },
    {
      id: 4,
      slug: "finance",
      name: "Finance",
    },
    {
      id: 5,
      slug: "sports",
      name: "Sports",
    }
  ]

// function for the news homepage
const News = () => {

  const [headline, setHeadline] = useState(null)
  const [news, setNews] = useState([])
  const [category, setCategory] = useState(categories[0].id)
  const [showModal, setShowModal] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const apiKey = import.meta.env.VITE_API_KEY

  // TODO: Move to central api service (i don't remember what they are called for js)
  // fetch data to render updated news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = `https://staging.api.measured-gazette.com/api/v1/categories/${category}/articles?api_key=${apiKey}`
        // wait for response from server to proceed with get request
        const response = await axios.get(url).data

        const articles = response?.data || []

        articles.forEach((article) => {
          if (!article.image) {
            article.image = 'image not available' // display if article has no image
          }
        })
        setHeadline(articles[0])
        setNews(articles.slice(1, 7))
      } catch (error) {
        console.error('Error fetching news:', error)
      }
    }

    fetchNews()
  }, [category])

  // function which handles user interaction when selecting a news category 
  const handleSelectedCategory = (e, category) => {
    e.preventDefault()
    setCategory(category.id) // sets the category state to the one selected by user
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
            {categories?.map((category) => (
              <a href="#" className='nav-link'
                key={category.slug} onClick={(e) => handleSelectedCategory(e, category)}>
                {category.name}
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
