import { useState } from "react"

const Blog = ({ blog }) => {
  const [blogDetails, setBlogDetails] = useState(false);
  const label = blogDetails ? 'view' : 'hide'

  return (
  <div>
    {blog.title} {blog.author}
    <br></br>
    <button onClick={() => setBlogDetails(!blogDetails)}>{label}</button>




  </div>  
  )
}
export default Blog