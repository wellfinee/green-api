export default function Input({ type = "text", className = "", ...props }) {
    return (
      <input
        type={type}
        className={`border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-opacity-75 ${className}`}
        {...props}
      />
    )
  }