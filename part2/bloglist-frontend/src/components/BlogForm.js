import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={(event) => setTitle(event.target.value)
            }
            placeholder='Write blog title here'
          />
        </div>
        <div>
          author
          <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={(event) => setAuthor(event.target.value)}
            placeholder='Write blog author here'
          />
        </div>
        <div>
          url
          <input
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={(event) => setUrl(event.target.value)}
            placeholder='Write blog url here'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
