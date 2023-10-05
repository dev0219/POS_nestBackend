import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBusinessTypeSuggestedTable1691019132636
  implements MigrationInterface
{
  name = 'CreateBusinessTypeSuggestedTable1691019132636';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "business_type_suggested" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying, "name" character varying(200) NOT NULL, "business_id" uuid, "business_category_id" uuid, CONSTRAINT "PK_72c109f66eb541426cfc518c8b3" PRIMARY KEY ("id")); COMMENT ON COLUMN "business_type_suggested"."name" IS 'Name of the business type'`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_type_suggested" ADD CONSTRAINT "FK_492133b60901566fdc507f05acd" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_type_suggested" ADD CONSTRAINT "FK_e0fda5bea101bfade9c5f85aa02" FOREIGN KEY ("business_category_id") REFERENCES "business_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_type_suggested" DROP CONSTRAINT "FK_e0fda5bea101bfade9c5f85aa02"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_type_suggested" DROP CONSTRAINT "FK_492133b60901566fdc507f05acd"`,
    );
    await queryRunner.query(`DROP TABLE "business_type_suggested"`);
  }
}
