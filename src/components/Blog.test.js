import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders intro content only', () => {
  const blog = {
    title: 'testBlog',
    author: 'dr seuss',
    url: 'www.website.com',
    likes: 23
  }

  render(<Blog blog={blog}/>)

  screen.debug()

  const intro = screen.getByPlaceholderText('intro')
  expect(intro).toBeDefined()

  const introText = screen.getByText('testBlog, author: dr seuss', { exact: false })
  expect(introText).toBeDefined()
  // {blog.title}, author: {blog.author}

  // use querybytext so we can check if something is not rendered
  const url = screen.queryByText('url: www.website.com')
  expect(url).toBeNull()

  const likes = screen.queryByText('likes: 23', { exact:false })
  expect(likes).toBeNull()

})