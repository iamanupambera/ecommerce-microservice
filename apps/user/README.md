## Users Microservice

- The **Users Microservice** is responsible for managing both sellers and buyers.
- A buyer can become a seller by creating a seller profile.
- Sellers can update their profile and view their dashboard information.
- The service **publishes** and **consumes** events to/from other microservices using RabbitMQ.
- Server-side errors are logged to **Elasticsearch** and can be monitored via **Kibana**.

### Tech Stack

- `@repo/modules` – Your shared NestJS modules
- `@repo/validator` – request validation
- `NestJS`
- `RabbitMQ`
- `Elasticsearch`
- `MongoDB` with `Prisma`
- `Json Web Token (JWT)`

### Setup Instructions

> This project is part of a monorepo managed with **Turborepo**.

1. Ensure your shared packages (like `@repo/modules`) are built and available.
2. Copy the contents of `.env.dev` to a new `.env` file.
   - Get your credentials from [Cloudinary](https://cloudinary.com) and update:
     - `CLOUD_NAME`
     - `CLOUD_API_SECRET`
     - `CLOUD_API_KEY`
   - Generate and provide consistent `GATEWAY_JWT_TOKEN` and `JWT_TOKEN` values across microservices.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the service in development mode:
   ```bash
   npm run dev
   ```

---

### Docker Instructions

You can create and push your own Docker image for the Users service.

1. [Create a Docker Hub account](https://hub.docker.com) and log in via CLI:
   ```bash
   docker login
   ```
2. Build and push the Docker image:
   ```bash
   docker build -t <your-dockerhub-username>/jobber-users .
   docker tag <your-dockerhub-username>/jobber-users <your-dockerhub-username>/jobber-users:stable
   docker push <your-dockerhub-username>/jobber-users:stable
   ```
