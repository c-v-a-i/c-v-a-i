import { MigrationInterface, QueryRunner } from "typeorm";

export class SomeFieldsAreOptional1733644263545 implements MigrationInterface {
    name = 'SomeFieldsAreOptional1733644263545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_experience" ALTER COLUMN "duration" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_experience" ALTER COLUMN "location" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_experience" ALTER COLUMN "type" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_experience" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_experience" ALTER COLUMN "skills" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_experience" ALTER COLUMN "skills" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_experience" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_experience" ALTER COLUMN "type" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_experience" ALTER COLUMN "location" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_experience" ALTER COLUMN "duration" SET NOT NULL`);
    }

}
