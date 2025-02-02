import axios from "axios"

export const fetchMessages = async (idInstance, apiToken, chatId) => {
    if (!idInstance || !apiToken || !chatId) {
        return []
    }

    const url = `https://api.green-api.com/waInstance${idInstance}/getChatHistory/${apiToken}`
    const payload = { chatId }

    try {
        const response = await axios.post(url, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.data) {
            return response.data
                .map((msg) => ({
                    chatId: msg.chatId,
                    text: msg.textMessage,
                    timestamp: msg.timestamp,
                    isOutgoing: msg.type !== "incoming",
                    sender: msg.type === "incoming" ? msg.senderId : null,
                }))
                .sort((a, b) => a.timestamp - b.timestamp)
        } else {
            return []
        }
    } catch (error) {
        console.error("Ошибка загрузки сообщений:", error)
        return []
    }
}