import { useEffect, useRef, useState } from "react"
import Message from "./message"
import Input from "./input"
import Button from "./button"
import { Send } from "lucide-react"
import { sendMessage } from "../services/sendMessage"
import { fetchMessages } from "../services/fetchMessage"
import { listenForMessages } from "../services/listenerChat"

export default function ChatWindow({
  theme,
  messages,
  phoneNumber,
  setPhoneNumber,
  message,
  setMessage,
  toggleTheme,
  setMessages,
  idInstance,
  apiToken,
  chats,
  setChats
}) {
  const chatContainerRef = useRef(null)
  const chatEndRef = useRef(null)
  const [isAtBottom, setIsAtBottom] = useState(true)

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 5)
    }
  }


  useEffect(() => {
    let isMounted = true

    const loadChat = async () => {
        if (!idInstance || !apiToken || !phoneNumber) return

        try {
            await new Promise(res => setTimeout(res, 1000))

            const history = await fetchMessages(idInstance, apiToken, phoneNumber)
            
            if (isMounted) {
                setMessages(history)
            }
        } catch (error) {
            console.error("Ошибка загрузки сообщений:", error)
        }
    }

    loadChat()

    const interval = setInterval(() => {
        listenForMessages(idInstance, apiToken, (newMessage) => {
            if (newMessage.chatId === phoneNumber) {
                setMessages((prev) => [...prev, newMessage].sort((a, b) => a.timestamp - b.timestamp))
            }
        })
    }, 3000)

    return () => {
        isMounted = false
        clearInterval(interval)
    }
}, [idInstance, apiToken, phoneNumber])

  useEffect(() => {
    if (isAtBottom) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(
        idInstance,
        apiToken,
        phoneNumber,
        message,
        messages,
        setMessages,
        setMessage,
        chats,
        setChats
      )

      setMessages([
        ...messages,
        { text: message, isOutgoing: true }
      ])
      setMessage("")
    }
  }
  return (
    <div className={`flex-1 p-4 h-full flex flex-col MessangerBG ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
      <div
        ref={chatContainerRef}
        className={`flex-1 overflow-y-auto p-4 custom-scrollbar ${theme === "dark" ? "darkImage" : "lightImage"}`}
        onScroll={handleScroll} 
      >
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.isOutgoing ? null : msg.sender} isOutgoing={msg.isOutgoing} />
        ))}
        <div ref={chatEndRef} /> 
      </div>
      <div className={`flex items-center p-4 pb-0 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
        <Input
          placeholder="Phone Number"
          className={`w-full ${theme === "dark" ? "bg-gray-700 text-white placeholder-gray-400" : "bg-gray-200 text-black placeholder-gray-600"}`}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div className={`flex items-center mt-auto p-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
        <Input className={`${theme === "dark" ? "bg-gray-700 placeholder-gray-400" : "placeholder-gray-600"}`} placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button className="ml-2 flex items-center justify-center p-2 bg-green-500" onClick={handleSendMessage}>
          <Send className="w-5 h-5" />
        </Button>
        <Button className={`hover:bg-green-600 text-white p-6 rounded transition-all duration-200 shadow-sm absolute top-2 right-2 w-10 h-10 flex items-center justify-center  bg-gray-200 text-xl ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`} onClick={toggleTheme}>
          {theme === "dark" ? "🌙" : "☀️"}
        </Button>
      </div>
    </div>
  )
}
