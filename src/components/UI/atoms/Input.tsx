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
      <input
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