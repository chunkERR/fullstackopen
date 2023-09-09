import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [info, setInfo] = useState({ message: null })

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type = 'info') => {
    setInfo({
      message,
      type,
    })

    setTimeout(() => {
      setInfo({ message: null })
    }, 3000)
  }

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('Wrong credentials', 'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    } catch (exception) {
      console.log(exception)
    }
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        blogFormRef.current.toggleVisibility()
        setNewBlog('')
        notifyWith(`${returnedBlog.title} by ${returnedBlog.author} added`)
      })
      .catch((error) => {
        notifyWith(error.response.data.error)
      })
  }

  const logoutButton = () => (
    <button onClick={handleLogout} type="submit">
      logout
    </button>
  )

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const updatedBlog = await blogService.update(blogToUpdate)
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`)
    setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)))
  }

  const remove = async (blog) => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
    if (ok) {
      await blogService.remove(blog.id)
      notifyWith(`The blog '${blog.title}' by '${blog.author}' removed`)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }
  const sorted = blogs.slice().sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification info={info} />

      {!user && (
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      )}
      {user && (
        <div>
          <p>{user.name} logged in {logoutButton()}</p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}
      {sorted.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          like={() => like(blog)}
          remove={() => remove(blog)}
        />
      ))}
    </div>
  )
}

export default App
