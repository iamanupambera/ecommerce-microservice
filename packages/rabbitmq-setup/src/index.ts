import amqp from 'amqplib';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: [path.resolve(__dirname, '../../../.env'), '.env'] });

async function connectToRabbitMQ() {
  const rabbitMQUrl = process.env.RABBITMQ_ENDPOINT || '';

  if (!rabbitMQUrl) {
    throw new Error('Connection url missing');
  }

  console.log('Connecting to RabbitMQ...');

  const connection = await amqp.connect(rabbitMQUrl);
  const channel = await connection.createChannel();

  return { connection, channel };
}

async function setupExchangeAndQueue(
  channel: amqp.Channel,
  exchangeName: string,
  queueName: string,
  routingKey: string,
) {
  console.log(
    `Setting up exchange: ${exchangeName}, queue: ${queueName}, routingKey: ${routingKey}`,
  );

  await channel.assertExchange(exchangeName, 'direct');
  const queue = await channel.assertQueue(queueName, {
    durable: true,
    autoDelete: false,
  });
  await channel.bindQueue(queue.queue, exchangeName, routingKey);
}

async function setupNotificationService(channel: amqp.Channel) {
  const exchangeName = 'jobber-email-notification';
  const routingKey = 'auth-email';
  const queueName = 'auth-email-queue';

  await setupExchangeAndQueue(channel, exchangeName, queueName, routingKey);
}

async function setupAuthService(channel: amqp.Channel) {
  const exchangeName = 'jobber-auth-service';
  const routingKey = 'auth-email';
  const queueName = 'auth-email-queue';

  await setupExchangeAndQueue(channel, exchangeName, queueName, routingKey);
}

async function setupRabbitMQ() {
  try {
    const { connection, channel } = await connectToRabbitMQ();

    await setupNotificationService(channel);
    await setupAuthService(channel);

    console.log('RabbitMQ setup completed.');
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error setting up RabbitMQ:', error);
    process.exit(1);
  }
}

// Run the setup function
setupRabbitMQ();
