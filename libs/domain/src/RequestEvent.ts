export abstract class RequestEvent<EventInput> {
  private __payload: EventInput;
  abstract action: string;

  constructor(payload: EventInput) {
    this.__payload = payload;
  }

  getAction() {
    return this.action;
  }

  getPayload() {
    return this.__payload;
  }
}
