export default function FilledButton({
  type = "button",
  className,
  disabled = false,
  children,
}) {
  return (
    <button
      type={type}
      className={
        "flex items-center justify-center gap-2 px-4 py-3 bg-dark text-white rounded-full font-semibold" +
        className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
