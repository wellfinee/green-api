import axios from "axios"
export const sendMessage = async (
  idInstance,
  apiToken,
  phoneNumber,
  message,
  messages,
  setMessages,
  setMessage
) => {
  if (!idInstance || !apiToken || !phoneNumber || !message) return

  try {
    const chatId = phoneNumber; 

    const response = await axios.post(
      `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiToken}`,
      {
        chatId,
        message,
      }
    )

    setMessages([...messages, { 
      chatId: chatId,
      text: message,
      timestamp: response.data.timestamp,
      isOutgoing: "outgoing",
      sender: null, }])
    setMessage("")
  } catch (error) {
    console.error("Error sending message:", error)
  }
}