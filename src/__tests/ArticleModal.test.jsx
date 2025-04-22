import React from 'react'
import { render, screen } from '@testing-library/react'
import ArticleModal from '../components/ArticleModal'

const mockArticle = {
    title: 'Test Article',
    image: 'https://example.com/image.jpg',
    source: { title: 'Test Source' },
    dateTime: '2025-04-21T10:00:00Z',
    body: 'This is a sample article body for testing.',
    url: 'https://example.com/article',
}

test('renders ArticleModal when show is true', () => {
    render(<ArticleModal show={true} article={mockArticle} onClose={() => { }} />)

    expect(screen.getByText(/Test Article/i)).toBeInTheDocument()
    expect(screen.getByText(/Source: Test Source/i)).toBeInTheDocument()
    expect(screen.getByText(/Read more/i)).toBeInTheDocument()
})
