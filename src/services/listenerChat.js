import axios from "axios"

const processedReceipts = new Set()

export const listenForMessages = async (idInstance, apiToken, onNewMessage) => {
    if (!idInstance || !apiToken) return

    const url = `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiToken}`

    try {
        while (true) {
            try {
                const response = await axios.get(url)
                if (!response.data || !response.data.body) {
                    await new Promise(resolve => setTimeout(resolve, 10000))
                    continue
                }

                console.log(response.data.body)
                const { senderData, messageData } = response.data.body
                const receiptId = response.data.receiptId

                if (!receiptId || processedReceipts.has(receiptId)) {
                    console.warn("Пропускаем дубликат", receiptId)
                    continue
                }

                processedReceipts.add(receiptId)

                if (messageData?.textMessageData) {
                    const newMessage = {
                        chatId: senderData.chatId,
                        text: messageData.textMessageData.textMessage,
                        timestamp: senderData.timestamp,
                        isOutgoing: false,
                        sender: senderData.sender,
                    }
                    onNewMessage(newMessage)
                }

                await axios.delete(
                    `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiToken}/${receiptId}`
                )
            } catch (error) {
                console.error("Ошибка при получении уведомлений:", error)
                await new Promise(resolve => setTimeout(resolve, 25000))
            }
        }
    } catch (fatalError) {
        console.error("Критическая ошибка в подписке на сообщения:", fatalError)
    }
}
