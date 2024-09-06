import { useContext } from 'react';
import styled from 'styled-components';
import PostsContext from '../../contexts/PostsContext';
import UsersContext from '../../contexts/UsersContext';
import PostCard from '../UI/organisms/PostCard'; 

const FavoritePostsContainer = styled.div`
  padding-top: 80px;
  max-width: 800px;
  margin: 0 auto;
`;

const FavoritePostsHeading = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
`;

const PostsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  list-style-type: none;
  padding: 0;
`;

const NoFavoritesMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: #666;
`;

const FavoritePosts = () => {
  const postsContext = useContext(PostsContext);
  const usersContext = useContext(UsersContext);

  if (!postsContext || !usersContext || !usersContext.loggedInUser) {
    return <NoFavoritesMessage>Please log in to view your favorite posts.</NoFavoritesMessage>; // Fallback if not logged in
  }

  const { posts } = postsContext;
  const { loggedInUser } = usersContext;

  // Filter posts based on user's favorites
  const favoritePosts = posts.filter(post => loggedInUser?.favoritePosts?.includes(post.id));

  if (favoritePosts.length === 0) {
    return <NoFavoritesMessage>You haven't added any posts to your favorites yet.</NoFavoritesMessage>; // Message if no favorites
  }

  return (
    <FavoritePostsContainer>
      <FavoritePostsHeading>Your Favorite Posts</FavoritePostsHeading>
      <PostsList>
        {favoritePosts.map(post => (
          <li key={post.id}>
            <PostCard data={post} />
          </li>
        ))}
      </PostsList>
    </FavoritePostsContainer>
  );
};

export default FavoritePosts;
