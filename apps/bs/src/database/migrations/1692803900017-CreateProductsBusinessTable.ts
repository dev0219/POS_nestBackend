import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsBusinessTable1692803900017
  implements MigrationInterface
{
  name = 'CreateProductsBusinessTable1692803900017';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "business_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                                               "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                                               "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                                               "updated_by" character varying, 
                                               "business_id" character varying(255) NOT NULL, 
                                               "product_id" character varying(255) NOT NULL, 
                                               UNIQUE ("business_id", "product_id"),
                                               CONSTRAINT "PK_b7138d7ae82dbb2f962da964a8a" PRIMARY KEY ("id")); 
                                               COMMENT ON COLUMN "business_product"."business_id" IS 'Business id of the related to business'; 
                                               COMMENT ON COLUMN "business_product"."product_id" IS 'Product id of the related to business'`,
    );
    await queryRunner.query(
      `CREATE TABLE "business_type_product_category" (
                                                        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                                                        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                                                        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                                                        "updated_by" character varying, 
                                                        "business_type_id" character varying(255) NOT NULL, 
                                                        "product_category_id" character varying(255) NOT NULL, 
                                                        UNIQUE ("business_type_id", "product_category_id"),
                                                        CONSTRAINT "PK_7af2f1a6338affcaf7d9b68fa4d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "business_type_product_category"`);
    await queryRunner.query(`DROP TABLE "business_product"`);
  }
}
