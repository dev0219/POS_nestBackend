"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductsBusinessTable1692803900017 = void 0;
class CreateProductsBusinessTable1692803900017 {
    constructor() {
        this.name = 'CreateProductsBusinessTable1692803900017';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "business_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                                               "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                                               "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                                               "updated_by" character varying, 
                                               "business_id" character varying(255) NOT NULL, 
                                               "product_id" character varying(255) NOT NULL, 
                                               UNIQUE ("business_id", "product_id"),
                                               CONSTRAINT "PK_b7138d7ae82dbb2f962da964a8a" PRIMARY KEY ("id")); 
                                               COMMENT ON COLUMN "business_product"."business_id" IS 'Business id of the related to business'; 
                                               COMMENT ON COLUMN "business_product"."product_id" IS 'Product id of the related to business'`);
        await queryRunner.query(`CREATE TABLE "business_type_product_category" (
                                                        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                                                        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                                                        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                                                        "updated_by" character varying, 
                                                        "business_type_id" character varying(255) NOT NULL, 
                                                        "product_category_id" character varying(255) NOT NULL, 
                                                        UNIQUE ("business_type_id", "product_category_id"),
                                                        CONSTRAINT "PK_7af2f1a6338affcaf7d9b68fa4d" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "business_type_product_category"`);
        await queryRunner.query(`DROP TABLE "business_product"`);
    }
}
exports.CreateProductsBusinessTable1692803900017 = CreateProductsBusinessTable1692803900017;
//# sourceMappingURL=1692803900017-CreateProductsBusinessTable.js.map