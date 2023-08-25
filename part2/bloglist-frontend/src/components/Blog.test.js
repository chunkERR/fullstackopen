import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Blog component', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://test-blog.com',
    likes: 5,
    user: {
      name: 'Test User'
    }
  }

  test('renders blog title and author by default', () => {
    const component = render(<Blog blog={blog} />)

    // Check that title and author are rendered
    expect(component.container).toHaveTextContent('Test Blog by Test Author')
    // Check that URL and likes are not rendered
    expect(component.container).not.toHaveTextContent('https://test-blog.com')
    expect(component.container).not.toHaveTextContent('likes: 5')
  })

  test('renders URL and likes after clicking "view" button',async () => {
    const user = userEvent.setup()
    const component = render(<Blog blog={blog} />)
    const button = screen.getByText('view')

    await user.click(button)

    // Check that title, author, URL, and likes are rendered
    expect(component.container).toHaveTextContent('Test Blog by Test Author')
    expect(component.container).toHaveTextContent('https://test-blog.com')
    expect(component.container).toHaveTextContent('likes: 5')
  })
})
