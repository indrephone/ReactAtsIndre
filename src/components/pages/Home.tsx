import { useContext } from 'react';
import PostsContext from '../../contexts/PostsContext';
import UsersContext from '../../contexts/UsersContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const postsContext = useContext(PostsContext);
  const usersContext = useContext(UsersContext);

  if (!postsContext) {
    return <p>Loading posts...</p>;
  }

  const { posts } = postsContext;
  const { loggedInUser } = usersContext || {};

  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>By: {post.authorId}</p>
          </li>
        ))}
      </ul>

      {loggedInUser ? (
        <div>
          <h2>Welcome, {loggedInUser.username}!</h2>
          <p>You can add and save posts.</p>
          <Link to="/add-post">Add Post</Link>
          <Link to="/my-posts">My Posts</Link>
        </div>
      ) : (
        <p><Link to="/login">Log in to add or save posts.</Link></p>
      )}
    </div>
  );
};

export default Home;
