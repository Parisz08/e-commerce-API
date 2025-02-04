export default function CustomInput({
  type = "text",
  id,
  name,
  placeholder,
  required = false,
  className,
}) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      required={required}
      className={
        "border border-dark py-2 px-4 rounded-md bg-white/50 " + className
      }
    />
  );
}
