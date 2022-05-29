import React from "react";
export interface ButtonProps {
  ghost?: boolean;
  block?: boolean;
  disabled?: boolean;
}
const Button: React.FC<
  React.HTMLAttributes<HTMLButtonElement> & ButtonProps
> = ({ children, block = false, ghost = false, ...props }) => {
  return (
    <button
      {...props}
      className={` p-1.5  font-bold rounded-md justify-self-end ${block ? "w-full" : ""} ${
        ghost
          ? `bg-white-500 text-accent`
          : `text-white bg-accent `
      } border-solid border-2 border-accent
        hover:border-accent hover:text-white-500 hover:bg-accent  focus:outline-none ${
            props.className
          }`}
    >
      {children}
    </button>
  );
};

export default Button;