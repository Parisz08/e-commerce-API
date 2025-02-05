export default function CustomInput({
  type = "text",
  id,
  name,
  placeholder,
  required = false,
  onChange = () => {},
  value = "",
  className,
}) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      required={required}
      className={
        "border border-dark py-2 px-4 rounded-md bg-white/50 " + className
      }
    />
  );
}
