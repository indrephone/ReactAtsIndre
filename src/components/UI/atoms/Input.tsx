import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 15px; 
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

type InputProps = {
    type: string;
    name?: string;
    id?: string;
    placeholderText?: string;
    value: string;
    onChangeF?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void; // Add onBlur prop
  };
  
  const Input = ({ type, name, id, placeholderText, value, onChangeF, onBlur }: InputProps) => {
    return (
      <StyledInput
        type={type}
        name={name}
        id={id}
        placeholder={placeholderText}
        value={value}
        onChange={onChangeF}
        onBlur={onBlur} // Include onBlur handler
      />
    );
  };
  
  export default Input;