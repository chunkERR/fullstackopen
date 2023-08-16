import { useState } from "react"


const Blog = ({ blog, addLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [blogDetails, setBlogDetails] = useState(false);
  const label = blogDetails ? 'hide' : 'view'




  return (
    <div style={blogStyle}>
      <p>{blog.title} by {blog.author}</p>
      <button onClick={() => setBlogDetails(!blogDetails)}>{label}</button>
      {blogDetails && 
      <div>
        {blog.url}
        <br></br>
        {blog.likes} <button onClick={() => addLike(blog.id)}>like</button>
        <br></br>
        {!blog.user &&
        <p>No user assigned to this blog</p>}
        {blog.user &&
        <p>
        {blog.user.name}
        </p>
        }
        </div>}
    </div>
  );
};

export default Blog;