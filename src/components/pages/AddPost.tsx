import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique id generation
import PostsContext from '../../contexts/PostsContext';
import UsersContext from '../../contexts/UsersContext';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const postsContext = useContext(PostsContext);
  const usersContext = useContext(UsersContext);

  const [post, setPost] = useState({
    title: '',
    description: '',
    image: '',
  });

  const navigate = useNavigate(); // For redirecting after adding the post

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
    navigate('/feed'); // Redirect to the feed after adding the post
  };

  return (
    <div>
      <h1>Add a New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={post.description}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={post.image}
          onChange={(e) => setPost({ ...post, image: e.target.value })}
        />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
