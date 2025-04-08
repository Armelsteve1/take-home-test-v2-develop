import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTagToIngredient1744137769407 implements MigrationInterface {
    name = 'AddTagToIngredient1744137769407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "tag"`);
        await queryRunner.query(`CREATE TYPE "public"."ingredient_tag_enum" AS ENUM('légumes', 'protéines', 'féculents')`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "tag" "public"."ingredient_tag_enum" NOT NULL DEFAULT 'légumes'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "tag"`);
        await queryRunner.query(`DROP TYPE "public"."ingredient_tag_enum"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "tag" character varying NOT NULL DEFAULT 'légumes'`);
    }

}
