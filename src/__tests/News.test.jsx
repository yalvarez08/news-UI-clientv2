import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import News from '../components/News'
import axios from 'axios'

jest.mock('axios')

const mockResponse = {
    data: {
        articles: {
            results: [
                {
                    title: 'Headline Article',
                    image: 'https://example.com/image.jpg',
                    source: { title: 'News Source' },
                    dateTime: '2025-04-21T10:00:00Z',
                    body: 'This is a headline article.',
                    url: 'https://example.com/article1',
                },
                {
                    title: 'Second Article',
                    image: 'https://example.com/image2.jpg',
                    source: { title: 'Second Source' },
                    dateTime: '2025-04-21T12:00:00Z',
                    body: 'Another article.',
                    url: 'https://example.com/article2',
                },
            ],
        },
    },
}

describe('News Component', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue(mockResponse)
    })

    test('renders headline and other articles', async () => {
        render(<News />)

        await waitFor(() => {
            expect(screen.getByText(/Headline News/i)).toBeInTheDocument()
            expect(screen.getByText(/Secondary News/i)).toBeInTheDocument()
        })
    })

    test('renders category links', () => {
        render(<News />)
        expect(screen.getByText('Science')).toBeInTheDocument()
        expect(screen.getByText('Technology')).toBeInTheDocument()
        expect(screen.getByText('Sports')).toBeInTheDocument()
    })
})
