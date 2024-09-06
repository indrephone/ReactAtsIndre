import { useContext } from 'react';
import styled from 'styled-components';
import PostsContext from '../../contexts/PostsContext';
import UsersContext from '../../contexts/UsersContext';
import PostHeader from '../UI/molecules/PostHeader';

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

const MyPosts = () => {
  const postsContext = useContext(PostsContext);
  const usersContext = useContext(UsersContext);

  if (!postsContext || !usersContext || !usersContext.loggedInUser) {
    return <p>Please log in to view your posts.</p>; // Show fallback if not logged in
  }

  const { posts, removePost } = postsContext;
  const { loggedInUser } = usersContext;

  // Only filter posts if loggedInUser exists
  const myPosts = posts.filter((post) => post.authorId === loggedInUser.id);


  const handleDelete = (postId: string) => {
    removePost(postId);
  };
  
  return (
    <StyledHomeContainer>
      <h1>My Posts</h1>
      <ul>
        {myPosts.map((post) => (
          <StyledPost key={post.id}>
            <PostHeader creatorUser={loggedInUser} creationTime={post.dateTime} />
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            {post.image && (
            <PostImage src={post.image} alt={post.title} />
          )}
          <DeleteButton onClick={() => handleDelete(post.id)}>
            Delete Post
          </DeleteButton>
            <p>By: {post.authorId}</p>
          </StyledPost>
        ))}
      </ul>
    </StyledHomeContainer>
  );
};

export default MyPosts;
