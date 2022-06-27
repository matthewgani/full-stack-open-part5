import { useState, useEffect , useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])



  // use effect hook to get the stored user if not null
  // when set user, we auto 'log in' by setting user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // need to make it async because we use await
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  const blogFormRef = useRef()
  const handleAddBlog = async (blogObject) => {
    // event.preventDefault()
    try {
      blogFormRef.current.toggleVisibility()
      const res = await blogService.create(blogObject)

      // we can add empty string title/url but this wont show
      // in the react app due to how blog component is
      // if we want to make it invalid for getting exception,
      // we nee to set the fields to null if they are empty strings

      setErrorMessage(`A new blog: '${blogObject.title}' by ${blogObject.author} was added!`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs(blogs.concat(res))

    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }
  const handleLike = async (blog) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }

      await blogService.updateLikes(updatedBlog)

      // update the blogs state to re render blog component
      setBlogs(blogs.map(b => b.id !== blog.id ? b : updatedBlog))
      setErrorMessage('Liked a blog post!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleDelete = async (blog) => {
    try {
      if (!window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
        return
      }
      await blogService.deleteBlog(blog.id)
      // update the blogs state to re render blog component
      setBlogs(blogs.filter(b => b.id !== blog.id))
      setErrorMessage('Deleted a blog post!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  // choose the react jsx code to render  based on user
  if (user === null) {
    return (
      <div>
        <h2>Blog App</h2>
        <Notification message={errorMessage} />
        <Togglable buttonLabel='login'>
          <LoginForm
            username = {username}
            password = {password}
            handlePasswordChange = {({ target }) => setPassword(target.value)}
            handleUsernameChange = {({ target }) => setUsername(target.value)}
            handleSubmit = {handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <div>
        <p>
          {user.name}(username: {user.username}) is logged in!
          <button onClick={handleLogout}>logout</button>
        </p>
      </div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm
          user = {user}
          handleSubmit={handleAddBlog}
        />
      </Togglable>

      <h3>All Blogs(sorted by likes)</h3>
      {blogs.sort(function (a, b) {
        return b.likes - a.likes
      }).map((blog =>
        <Blog key={blog.id} username={user.username} blog={blog} handleLike={() => handleLike(blog)} handleDelete={() => handleDelete(blog)} />
      ))}
    </div>
  )
}

// blog sort
// if b > a, we return positive value, which sorts a after b
// so the b value with higher likes is put first

export default App
