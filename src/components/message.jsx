const Message = ({ text, isOutgoing, sender }) => {
  return (
    <div
      className={`p-2 my-1 max-w-xs rounded-lg ${
        isOutgoing ? "bg-green-500 text-white self-end" : "bg-gray-300 text-black self-start"
      }`}
    >
      {!isOutgoing && <div className="text-xs font-bold">{sender}</div>}
      <div>{text}</div>
    </div>
  )
}

export default Message