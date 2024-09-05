import Label from "../atoms/Label";
import Input from "../atoms/Input";

type InputFieldProps = {
  text: string;
  type: string;
  name: string;
  id: string;
  placeholderText: string;
  value: string;
  onChangeF: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  text,
  type,
  name,
  id,
  placeholderText,
  value,
  onChangeF,
  onBlur,
}) => {
  return (
    <div>
      <Label text={text} idFor={id} />
      <Input
        type={type}
        name={name}
        id={id}
        placeholderText={placeholderText}
        value={value}
        onChangeF={onChangeF}
        onBlur={onBlur}
      />
    </div>
  );
};

export default InputField;
