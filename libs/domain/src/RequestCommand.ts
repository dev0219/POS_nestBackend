export abstract class RequestCommand<CommandInput, CommandOutput> {
  private __payload: CommandInput;
  abstract action: string;
  constructor(payload: CommandInput) {
    this.__payload = payload;
  }
  getAction() {
    return this.action;
  }

  getPayload() {
    return this.__payload ?? true;
  }

  createOutput(): CommandOutput {
    return {} as CommandOutput;
  }
}
