import { useContext } from 'react';
import PostsContext from '../../contexts/PostsContext';
import UsersContext from '../../contexts/UsersContext';

const MyPosts = () => {
  const postsContext = useContext(PostsContext);
  const usersContext = useContext(UsersContext);

  if (!postsContext || !usersContext || !usersContext.loggedInUser) {
    return <p>Please log in to view your posts.</p>; // Show fallback if not logged in
  }

  const { posts } = postsContext;
  const { loggedInUser } = usersContext;

  // Only filter posts if loggedInUser exists
  const myPosts = posts.filter((post) => post.authorId === loggedInUser.id);

  return (
    <div>
      <h1>My Posts</h1>
      <ul>
        {myPosts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>By: {post.authorId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPosts;
