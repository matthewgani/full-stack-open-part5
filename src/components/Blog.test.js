import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  // let container
  beforeEach(() => {

    const blog = {
      title: 'testBlog',
      author: 'dr seuss',
      url: 'www.website.com',
      likes: 23,
      user: {
        username: '116',
        name: 'z',
        id: '62b02617b26b65f0d07609ef'
      }
    }

    // container = render(<Blog blog={blog}/>).container
    render(<Blog blog={blog}/>)
  })

  test('renders intro content only', () => {
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

  test('renders url and likes when btn click', async () => {
    // const mockHandler = jest.fn()
    // to use this, we need to set function from outside of blog
    // the display more function is inside Blog so we cant mockHandler it

    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)
    // screen.debug()
    // expect(mockHandler.mock.calls).toHaveLength(1)

    const url = screen.queryByText('url: www.website.com')
    expect(url).toBeDefined()

    const likes = screen.queryByText('likes: 23', { exact:false })
    expect(likes).toBeDefined()
  })

})

