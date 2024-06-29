const SendPostback = require('../Postback');

const onMessage = async (msg) => {

    if (msg.body == '!hello') {
        msg.reply(`Hey ${(msg._data.notifyName) ? msg._data.notifyName : "buddy!"}`);
        return;
    }

    const response = {
        "wp_number": msg.from.split('@')[0],
        "client_id": msg.to.split('@')[0],
        "message_id": msg.id.id,
        "response_type": msg.type.split('_')[0],
        "event": "message_received",
        "sender_name": (msg._data.notifyName) ? msg._data.notifyName : "",
        "sent_from": "private_chat",
        "deviceType": (msg.deviceType) ? msg.deviceType : "android",
        "text_message": msg.body,
        "hasMedia": false,
        "media_url": ""
    };

    let chat = await msg.getChat();
    
    if (msg.from.includes('g.us')) {
        response['group_id'] = response['wp_number'];
        response['sent_from'] = "group";
        response['group_name'] = chat.name;
        response['wp_number'] = msg.author.split('@')[0];
    }

    if (response['sender_name'].length < 1) {
        response['sender_name'] = chat.name;
    }

    SendPostback(response);
}

const onACK = async (msg, ack) => {

    const status = ['sent', 'delivered', 'read', 'seen'];
    const response = {
        "wp_number": msg.to.split('@')[0],
        "client_id": msg.from.split('@')[0],
        "message_id": msg.id.id,
        "status": ((msg.ack < 4) ? status[msg.ack] : 'seen'),
        "event": "message_status",
        "timestamp": msg._data.t
    };

    if (msg.to.includes('g.us')) {
        response['group_id'] = response['wp_number'];
        delete response['wp_number'];
    }

    SendPostback(response);
}

module.exports = {
    onMessage,
    onACK
}