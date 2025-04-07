# NestJS Microservices Monorepo with TurboRepo

This is a microservices-based backend architecture built using **NestJS** and managed via **TurboRepo**. The project is structured to enable modular, scalable development with clear separation of concerns.

---

## 🧱 Monorepo Structure

This project follows a monorepo structure using **TurboRepo**, with the following services located under the `apps` directory and shared packages under `packages`:

```
.
├── apps/
│   ├── auth/                 # Authentication Service
│   ├── gateway/              # API Gateway
│   ├── notification/         # Notification Service
│   └── user/                 # User Service
├── packages/
│   ├── emails/               # Email templating
│   ├── modules/              # Reusable NestJS modules
│   └── validator/            # class-validator based request validation
├── package.json              # Root-level package.json
└── turbo.json                # Turborepo config
```

---

## ⚙️ Technologies Used

- **NestJS** – Progressive Node.js framework for building efficient and scalable server-side applications.
- **TurboRepo** – High-performance monorepo build system.
- **RabbitMQ (RMQ)** – For asynchronous communication between services.
- **TCP (RPC)** – For synchronous communication between the Gateway and microservices.
- **TypeScript** – Strongly typed JavaScript.

---

## 🧩 Microservices Overview

### 1. **Auth Service**

Handles user authentication, login, signup, and JWT/token management.

### 2. **User Service**

Manages user profile data, roles, and user-related operations.

### 3. **Notification Service**

Sends notifications via email/SMS and listens for relevant events using RabbitMQ.

### 4. **Gateway**

Acts as the entry point for all client requests. Communicates with internal services via TCP and dispatches/receives events via RMQ.

---

## 🔁 Communication Strategy

- **TCP (RPC)**:  
  The Gateway uses TCP transport to perform Remote Procedure Calls (RPC) to each microservice. This enables real-time, synchronous communication.

- **RabbitMQ (RMQ)**:  
  Used for asynchronous communication and event-driven workflows.

  #### Example Use Cases:

  - `auth` service emits a `user_created` event → `notification` service listens and sends a welcome email.
  - `user` service emits updates → other services can act on changes (e.g., audit logs, analytics).

## ⚙️ Environment Setup & Running in Dev Mode

### 1. Clone the Repository

```bash
 git clone https://github.com/iamanupambera/ecommerce-microservice
```

### 2. Install Dependencies

```bash
  npm run dev
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

### 4. Start RabbitMQ (Locally via Docker)

```bash
  cd ./infra
  docker compose up
```

### 5. Run All Services in Development Mode

```bash
npm run dev
```
