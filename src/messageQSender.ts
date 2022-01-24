import { Device, DeviceDto } from './interfaces/interfaces';

const amqp = require('amqplib/callback_api');

export const sendDevice = (device: Device, updateDevice: boolean) => {
  amqp.connect(process.env.CLOUDAMQP_URL, (error: any, connection: any) => {
    if (error) {
      throw error;
    }
    connection.createChannel((error1: any, channel: any) => {
      if (error1) {
        throw error1;
      }

      console.log(`sending ${device} to push service`);
      const queue = 'sendDevice_Queue';
      const msg: DeviceDto = { device, updateDevice };

      channel.assertQueue(queue, {
        durable: true
      });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), {
        persistent: true
      });

      console.log(' [x] Sent %s', msg);
    });
    setTimeout(() => {
      connection.close();
    }, 500);
  });
};
