import amqp from 'amqplib';

export async function setupFanoutListener(uri: string, exchangeName: string) {
  try {
    const connection = await amqp.connect(uri);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'fanout', { durable: false });

    return { connection, channel };
  } catch (err) {
    console.error('🚨 Error setting up fanout listener:', err);
    throw err;
  }
}
