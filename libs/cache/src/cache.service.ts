import { Injectable } from '@nestjs/common';
import { connect, KV, JetStreamClient, StringCodec, Codec } from 'nats';

export interface CacheBucket {
  save(key: string, value: any): Promise<void>;
  get<T>(key: string): Promise<T>;
}

class JetStreamBucket implements CacheBucket {
  bucket: KV;
  stringCodec: Codec<string>;
  constructor(bucket: KV, stringCodec: Codec<string>) {
    this.bucket = bucket;
    this.stringCodec = stringCodec;
  }
  async save(key: string, value: any): Promise<void> {
    try {
      await this.bucket.put(
        key,
        this.stringCodec.encode(JSON.stringify(value)),
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async get<T>(key: string): Promise<T> {
    const value = (await this.bucket.get(key))?.value;
    if (value == null) return null;

    return JSON.parse(this.stringCodec.decode(value)) as T;
  }
}

@Injectable()
export class CacheService {
  private jetStreamClient: JetStreamClient;
  private stringCodec = StringCodec();

  constructor() {
    this.initConnection();
  }

  private async initConnection() {
    const natsConnection = await connect({
      servers: `nats://${process.env.NATS_SERVER}`,
    });
    this.jetStreamClient = natsConnection.jetstream();
    const err = await natsConnection.closed();

    if (err) {
      console.error(err);
      process.exit(1);
    }
  }

  private async getBucket(name: string): Promise<CacheBucket> {
    const bucket = await this.jetStreamClient.views.kv(name);
    return new JetStreamBucket(bucket, this.stringCodec);
  }
  getCatalogsBucket(): Promise<CacheBucket> {
    return this.getBucket(`general_catalogs`);
  }

  getUserBucket(userId: string): Promise<CacheBucket> {
    return this.getBucket(`user_${userId}`);
  }
  getBusinessBucket(businessId: string): Promise<CacheBucket> {
    return this.getBucket(`business_${businessId}`);
  }
}
