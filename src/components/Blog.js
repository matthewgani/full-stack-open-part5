import { useState } from "react"

const Blog = ({blog}) => {
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


  
  if (showDetails) {
    return (
      <div style={blogStyle}>
        '{blog.title}' by: {blog.author} <button onClick={toggleDetails}>hide</button>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button>like</button></p>
        <p>{blog.user.name}</p>
      </div> 
    )
  }

  return (
    <div style={blogStyle}>
      '{blog.title}' by: {blog.author} <button onClick={toggleDetails}>show</button>
    </div> 
  )
}

export default Blog