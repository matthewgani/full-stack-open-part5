import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'



describe('<Blog />', () => {

  // had to refactor the handler for blogform to be returning the blogObject
  // if not it will have no access to the params (the title, url and author)
  // now we can look at the returned params
  test('creating a new blog', async () => {
    const mockSubmitHandler = jest.fn()
    render(<BlogForm
      handleSubmit={mockSubmitHandler}
    />)
    const { container } = render(<BlogForm handleSubmit={mockSubmitHandler}/>)

    const user = userEvent.setup()

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')

    expect(titleInput).toBeDefined()
    expect(authorInput).toBeDefined()
    expect(urlInput).toBeDefined()


    const createButton = container.querySelector('#create-button')

    expect(createButton).toBeDefined()
    await user.type(titleInput, 'mr cat' )
    expect(titleInput).toHaveValue('mr cat')
    await user.type(authorInput, 'john' )
    await user.type(urlInput, 'www.cat.com' )

    await user.click(createButton)
    expect(mockSubmitHandler.mock.calls).toHaveLength(1)
    expect(mockSubmitHandler.mock.calls[0][0].title).toBe('mr cat')
    expect(mockSubmitHandler.mock.calls[0][0].author).toBe('john')
    expect(mockSubmitHandler.mock.calls[0][0].url).toBe('www.cat.com')

  })

})
