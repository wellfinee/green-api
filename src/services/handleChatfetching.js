 import { fetchChats } from "./fetchChats"
 export const handleFetchChats = async (idInstance, apiToken, setChats, setLoading, setError) => {

    if (!idInstance || !apiToken) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { loadedChats } = await fetchChats(idInstance, apiToken)
      if (loadedChats) {
        setChats(loadedChats)
      } else {
        setError("Failed to fetch chats")
      }
    } catch (error) {
      setError("An error occurred while fetching chats and phone number.")
    } finally {
      setLoading(false)
    }
  }
