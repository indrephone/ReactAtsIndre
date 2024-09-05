import styled from 'styled-components';

const StyledHeading = styled.h1`
  color: red;
  text-decoration: underline dotted;
`;

type HeadingProps = {
  text: string;
  size?: 1 | 2 | 3 | 4 | 5 | 6; // Allowing size from 1 to 6 for heading levels
};

const Heading: React.FC<HeadingProps> = ({ text, size = 1 }) => {
  // Default to h1 if no size is provided
  const tag = `h${size}` as keyof JSX.IntrinsicElements; // Type assertion for valid heading tags

  return <StyledHeading as={tag}>{text}</StyledHeading>;
};

export default Heading;
