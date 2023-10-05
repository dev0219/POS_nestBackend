"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBusinessTables1690413718719 = void 0;
class CreateBusinessTables1690413718719 {
    constructor() {
        this.name = 'CreateBusinessTables1690413718719';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(`CREATE TABLE "business" (
                            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                            "updated_by" character varying, 
                            "name" character varying(200) NOT NULL, 
                            "address" character varying(500) NOT NULL, 
                            "gps" point NOT NULL, 
                            "phone" character varying(20), 
                            "business_type_id" uuid, 
                            CONSTRAINT "UQ_176116fa8e49f71d029979a3680" UNIQUE ("address"), 
                            CONSTRAINT "PK_0bd850da8dafab992e2e9b058e5" PRIMARY KEY ("id")); 
                            COMMENT ON COLUMN "business"."name" IS 'Name of the business'; 
                            COMMENT ON COLUMN "business"."address" IS 'Address of the business'; 
                            COMMENT ON COLUMN "business"."gps" IS 'GPS coordinates of the business'; 
                            COMMENT ON COLUMN "business"."phone" IS 'Phone number of the business'`);
        await queryRunner.query(`CREATE TABLE "business_category" (
                            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                            "updated_by" character varying, 
                            "name" character varying(200) NOT NULL, 
                            CONSTRAINT "PK_6fa4c15119f333b301d614c0b1a" PRIMARY KEY ("id")); 
                            COMMENT ON COLUMN "business_category"."name" IS 'Name of the business category'`);
        await queryRunner.query(`CREATE TABLE "business_event" (
                            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                            "updated_by" character varying, 
                            "version" integer NOT NULL, 
                            "payload" jsonb NOT NULL, 
                            "event_type" integer NOT NULL, 
                            CONSTRAINT "PK_764295f333ee430ce80e0d52472" PRIMARY KEY ("id")); 
                            COMMENT ON COLUMN "business_event"."version" IS 'Version of the event in the business'; 
                            COMMENT ON COLUMN "business_event"."payload" IS 'Payload of the event'; 
                            COMMENT ON COLUMN "business_event"."event_type" IS 'Type of the event'`);
        await queryRunner.query(`CREATE TABLE "business_type" (
                            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                            "updated_by" character varying, 
                            "name" character varying(200) NOT NULL, 
                            "business_category_id" uuid, 
                            CONSTRAINT "PK_dcc57dda934350221e1ff807bfa" PRIMARY KEY ("id")); 
                            COMMENT ON COLUMN "business_type"."name" IS 'Name of the business type'`);
        await queryRunner.query(`ALTER TABLE "business" ADD CONSTRAINT "FK_b9b47f8b0aa21535057e61a876f" FOREIGN KEY ("business_type_id") REFERENCES "business_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "business_type" ADD CONSTRAINT "FK_01195157e47452ba23b35a9e355" FOREIGN KEY ("business_category_id") REFERENCES "business_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "business_type" DROP CONSTRAINT "FK_01195157e47452ba23b35a9e355"`);
        await queryRunner.query(`ALTER TABLE "business" DROP CONSTRAINT "FK_b9b47f8b0aa21535057e61a876f"`);
        await queryRunner.query(`DROP TABLE "business_type"`);
        await queryRunner.query(`DROP TABLE "business_event"`);
        await queryRunner.query(`DROP TABLE "business_category"`);
        await queryRunner.query(`DROP TABLE "business"`);
    }
}
exports.CreateBusinessTables1690413718719 = CreateBusinessTables1690413718719;
//# sourceMappingURL=1690413718719-CreateBusinessTables.js.map