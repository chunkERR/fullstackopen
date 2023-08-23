import { useState } from "react"

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [blogDetails, setBlogDetails] = useState(false);
  const [blogObject, setBlogObject] = useState(blog)
  const label = blogDetails ? 'hide' : 'view'

  const increaseLikes = async () => {
    try {
    const updatedBlog = {
      ...blogObject,
      likes: blogObject.likes + 1,
    };

    console.log(updatedBlog)

    setBlogObject(updatedBlog);

    await updateBlog(updatedBlog.id, {
      title: updatedBlog.title,
      url: updatedBlog.url,
      author: updatedBlog.author,
      likes: updatedBlog.likes,
      user: updatedBlog.id // Assuming user is an object with an id property
    });

    } catch (error) {
      console.error('Error updating like on server:', error);
    }}


    const removeBlog = () => deleteBlog(blog)
  

  return (
    <div style={blogStyle}>
      <p>{blog.title} by {blog.author}</p>
      <button onClick={() => setBlogDetails(!blogDetails)}>{label}</button>
      {blogDetails && 
      <div>
        {blog.url}
        <br></br>
        <p>likes: {blog.likes}  </p> <button onClick={increaseLikes}>like</button>
        <br></br>
        {!blog.user && <p>No user assigned to this blog</p>}
        {blog.user &&<p>{blog.user.name}</p>}
        <button onClick={removeBlog}>remove</button>
        </div>}
    </div>
  );
};

export default Blog;