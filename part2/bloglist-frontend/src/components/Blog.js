import { useState } from "react"

const Blog = ({ blog }) => {
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
      {blog.title} {blog.author}
      <button onClick={() => setBlogDetails(!blogDetails)}>{label}</button>
      {blogDetails && 
      <div>
        {blog.url}
        <br></br>
        {blog.likes} <button>like</button>
        </div>}
    </div>
  );
};

export default Blog;