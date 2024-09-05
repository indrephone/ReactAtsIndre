import { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PostsContext from '../../contexts/PostsContext';
import UsersContext from '../../contexts/UsersContext';
import PostHeader from '../UI/molecules/PostHeader';

// Styled components
const StyledHomeContainer = styled.div`
  padding-top: 80px;
  max-width: 800px;
  margin: 0 auto;
`;

const StyledPost = styled.li`
  list-style: none;
  padding: 16px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PostImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #ff1a1a;
  }
`;

// Styled button for adding a new post
const AddPostButton = styled(Link)`
  display: inline-block;
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;

  &:hover {
    background-color: #218838;
  }
`;

const Home = () => {
  const postsContext = useContext(PostsContext);
  const usersContext = useContext(UsersContext);

  if (!postsContext || !usersContext) {
    return <p>Loading...</p>;
  }

  const { posts, removePost } = postsContext;
  const { loggedInUser } = usersContext;

  // Function to get the user by authorId
  const getUserById = (id: string) => usersContext.users.find((user) => user.id === id);

  // Function to handle delete action
  const handleDelete = (postId: string) => {
    removePost(postId);
  };

  return (
    <StyledHomeContainer>
      <h1>Welcome to the Posts Feed</h1>

      {/* Show Add Post button only if the user is logged in */}
      {loggedInUser && (
        <AddPostButton to="/add-post">
          Add New Post
        </AddPostButton>
      )}

      <ul>
        {posts.map((post) => {
          const creatorUser = getUserById(post.authorId);

          return (
            <StyledPost key={post.id}>
              <PostHeader creatorUser={creatorUser} creationTime={post.dateTime} />
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              {post.image && (
                <PostImage src={post.image} alt={post.title} />
              )}
              {loggedInUser?.id === post.authorId && (
                <DeleteButton onClick={() => handleDelete(post.id)}>
                  Delete Post
                </DeleteButton>
              )}
            </StyledPost>
          );
        })}
      </ul>
    </StyledHomeContainer>
  );
};

export default Home;
