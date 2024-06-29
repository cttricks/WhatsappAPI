# WhatsappAPI
<div align="left">
    <p>
		<img src="https://img.shields.io/npm/v/whatsapp-web.js.svg" alt="npm" />
        <img src="https://badges.depfu.com/badges/4a65a0de96ece65fdf39e294e0c8dcba/overview.svg" alt="Depfu" />
        <img src="https://img.shields.io/badge/WhatsApp_Web-2.2346.52-brightgreen.svg" alt="WhatsApp_Web 2.2346.52" />
	</p>
</div>

Extend [Whatsapp-Web.js](https://wwebjs.dev/) Capabilities with [Express JS](https://expressjs.com/)

WhatsappAPI is a Node.js application that extends the capabilities of WhatsApp by providing a RESTful API using [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) and [Express.js](https://expressjs.com/). This allows developers to automate interactions with WhatsApp, handle incoming messages via callback APIs, and programmatically send messages.

> It is not guaranteed you will not be blocked by using this method. WhatsApp does not allow bots or unofficial clients on their platform, so this shouldn't be considered totally safe.

### Features
- Callback/Postback API: Receive incoming messages and notifications via a predefined callback endpoint.
- Send Messages API: Programatically send messages to WhatsApp contacts or groups.
- Integration Ready: Easily integrate with existing systems or applications using the RESTful API.

### Usage Scenario
- Use this repository to extend your WhatsApp automation capabilities by setting up a local server or deploying it to a VPS.
- Customize the API endpoints and handling logic to suit your specific automation needs.
- Ideal for developers looking to automate responses, notifications, or data processing via WhatsApp.

## Installation
> Node v18+ is required. 

### Windows
To get started just follow these simple steps

- Clone this repository

    ```cmd
    git clone https://github.com/your-username/WhatsappAPI.git
    ```
- Navigate into the project directory

    ```cmd
    cd WhatsappAPI
    ```
- Install dependencies

    ```cmd
    npm install
    ```

- Configure your WhatsApp session credentials and callback endpoints in the `.env` file.
- Start the server

    ```cmd
    npm run start
    ```

When you run the service for the first time, it will generate a QR code image that you can find at `/images/whatsapp-qrcode.png` or you can also visit `http://localhost:3000/view-session-qrcode`. Simply open WhatsApp on your phone, navigate to the WhatsApp Web section, and scan this QR code to start a session. Once the session is successfully created, you will see a `CONNECTED & READY TO USE` message in the console.

🥳 Wohoo... Your WhatsappAPI is Ready to Use!

## Send Message
To send your first message, you need to use an API calling tool such as Postman, which you can install on your laptop or PC.

#### Request URL/Endpoint

```curl
http://localhost:3000/send/message
```
#### Example payload for sending message on `private-chat`

```json
{
    "message": "Hello Tanish",
    "client_id": "917XXXXXXX87",
    "token": "TOKEN-DEFINED-IN-ENV-FILE",
    "number": "916XXXXXXX90"
}
```
#### Example payload for sending message on a `group`

```json
{
    "message": "Hello Tanish",
    "client_id": "917XXXXXXX87",
    "token": "TOKEN-DEFINED-IN-ENV-FILE",
    "groupName": "GROUP-TITLE"
}
```

Use these payloads to send messages to either a private chat or a group. Make sure to replace the placeholder values with actual data and ensure your token matches the one defined in your environment file.

## Acknowledgments & Support
Built with [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
Inspired by the need for customizable WhatsApp automation solutions. For questions, bug reports, or feature requests related to the original repository setup, [please open an issue](https://github.com/pedroslopez/whatsapp-web.js/issues).

## Disclaimer
This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with WhatsApp or any of its subsidiaries or its affiliates. The official WhatsApp website can be found at [whatsapp.com](https://whatsapp.com/). "WhatsApp" as well as related names, marks, emblems and images are registered trademarks of their respective owners. Also it is not guaranteed you will not be blocked by using this method. WhatsApp does not allow bots or unofficial clients on their platform, so this shouldn't be considered totally safe.

## License
This project is licensed under the MIT License. See the LICENSE file for details.