import React from "react";
export interface ButtonProps {
  ghost?: boolean;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
const Button: React.FC<
  React.HTMLAttributes<HTMLButtonElement> & ButtonProps
> = ({
  children,
  disabled = false,
  block = false,
  ghost = false,
  loading = false,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={` p-1.5 flex justify-center font-bold rounded-md justify-self-end ${
        block ? "w-full" : ""
      } ${
        ghost ? `bg-white-500 text-accent` : `text-white bg-accent `
      } border-solid border-2 border-accent
        hover:border-accent hover:text-white-500 hover:bg-accent disabled:opacity-40  focus:outline-none ${
          props.className
        }`}
    >
      {loading && (
        <svg
          className="animate-spin mr-1 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
