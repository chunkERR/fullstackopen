import { useState } from 'react'

const Blog = ({ blog, like, remove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [blogDetails, setBlogDetails] = useState(false)
  const label = blogDetails ? 'hide' : 'view'

  const removeBlog = () => remove(blog)


  return (
    <div style={blogStyle} className='blog'>
      <p>{blog.title} by {blog.author}</p>
      <button id='expand-button' onClick={() => setBlogDetails(!blogDetails)}>{label}</button>
      {blogDetails &&
      <div>
        {blog.url}
        <br></br>
        <p>likes: {blog.likes}  </p> <button id='like' onClick={like} data-testid='like-button'>like</button>
        <br></br>
        {!blog.user && <p>No user assigned to this blog</p>}
        {blog.user &&<p>{blog.user.name}</p>}
        <button id='remove' onClick={removeBlog}>remove</button>
      </div>}
    </div>
  )
}

export default Blog