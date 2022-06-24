import { useState } from 'react'

const Blog = ({ username, blog, handleLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const showRemoveButton = () => {
    if (username === blog.user.username) {
      return (
        <button onClick={handleDelete}>remove</button>
      )
    }
    else {
      return (
        <div>
        </div>
      )
    }
  }
  if (showDetails) {
    return (
      <div style={blogStyle}>
        <div placeholder='intro'>
          {blog.title}, author: {blog.author} <button onClick={toggleDetails}>hide</button>
        </div>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes} <button onClick={handleLike}>like</button></p>
        <p>creator name: {blog.user.name}</p>
        <p>creator username: {blog.user.username}</p>
        {showRemoveButton()}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div placeholder='intro'>
        {blog.title}, author: {blog.author} <button onClick={toggleDetails}>show</button>
      </div>
    </div>
  )
}

export default Blog