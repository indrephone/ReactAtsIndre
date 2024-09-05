
type LabelProps = {
  text: string;
  idFor: string;
};

const Label: React.FC<LabelProps> = ({ text, idFor }) => {
  return (
    <label htmlFor={idFor}>{text}</label>
  );
};

export default Label;
