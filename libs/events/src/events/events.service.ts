import { NatsJetStreamClientProxy } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
import { Injectable } from '@nestjs/common';
import { timeout } from 'rxjs';
import { RequestEvent } from '@wecon/domain';

@Injectable()
export class EventsService {
  constructor(private readonly streamClient: NatsJetStreamClientProxy) {}

  public async request<EventInput>(
    event: RequestEvent<EventInput>,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.streamClient
        .emit(event.getAction(), event.getPayload())
        .pipe(
          timeout(
            process.env.COMMAND_TIMEOUT
              ? parseInt(process.env.COMMAND_TIMEOUT)
              : 60000,
          ),
        )
        .subscribe({
          next: (puckAck) => {
            console.log(puckAck);
            resolve();
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }
}
