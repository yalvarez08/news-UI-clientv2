import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import News from '../components/News'
import axios from 'axios'

jest.mock('axios')

const mockArticles = [
    {
        title: 'Headline News',
        image: 'https://example.com/headline.jpg',
        source: { title: 'Headline Source' },
        dateTime: '2025-04-21T09:00:00Z',
        body: 'This is the headline article body.',
        url: 'https://example.com/headline-news',
    },
    {
        title: 'Secondary News',
        image: 'https://example.com/second.jpg',
        source: { title: 'Second Source' },
        dateTime: '2025-04-21T10:00:00Z',
        body: 'This is another article body for secondary news.',
        url: 'https://example.com/secondary-news',
    },
]

const mockResponse = {
    data: {
        articles: {
            results: mockArticles,
        },
    },
}

describe('News Component - User Interaction', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue(mockResponse)
    })

    test('opens modal when an article is clicked', async () => {
        render(<News />)

        // Wait for articles to render
        await waitFor(() => {
            expect(screen.getByText(/Secondary News/i)).toBeInTheDocument()
        })

        // Simulate clicking on the article grid item
        const articleCard = screen.getByText(/Secondary News/i)
        await userEvent.click(articleCard)

        // Check that the modal opens with article details
        expect(screen.getByText(/Secondary News/i)).toBeInTheDocument()
        expect(screen.getByText(/Second Source/i)).toBeInTheDocument()
        expect(screen.getByText(/Read more/i)).toHaveAttribute('href', mockArticles[1].url)

        // Simulate clicking on close button to close modal
        const closeButton = screen.getByRole('button', { hidden: true })
        await userEvent.click(closeButton)
    })
})
