interface CheckboxProps {
  handleCheckbox: (isCheck: boolean) => void;
}
export default function Checkbox({ handleCheckbox }: CheckboxProps) {
  return (
    <input
      onChange={(e) => handleCheckbox(e.target.checked)}
      id="default-checkbox"
      type="checkbox"
      className="w-5 h-5"
    />
  );
}
