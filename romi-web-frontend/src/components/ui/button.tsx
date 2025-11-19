"use client";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean };

export default function Button({ loading, className = "", children, ...rest }: Props) {
  return (
    <button
      {...rest}
      disabled={loading || rest.disabled}
      className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium
        bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-60 ${className}`}
    >
      {loading ? "Procesando..." : children}
    </button>
  );
}
