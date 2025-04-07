## Authentication Microservice

The authentication microservice is responsible for managing user registration and authentication workflows.

- A user that creates an account automatically becomes a buyer in the application.
- Upon successful registration, the Auth service emits a `user_created` event using RabbitMQ which is consumed by the User service to store buyer data in MongoDB.
- Errors from the service are either propagated to the gateway or logged in Elasticsearch.

### 🔧 Tools & Technologies Used

- `NestJS`
- `Typescript`
- `RabbitMQ`
- `Elasticsearch`
- `MySQL` (with `Prisma` as ORM)
- `Json Web Token (JWT)` for auth
- `@repo/modules` – shared NestJS modules
- `@repo/validator` – request validation

> This service is part of a **monorepo** managed using **TurboRepo**.

### ⚙️ Setup Instructions

1. Make sure your shared packages are published or locally linked.
2. Copy `.env.dev` to `.env`:

```bash
cp .env.dev .env
```

3. Configure the following in `.env`:

   - `DATABASE_URL` for MySQL connection
   - `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `JWT_TOKEN` and `GATEWAY_JWT_TOKEN` (must match across all microservices)

4. Install dependencies:

```bash
npm install
```

5. Run the service in development mode:

```bash
npm run dev
```

### 🐳 Docker Setup

You can containerize and push the image to Docker Hub:

```bash
docker build -t <your-dockerhub-username>/auth-service .
docker tag <your-dockerhub-username>/auth-service <your-dockerhub-username>/auth-service:stable
docker push <your-dockerhub-username>/auth-service:stable
```

### 📁 Folder Location

This service is located under the `apps/auth` directory in your TurboRepo monorepo.
