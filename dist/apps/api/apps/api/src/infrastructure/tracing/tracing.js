"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otelSDK = void 0;
const sdk_trace_base_1 = require("@opentelemetry/sdk-trace-base");
const sdk_node_1 = require("@opentelemetry/sdk-node");
const process = require("process");
const instrumentation_http_1 = require("@opentelemetry/instrumentation-http");
const instrumentation_express_1 = require("@opentelemetry/instrumentation-express");
const instrumentation_nestjs_core_1 = require("@opentelemetry/instrumentation-nestjs-core");
const resources_1 = require("@opentelemetry/resources");
const semantic_conventions_1 = require("@opentelemetry/semantic-conventions");
const exporter_trace_otlp_proto_1 = require("@opentelemetry/exporter-trace-otlp-proto");
const oltpExporter = new exporter_trace_otlp_proto_1.OTLPTraceExporter({
    url: `https://api.honeycomb.io/v1/traces`,
    headers: {
        'x-honeycomb-team': process.env.HONEYCOMB_API_KEY,
    },
});
const spanProcessor = process.env.NODE_ENV === `development`
    ? new sdk_trace_base_1.SimpleSpanProcessor(oltpExporter)
    : new sdk_trace_base_1.BatchSpanProcessor(oltpExporter);
exports.otelSDK = new sdk_node_1.NodeSDK({
    resource: new resources_1.Resource({
        [semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME]: process.env.SERVICE_NAME,
    }),
    spanProcessor: spanProcessor,
    instrumentations: [
        new instrumentation_http_1.HttpInstrumentation(),
        new instrumentation_express_1.ExpressInstrumentation(),
        new instrumentation_nestjs_core_1.NestInstrumentation(),
    ],
});
process.on('SIGTERM', () => {
    exports.otelSDK
        .shutdown()
        .then(() => console.log('SDK shut down successfully'), (err) => console.log('Error shutting down SDK', err))
        .finally(() => process.exit(0));
});
//# sourceMappingURL=tracing.js.map