import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import styled from 'styled-components';
import PostsContext from '../../contexts/PostsContext';
import UsersContext from '../../contexts/UsersContext';
import { useNavigate } from 'react-router-dom';
import InputField from '../UI/molecules/InputField'; 


const FormContainer = styled.div`
  min-height: 70vh; /* Ensures the form container takes up at least 80% of the viewport height */
  margin-top: 80px; /* Pushes it down below the fixed header */
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  background-color: #f9f9f9;
  padding: 30px 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center; 
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const AddPost = () => {
  const postsContext = useContext(PostsContext);
  const usersContext = useContext(UsersContext);

  const [post, setPost] = useState({
    title: '',
    description: '',
    image: '',
  });

  const navigate = useNavigate(); 

  if (!postsContext || !usersContext || !usersContext.loggedInUser) {
    return <p>Please log in to add a post.</p>; // Show this if not logged in
  }

  const { addNewPost } = postsContext;
  const { loggedInUser } = usersContext;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = {
      id: uuidv4(), // Generate a unique id
      authorId: loggedInUser.id,
      dateTime: new Date().toISOString(),
      title: post.title,
      description: post.description,
      image: post.image,
    };
    addNewPost(newPost);
    console.log('After post:', loggedInUser);

    navigate('/'); // Redirect to the feed after adding the post
  };

  return (
    <FormContainer>
      <h1>Add a New Post</h1>
      <StyledForm onSubmit={handleSubmit}>
        <InputField
          text="Title"
          type="text"
          name="title"
          id="title"
          placeholderText="Enter the post title"
          value={post.title}
          onChangeF={(e) => setPost({ ...post, title: e.target.value })}
        />
        <InputField
          text="Description"
          type="text"
          name="description"
          id="description"
          placeholderText="Enter the post description"
          value={post.description}
          onChangeF={(e) => setPost({ ...post, description: e.target.value })}
        />
        <InputField
          text="Image URL"
          type="text"
          name="image"
          id="image"
          placeholderText="Enter the image URL"
          value={post.image}
          onChangeF={(e) => setPost({ ...post, image: e.target.value })}
        />
        <SubmitButton type="submit">Add Post</SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default AddPost;
