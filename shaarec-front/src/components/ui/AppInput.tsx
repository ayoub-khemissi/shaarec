"use client";

import { useState, type InputHTMLAttributes } from "react";
import { EyeIcon, XCloseIcon } from "./Icons";

interface AppInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  description?: string;
}

export function AppInput({ label, error, description, className = "", ...props }: AppInputProps) {
  const id = props.id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
          {props.required && <span className="text-danger ms-0.5">*</span>}
        </label>
      )}
      <input
        id={id}
        {...props}
        className={`w-full h-11 px-3.5 rounded-lg
          bg-field text-field-foreground placeholder:text-field-placeholder
          border border-field-border
          focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
          transition-colors disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? "border-danger focus:border-danger focus:ring-danger/20" : ""}
          ${className}`}
      />
      {description && !error && <p className="text-xs text-muted">{description}</p>}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}

interface AppPasswordInputProps extends Omit<AppInputProps, "type"> {}

export function AppPasswordInput(props: AppPasswordInputProps) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative flex flex-col gap-1.5">
      {props.label && (
        <label htmlFor={props.id || props.name} className="text-sm font-medium text-foreground">
          {props.label}
          {props.required && <span className="text-danger ms-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          className={`w-full h-11 ps-3.5 pe-11 rounded-lg
            bg-field text-field-foreground placeholder:text-field-placeholder
            border border-field-border
            focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
            transition-colors disabled:opacity-50
            ${props.error ? "border-danger focus:border-danger focus:ring-danger/20" : ""}
            ${props.className ?? ""}`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          tabIndex={-1}
          className="absolute end-2 top-1/2 -translate-y-1/2 size-7 flex items-center justify-center
            rounded text-muted hover:text-foreground transition-colors cursor-pointer"
          aria-label={show ? "Masquer" : "Afficher"}
        >
          {show ? <XCloseIcon className="size-4" /> : <EyeIcon className="size-4" />}
        </button>
      </div>
      {props.description && !props.error && <p className="text-xs text-muted">{props.description}</p>}
      {props.error && <p className="text-xs text-danger">{props.error}</p>}
    </div>
  );
}
