"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tracing_1 = require("./infrastructure/tracing/tracing");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const httpExceptionFilter_1 = require("./application/exceptions-filters/httpExceptionFilter");
async function bootstrap() {
    await tracing_1.otelSDK.start();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new httpExceptionFilter_1.HttpExceptionFilter());
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get('PORT') || 3000;
    common_1.Logger.log(`Environment: ${process.env.NODE_ENV}`, 'Bootstrap');
    common_1.Logger.log(`Listening in port: ${PORT}`, 'Bootstrap');
    const APP_NAME = configService.get('APP_NAME');
    const APP_DESCRIPTION = configService.get('APP_DESCRIPTION');
    const API_VERSION = configService.get('API_VERSION', 'v1');
    const options = new swagger_1.DocumentBuilder()
        .setTitle(APP_NAME)
        .setDescription(APP_DESCRIPTION)
        .setVersion(API_VERSION)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api-pos', app, document);
    common_1.Logger.log('Mapped {/api-pos, GET} Swagger api route', 'RouterExplorer');
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map