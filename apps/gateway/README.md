# API Gateway - NestJS Microservice

The **API Gateway** is the entry point for all client interactions in a distributed microservice system. It acts as a reverse proxy, validates and routes incoming requests to the appropriate microservices via RPC (TCP). This gateway also performs authentication, request validation, error handling, and logging.

---

## 📦 Features

- Centralized request handling
- Authentication and token validation (JWT)
- Request/response pattern using TCP transport
- Centralized error formatting and propagation
- Logging and observability with Elasticsearch
- Real-time communication via Socket.IO
- Rate-limiting and Redis caching (optional)

---

## 📁 Folder Structure

```
gateway/
├── src/
│   ├── main.ts              # Entry point
│   ├── app.module.ts        # Root module
│   ├── modules/
│   │   ├── auth    # for authentication routing
│   │   ├── buyer   # for user buyer routing
│   │   ├── search  # for elastic search routing
│   │   └── seller  # for user seller routing
│   └── shared/
│        ├── decorators/
│        └── pipes/
├── Dockerfile                   # For building production image
├── tsconfig.json
└── package.json
```

---

## ⚙️ Environment Variables

The `.env` file is critical to configuration. Refer to `.env.example` and configure it like so:

```env
# Application
PORT=3000

# JWT
GATEWAY_JWT_SECRET=your_secret_key

# Redis
REDIS_URL=redis://localhost:6379

# Elasticsearch
ELASTICSEARCH_NODE=http://localhost:9200

# Microservices TCP ports
AUTH_SERVICE_PORT=3001
USER_SERVICE_PORT=3002
NOTIFICATION_SERVICE_PORT=3003
```

---

## 🚀 Running Locally

1. Install dependencies:

```bash
npm install
```

2. Setup your `.env`:

```bash
cp .env.example .env
```

3. Run RabbitMQ, Redis, and Elasticsearch via Docker:

```bash
docker-compose up -d
```

4. Start the development server:

```bash
npm run dev
```

---

## 📡 Communication

- **TCP (RPC)** – Communication with microservices happens using TCP transport.
- **Redis** – Session/token caching, rate-limiting.
- **Socket.IO** – Optional real-time features.

---

## 🔐 Authentication

The gateway handles:

- Reading JWT from cookies or headers
- Verifying and decoding tokens
- Guarding routes using `AuthGuard`

---

## 🧪 Testing

You can test each route by sending requests directly to the gateway. If the route is proxied to a microservice, the response will reflect its result or error.

---

## 🐳 Docker

Build and push your image:

```bash
docker build -t <your-dockerhub-username>/gateway-service .
docker tag <your-dockerhub-username>/gateway-service:latest

docker push <your-dockerhub-username>/gateway-service:latest
```

---

## 📖 Notes

- All errors are caught and logged.
- If a microservice throws a known exception, the gateway will forward it to the client.
- Unknown errors from the gateway itself are logged to Elasticsearch.
- Ensure JWT secret is consistent across services.

---

<!-- Let me know if you'd like this gateway integrated with Swagger, API versioning, rate-limiting, or OAuth! -->
