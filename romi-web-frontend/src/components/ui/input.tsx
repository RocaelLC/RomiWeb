"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  passwordToggle?: boolean;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, passwordToggle, ...rest }, ref) => {
    const [show, setShow] = useState(false);
    const isPassword = rest.type === "password" && passwordToggle;

    return (
      <div className="grid gap-1.5">
        {label && <label className="text-sm text-muted-foreground">{label}</label>}
        <div className="relative">
          <input
            {...rest}
            type={isPassword && show ? "text" : rest.type}
            ref={ref}
            className={`w-full rounded-md border px-3 py-2 outline-none bg-white
              ${error ? "border-red-400" : "border-input focus:ring-2 focus:ring-cyan-500/40"}`}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShow(s => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={show ? "Ocultar" : "Mostrar"}
            >
              {show ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>
          )}
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
