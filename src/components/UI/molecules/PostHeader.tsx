import styled from "styled-components";

type UserType = {
    username: string;
    profilePicture: string;
};

type PostHeaderProps = {
    creatorUser: UserType | undefined; // Allow undefined
    creationTime: string;
};

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;

    > span {
        display: flex;
        align-items: center;
        gap: 10px;

        > img {
            height: 30px;
        }
    }
`;

const PostHeader = ({ creatorUser, creationTime }: PostHeaderProps) => {
    return ( 
        <StyledDiv>
          <span>
            <img 
              src={creatorUser?.profilePicture || 'default-profile-picture.png'} // Fallback image if undefined
              alt={`${creatorUser?.username || 'Unknown User'} profile avatar`} // Fallback name if undefined
            />
            <span>{creatorUser?.username || 'Unknown User'}</span>
          </span>

          <span>{creationTime}</span>
        </StyledDiv>
    );
}

export default PostHeader;
