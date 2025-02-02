export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`hover:bg-green-600 text-white p-2 rounded transition-all duration-200 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
