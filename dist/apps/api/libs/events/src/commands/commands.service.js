"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandsService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let CommandsService = class CommandsService {
    constructor(commandClient) {
        this.commandClient = commandClient;
    }
    async request(command) {
        let result = command.createOutput();
        await this.commandClient
            .send(command.getAction(), command.getPayload())
            .pipe((0, rxjs_1.timeout)(process.env.COMMAND_TIMEOUT
            ? parseInt(process.env.COMMAND_TIMEOUT)
            : 60000))
            .forEach((value) => {
            result = value;
        });
        return result;
    }
};
CommandsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('COMMANDS_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], CommandsService);
exports.CommandsService = CommandsService;
//# sourceMappingURL=commands.service.js.map