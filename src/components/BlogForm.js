
const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {

  const submitBlog = (event) => {
    handleSubmit(event)
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={submitBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
            id='title-input'
            placeholder='write here title text'
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
            id='author-input'
            placeholder='write here author text'
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="URL"
            onChange={handleUrlChange}
            id='url-input'
            placeholder='write here url text'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm