import { useContext } from "react";
import styled from "styled-components";
import UsersContext from "../../../contexts/UsersContext";
import PostsContext, { PostType } from "../../../contexts/PostsContext";
import PostHeader from "../molecules/PostHeader";

type Props = {
    data: PostType;
};

const StyledDiv = styled.div`
   width: 200px;
   border: 1px solid #ccc;
   padding: 5px;
   display: flex;
   flex-direction: column;
   align-items: center;
   > h3 {
       text-align: center;
   }
   > img {
       width: 100%;
       height: 200px;
       object-fit: contain;
   }
`;

const PostCard = ({ data }: Props) => {
  const usersContext = useContext(UsersContext);
  const postsContext = useContext(PostsContext);

  if (!usersContext || !postsContext) {
    return null;
  }

  const { getSpecificUser, loggedInUser } = usersContext;
  const { removePost } = postsContext;
  const thisUser = getSpecificUser(data.authorId);

  return (
    <StyledDiv>
      <PostHeader creatorUser={thisUser} creationTime={data.dateTime} />

      <img src={data.image} alt={data.title} />
      <h3>{data.title}</h3>

      <p>{data.description.slice(0, 100)}</p>
      {loggedInUser && loggedInUser.id === data.authorId && (
        <button onClick={() => removePost(data.id)}>
          Delete
        </button>
      )}
    </StyledDiv>
  );
};

export default PostCard;
