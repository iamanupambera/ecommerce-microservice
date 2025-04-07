## Notification Microservice

The **Notification Microservice** is responsible for sending out email notifications to users based on events received from other services (e.g., Auth, User, etc.). It consumes messages via **RabbitMQ** and sends emails using **Nodemailer**.

### 📧 Available Email Templates

- Forgot Password
- Verify Email
- Reset Password Success
- Offer
- Order Placed
- Order Receipt
- Order Extension Request
- Order Extension Approval
- Order Delivered

### 🛠️ Technologies Used

- **NestJS**
- **@repo/emails** – Shared package to generate email HTML using React
- **RabbitMQ**
- **Elasticsearch**
- **Nodemailer**

> There are additional supporting packages used for development and production.

### 🐳 Create Docker Image

You can build and push a Docker image for this microservice to Docker Hub.

1. Create a [Docker Hub](https://hub.docker.com) account or log in.
2. Log in to Docker on your terminal.

3. Build and push:

```bash
docker build -t <your-dockerhub-username>/jobber-notification .
docker tag <your-dockerhub-username>/jobber-notification <your-dockerhub-username>/jobber-notification:stable
docker push <your-dockerhub-username>/jobber-notification:stable
```
