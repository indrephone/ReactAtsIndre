import { useContext } from 'react';
import PostsContext from '../../contexts/PostsContext';
import UsersContext from '../../contexts/UsersContext';
import PostCard from '../UI/organisms/PostCard'; // Assuming you have a PostCard component

const FavoritePosts = () => {
  const postsContext = useContext(PostsContext);
  const usersContext = useContext(UsersContext);

  if (!postsContext || !usersContext || !usersContext.loggedInUser) {
    return <p>Please log in to view your favorite posts.</p>; // Fallback if not logged in
  }

  const { posts } = postsContext;
  const { loggedInUser } = usersContext;

  // Filter posts based on user's favorites
  const favoritePosts = posts.filter(post => loggedInUser?.favoritePosts?.includes(post.id));

  if (favoritePosts.length === 0) {
    return <p>You haven't added any posts to your favorites yet.</p>; // Message if no favorites
  }

  return (
    <div>
      <h1>Your Favorite Posts</h1>
      <ul>
        {favoritePosts.map(post => (
          <li key={post.id}>
            <PostCard data={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritePosts;
