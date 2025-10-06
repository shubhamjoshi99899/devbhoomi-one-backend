import { connect, JSONCodec, JetStreamManager, JetStreamClient } from 'nats';
import  {logger}  from '@libs/logger';

const jc = JSONCodec();

export class EventBus {
  private js!: JetStreamClient;
  private jsm!: JetStreamManager;

  async init(url: string) {
    const nc = await connect({ servers: url });
    this.js = nc.jetstream();
    this.jsm = await nc.jetstreamManager();
    logger.info({ url }, 'NATS connected');
    // ensure a stream (wildcard) exists
    await this.ensureStream('events', ['*.>']);
  }

  async ensureStream(name: string, subjects: string[]) {
    const streams = await this.jsm.streams.list().next();
    if (!streams.find(s => s.config.name === name)) {
      await this.jsm.streams.add({ name, subjects });
      logger.info({ name, subjects }, 'NATS stream created');
    }
  }

  publish<T>(subject: string, data: T) {
    return this.js.publish(subject, jc.encode(data));
  }

  subscribe<T>(subject: string, handler: (data: T) => Promise<void>) {
    (async () => {
      const sub = await this.js.subscribe(subject, {});
      for await (const m of sub) {
        try {
          await handler(jc.decode(m.data) as T);
          m.ack?.(); // ack if consumer is durable (configure at consumer)
        } catch (e) {
          // rely on redelivery / DLQ via consumer policy
        }
      }
    })();
  }
}
