import axios from "axios"

export const fetchChats = async (idInstance, apiToken) => {
  try {

    if (!idInstance || !apiToken) {
      return { loadedChats: null, phoneNumber: null }
    }

    const chatsResponse = await axios.get(
      `https://api.green-api.com/waInstance${idInstance}/getChats/${apiToken}`
    )

    const chats = chatsResponse?.data || []

    return { loadedChats: chats }
  } catch (error) {
    return { loadedChats: null   }
  }
}