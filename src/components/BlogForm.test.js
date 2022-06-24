import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'



describe('<Blog />', () => {
  // let container
  const mockSubmitHandler = jest.fn(e => e.preventDefault())
  let container
  beforeEach(() => {
    container = render(<BlogForm
      handleSubmit={mockSubmitHandler}
    />).container
  })

  test('creating a new blog', async () => {
    const user = userEvent.setup()
    // screen.debug()
    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')

    expect(titleInput).toBeDefined()

    const createButton = screen.getByText('create')

    expect(createButton).toBeDefined()

    await user.type(titleInput, 'mr cat' )
    expect(titleInput).toHaveValue('mr cat')
    await user.type(authorInput, 'john' )
    await user.type(urlInput, 'www.cat.com' )

    // fireEvent.submit(titleInput, authorInput, urlInput)

    await user.click(createButton)

    expect(mockSubmitHandler.mock.calls).toHaveLength(1)
    // console.log(mockSubmitHandler.mock.calls)
    expect(mockSubmitHandler.mock.calls[0][0].Title).toBe('mr cat')
    expect(mockSubmitHandler.mock.calls[0][0].Author).toBe('john')
    expect(mockSubmitHandler.mock.calls[0][0].URL).toBe('www.cat.com')

  })

})


// import React from 'react'
// import { fireEvent, render, screen } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect'
// import userEvent from '@testing-library/user-event'
// import BlogForm from './BlogForm'
// import Blog from './Blog'

// test('<blogform /> updates parent state and calls onSubmit', async () => {
//   // const createBlog = jest.fn(e => e.preventDefault())

//   const createBlog = jest.fn(e => e.preventDefault())
//   const user = userEvent.setup()

//   render(<BlogForm handleSubmit={createBlog} />)
//   screen.debug()

//   const input = screen.getByPlaceholderText('write here blog text')
//   const sendButton = screen.getByText('create')

//   await user.type(input, 'testing a form...' )
//   await user.click(sendButton)

//   userEvent.submit(screen.getByRole('form'))

//   expect(createBlog.mock.calls).toHaveLength(1)
//   // console.log(createBlog.mock.calls[0])
//   expect(createBlog.mock.calls[0][0].content).toBe('testing a form...' )
// })

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