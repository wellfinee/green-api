import React, { useState } from "react"
import Input from "./input"
import { handleFetchChats } from "../services/handleChatfetching"

export default function Sidebar({
  theme,
  idInstance,
  setIdInstance,
  apiToken,
  setApiToken,
  setSelectedChat,
  loadChatHistory
}) {
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  return (
    <div
      className={`w-1/4 p-4 h-full overflow-y-auto relative flex flex-col custom-scrollbar ${theme === "dark" ?  " darkScroll " : " lightScroll "} ${
        theme === "dark" ? "bg-gray-800" : "bg-gray-200"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4 text-center text-green-500">
        Михайлов Микаэл
      </h1>
      <div className="flex flex-col items-center justify-center space-y-4">
        <Input placeholder="ID Instance" value={idInstance} onChange={(e) => setIdInstance(e.target.value)}
          className={
            theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
          }
        />
        <Input
          placeholder="API Token"
          type="password"
          value={apiToken}
          onChange={(e) => setApiToken(e.target.value)}
          className={
            theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
          }
        />
        <button
          onClick={() =>handleFetchChats(idInstance, apiToken, setChats, setLoading, setError)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          {loading ? "Загрузка..." : "Загрузить чаты"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="mt-4">
        {chats.length > 0 ? (
          <ul className="space-y-2">
            {chats.map((chat) => (
              <li
                key={chat.id}
                onClick={() => {
                  setSelectedChat(chat.id)
                  loadChatHistory(chat.id)
                }}
                className={`p-2 rounded cursor-pointer ${   theme === "dark" ? "bg-gray-700 text-white hover:bg-gray-600"  : "bg-gray-300 text-black hover:bg-gray-400"}`}
              >
                {chat.name || chat.id}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">Чаты не загружены</p>
        )}
      </div>
    </div>
  )
}
