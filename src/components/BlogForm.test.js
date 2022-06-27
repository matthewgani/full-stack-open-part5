import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'



describe('<Blog />', () => {
  // let container
  // const mockSubmitHandler = jest.fn(e => e.preventDefault())
  // let container
  // beforeEach(() => {
  //   container = .container
  // })

  test('creating a new blog', async () => {
    const mockSubmitHandler = jest.fn()
    render(<BlogForm
      handleSubmit={mockSubmitHandler}
    />)
    // const user = userEvent.setup()
    // screen.debug()
    // const titleInput = container.querySelector('#title-input')
    // const authorInput = container.querySelector('#author-input')
    // const urlInput = container.querySelector('#url-input')

    const titleInput = screen.getByPlaceholderText('write here title text')
    const authorInput = screen.getByPlaceholderText('write here author text')
    const urlInput = screen.getByPlaceholderText('write here url text')

    expect(titleInput).toBeDefined()
    expect(authorInput).toBeDefined()
    expect(urlInput).toBeDefined()

    const createButton = screen.getByText('create')

    expect(createButton).toBeDefined()


    // await user.type(titleInput, 'mr cat' )
    // expect(titleInput).toHaveValue('mr cat')
    // console.log(titleInput)
    // await user.type(authorInput, 'john' )
    // await user.type(urlInput, 'www.cat.com' )
    // await userEvent.clear(titleInput)

    await userEvent.type(titleInput, 'mr cat' )
    expect(titleInput).toHaveValue('mr cat')
    await userEvent.type(authorInput, 'john' )
    await userEvent.type(urlInput, 'www.cat.com' )

    // fireEvent.submit(titleInput, authorInput, urlInput)
    // await user.click(createButton)
    fireEvent.click(createButton)
    expect(mockSubmitHandler.mock.calls).toHaveLength(1)
    // expect(mockSubmitHandler.mock.calls[0][0].Title).toBe('mr cat')
    // expect(mockSubmitHandler.mock.calls[0][0].Author).toBe('john')
    // expect(mockSubmitHandler.mock.calls[0][0].URL).toBe('www.cat.com')

  })

})
//seems like when i use await, the typing works
// when no await and async, it doesnt work.
// but when i use await, the click event throws an error


// test('clicking create button calls handleCreateBlog', () => {
//   const mockHandler = jest.fn()

//   const component = render(
//     <BlogForm
//       handleSubmit={mockHandler}
//     />
//   )
//   const inputTitle = component.container.querySelector('#title-input')
//   const inputAuthor = component.container.querySelector('#author-input')
//   const inputUrl = component.container.querySelector('#url-input')
//   const form = component.container.querySelector('form')

//   fireEvent.change(inputTitle, {
//     target: { value: 'Title' },
//   })
//   fireEvent.change(inputAuthor, {
//     target: { value: 'Author' },
//   })
//   fireEvent.change(inputUrl, {
//     target: { value: 'url' },
//   })
//   fireEvent.submit(form)
//   expect(mockHandler.mock.calls).toHaveLength(1)
//   console.log(mockHandler.mock.calls[0][0])
//   expect(mockHandler.mock.calls[0][0].title).toBe('Title')
// })


// describe('<BlogForm />', () => {
//   test('<BlogForm /> updates parent state and calls onSubmit', () => {
//     const mockHandler = jest.fn()

//     const component = render(<BlogForm handleSubmit={mockHandler} />)

//     const title = component.container.querySelector('#title-input')
//     const author = component.container.querySelector('#author-input')
//     const url = component.container.querySelector('#url-input')
//     const sendButton = screen.getByText('create')

//     fireEvent.change(title, {
//       target: { value: 'Tamazgha: Azul!' }
//     })
//     fireEvent.change(author, {
//       target: { value: 'amazCute' }
//     })
//     fireEvent.change(url, {
//       target: { value: 'www.tamaz.com' }
//     })
//     fireEvent.submit(sendButton)

//     expect(mockHandler.mock.calls).toHaveLength(1)
//     expect(mockHandler.mock.calls[0][0].title).toBe('Tamazgha: Azul!')
//     expect(mockHandler.mock.calls[0][0].author).toBe('amazCute')
//     expect(mockHandler.mock.calls[0][0].url).toBe('www.tamaz.com')
//   })
// })