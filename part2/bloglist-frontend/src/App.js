import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(user)
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem('loggedBlogappUser');
      setUser(null);
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      content: newBlog,
    };

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));
        setNewBlog('');
      })
      .catch(error => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input
        value={newBlog}
        onChange={handleBlogChange}
      />
      <button type="submit">save</button>
    </form>  
  )

  const logoutButton = () => (
    <button onClick={handleLogout} type="submit">
      logout
    </button>
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />

      {user === null ? loginForm() : (
        <div>
          {blogForm()}
          {logoutButton()}
        </div>
      )}

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
