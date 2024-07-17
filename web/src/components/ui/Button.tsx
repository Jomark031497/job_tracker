import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      {...rest}
      className={twMerge(
        "bg-accent py-2 transition-all font-semibold rounded text-white",
        "hover:bg-primary",
        rest.className
      )}
    >
      {children}
    </button>
  );
});
