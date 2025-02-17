type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  className = "",
  children
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg transition-all duration-200 ${className} ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
