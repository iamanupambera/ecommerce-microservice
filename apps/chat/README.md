# Chat Service

The **Chat Service** is a microservice within the E-commerce platform that facilitates real-time communication between users. It is designed to handle messaging functionality, ensuring seamless and efficient interactions.

## Features

- Real-time messaging between users.
- Support for group chats and private messages.
- Message history and persistence.
- Typing indicators and read receipts.
- Scalable architecture for high traffic.

## Technologies Used

- **Backend**: Node.js, Nest.js
- **Database**: MongoDB
- **Real-time Communication**: WebSocket (Socket.IO)
- **Authentication**: JWT-based authentication
- **Containerization**: Docker

## Setup and Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo/ecommerce-microservice.git
cd ecommerce-microservice/apps/chat
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   Create a `.env` file in the root of the `chat` service and add the required variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/chat
JWT_SECRET=your_jwt_secret
```

4. Start the service:

```bash
npm start
```

## API Endpoints

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| POST   | `/messages`        | Send a new message       |
| GET    | `/messages/:id`    | Retrieve message history |
| GET    | `/users/:id/chats` | Get user chat list       |

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](../../CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](../../LICENSE).
