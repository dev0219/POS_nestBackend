"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductTable1695238018843 = void 0;
class UpdateProductTable1695238018843 {
    constructor() {
        this.name = 'UpdateProductTable1695238018843';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying, "barcode" character varying(48) NOT NULL, "name" character varying(200) NOT NULL, "short_name" character varying(200) NOT NULL, "measure" integer NOT NULL, "product_type_id" uuid, "product_brand_id" uuid,"photoUrl" character varying(1000), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")); COMMENT ON COLUMN "product"."barcode" IS 'Barcode of product'; COMMENT ON COLUMN "product"."name" IS 'Name of product'; COMMENT ON COLUMN "product"."short_name" IS 'Short name of product'; COMMENT ON COLUMN "product"."photoUrl" IS 'Photo Url of product'`);
        await queryRunner.query(`CREATE TABLE "product_brand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying, "name" character varying(200) NOT NULL, "products_count" integer, CONSTRAINT "PK_2eb5ce4324613b4b457c364f4a2" PRIMARY KEY ("id")); COMMENT ON COLUMN "product_brand"."name" IS 'Name of brand'; COMMENT ON COLUMN "product_brand"."products_count" IS 'Number of products in the brand'`);
        await queryRunner.query(`CREATE TABLE "product_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying, "name" character varying(200) NOT NULL, "products_count" integer, CONSTRAINT "PK_0dce9bc93c2d2c399982d04bef1" PRIMARY KEY ("id")); COMMENT ON COLUMN "product_category"."name" IS 'Name of product'; COMMENT ON COLUMN "product_category"."products_count" IS 'Number of products in the brand'`);
        await queryRunner.query(`CREATE TABLE "product_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying, "name" character varying(200) NOT NULL, "products_count" integer, "product_category_id" uuid, CONSTRAINT "PK_e0843930fbb8854fe36ca39dae1" PRIMARY KEY ("id")); COMMENT ON COLUMN "product_type"."name" IS 'Name of product'; COMMENT ON COLUMN "product_type"."products_count" IS 'Number of products in the brand'`);
        await queryRunner.query(`CREATE TABLE "product_product_type" ("productId" uuid NOT NULL, "productTypeId" uuid NOT NULL, CONSTRAINT "PK_b71465ca944078956f1dfe8fe64" PRIMARY KEY ("productId", "productTypeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9bb5fa036f3cb77c910fd098dd" ON "product_product_type" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_483acdcaf0fae55833b5a19a5d" ON "product_product_type" ("productTypeId") `);
        await queryRunner.query(`CREATE TABLE "product_category_product_brand" ("productBrandId" uuid NOT NULL, "productCategoryId" uuid NOT NULL, CONSTRAINT "PK_8ff907c22942d4680b30cdb4866" PRIMARY KEY ("productBrandId", "productCategoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d9a676fe6842462ff0359b8a66" ON "product_category_product_brand" ("productBrandId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8e92f5a106ad800bfd9cd620cd" ON "product_category_product_brand" ("productCategoryId") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_8e25093f12c958d5b847b76fb4e" FOREIGN KEY ("product_brand_id") REFERENCES "product_brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_type" ADD CONSTRAINT "FK_edc51cf290b1a5f2ab1b9677f2f" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_product_type" ADD CONSTRAINT "FK_9bb5fa036f3cb77c910fd098dd0" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_product_type" ADD CONSTRAINT "FK_483acdcaf0fae55833b5a19a5d9" FOREIGN KEY ("productTypeId") REFERENCES "product_type"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_category_product_brand" ADD CONSTRAINT "FK_d9a676fe6842462ff0359b8a667" FOREIGN KEY ("productBrandId") REFERENCES "product_brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_category_product_brand" ADD CONSTRAINT "FK_8e92f5a106ad800bfd9cd620cdc" FOREIGN KEY ("productCategoryId") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product_category_product_brand" DROP CONSTRAINT "FK_8e92f5a106ad800bfd9cd620cdc"`);
        await queryRunner.query(`ALTER TABLE "product_category_product_brand" DROP CONSTRAINT "FK_d9a676fe6842462ff0359b8a667"`);
        await queryRunner.query(`ALTER TABLE "product_product_type" DROP CONSTRAINT "FK_483acdcaf0fae55833b5a19a5d9"`);
        await queryRunner.query(`ALTER TABLE "product_product_type" DROP CONSTRAINT "FK_9bb5fa036f3cb77c910fd098dd0"`);
        await queryRunner.query(`ALTER TABLE "product_type" DROP CONSTRAINT "FK_edc51cf290b1a5f2ab1b9677f2f"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_8e25093f12c958d5b847b76fb4e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8e92f5a106ad800bfd9cd620cd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d9a676fe6842462ff0359b8a66"`);
        await queryRunner.query(`DROP TABLE "product_category_product_brand"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_483acdcaf0fae55833b5a19a5d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9bb5fa036f3cb77c910fd098dd"`);
        await queryRunner.query(`DROP TABLE "product_product_type"`);
        await queryRunner.query(`DROP TABLE "product_type"`);
        await queryRunner.query(`DROP TABLE "product_category"`);
        await queryRunner.query(`DROP TABLE "product_brand"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }
}
exports.UpdateProductTable1695238018843 = UpdateProductTable1695238018843;
//# sourceMappingURL=1695238018843-UpdateProductTable.js.map