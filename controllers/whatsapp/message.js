const { sessions } = require('../../modules/Session');

const {
    validatePhoneNumber,
    hasTextContent,
    isValidAccessToken,
    cleanPhoneNumber
} = require('../Validators');

const whatsappChat = async (client, chatId, message, recipient) => {

    try {

        const response = await client.sendMessage(chatId, message);

        return {
            status: true,
            message: "Message sent successfully",
            response: {
                message_id: response.id.id,
                sent_to: response.to.split('@')[0],
                sent_on: recipient,
                status: "sent",
                type: "message",
                timestamp: response.timestamp,
                event: "message_sent"
            }
        };
    } catch (error) {
        console.error('Failed to send message:', error);

        return {
            status: false,
            message: "Failed to send message",
            error: error.message || "An error occurred."
        };
    }
}

const sendMessage = async (req) => {

    const groupName = req.body.groupName?.trim() || "";
    const message = req.body.message?.trim() || "";
    const sender = req.body.client_id || "";
    const number = req.body.number || "";
    const accessToken = req.body.token || "";

    //Checks
    if (!hasTextContent(message)) return {
        status: false,
        message: "No message found. You cannot send a blank message."
    }

    if (!validatePhoneNumber(sender)) return {
        status: false,
        message: "Invalid sender provided."
    }

    if (!isValidAccessToken(accessToken)) return {
        status: false,
        message: "Invalid access token provided."
    }

    //Get client from session
    const client = sessions.find(sess => sess.id == sender).client;

    if (!client) return {
        status: false,
        message: "Whatsapp not connected, kindly connect & try again"
    }

    //Check if we have to send this messge on group
    let recipient = "private_chat";

    if (hasTextContent(groupName)) {

        const group = await client.getChats().then(chats => {
            return chats.find(chat =>
                chat.isGroup && chat.name.toLowerCase() == groupName.toLowerCase()
            );
        });

        if (!group) return {
            status: false,
            message: `Group: ${groupName} is not available on your whatsapp`
        };

        recipient = `group_${groupName}`;
        return whatsappChat(client, group.id._serialized, message, recipient);
    }

    //Great! We have to send message on private chat
    if (!validatePhoneNumber(number)) return {
        status: false,
        message: "Invalid phone number provided."
    }

    const waNumber = cleanPhoneNumber(number) + '@c.us';
    const isRegisteredOnWhatsapp = await client.isRegisteredUser(waNumber);

    if (!isRegisteredOnWhatsapp) return {
        status: false,
        message: `Given recepiant no. ${number} is not available on whatsapp.`
    }

    return whatsappChat(client, waNumber, message, recipient);

}

module.exports = sendMessage;