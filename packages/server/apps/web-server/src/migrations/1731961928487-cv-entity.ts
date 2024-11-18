import { MigrationInterface, QueryRunner } from "typeorm";

export class CvEntity1731961928487 implements MigrationInterface {
    name = 'CvEntity1731961928487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "education" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "name" character varying NOT NULL, "degree" character varying NOT NULL, "duration" character varying NOT NULL, "location" character varying NOT NULL, "type" character varying, "description" text NOT NULL, "skills" text NOT NULL, "cvId" uuid NOT NULL, CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_experience" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "name" character varying NOT NULL, "position" character varying NOT NULL, "duration" character varying NOT NULL, "location" character varying NOT NULL, "type" character varying NOT NULL, "description" text NOT NULL, "skills" text NOT NULL, "cvId" uuid NOT NULL, CONSTRAINT "PK_d4bef63ad6da7ec327515c121bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact_info" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "cvId" character varying NOT NULL, CONSTRAINT "PK_65b98fa4ffb26dceb9192f5d496" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "skills" text NOT NULL, "cvId" uuid NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "category" character varying NOT NULL, "items" text NOT NULL, "cvId" uuid NOT NULL, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cv" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "title" character varying NOT NULL, "userId" uuid NOT NULL, "contactInfoId" uuid, CONSTRAINT "REL_b6b39ccb57ab8ffcb53d162908" UNIQUE ("contactInfoId"), CONSTRAINT "PK_4ddf7891daf83c3506efa503bb8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "education" ADD CONSTRAINT "FK_5f14cc76c59d7a30e5b8b1ce3d8" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_experience" ADD CONSTRAINT "FK_d4e46d49ecc77dae08b75a60afd" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_736a4dfdf60ba8819dddff64739" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "skill" ADD CONSTRAINT "FK_762b79bed6fe5c8ff134b72e796" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cv" ADD CONSTRAINT "FK_e4b7330e64fd0ecce86720e62f9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cv" ADD CONSTRAINT "FK_b6b39ccb57ab8ffcb53d162908f" FOREIGN KEY ("contactInfoId") REFERENCES "contact_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cv" DROP CONSTRAINT "FK_b6b39ccb57ab8ffcb53d162908f"`);
        await queryRunner.query(`ALTER TABLE "cv" DROP CONSTRAINT "FK_e4b7330e64fd0ecce86720e62f9"`);
        await queryRunner.query(`ALTER TABLE "skill" DROP CONSTRAINT "FK_762b79bed6fe5c8ff134b72e796"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_736a4dfdf60ba8819dddff64739"`);
        await queryRunner.query(`ALTER TABLE "work_experience" DROP CONSTRAINT "FK_d4e46d49ecc77dae08b75a60afd"`);
        await queryRunner.query(`ALTER TABLE "education" DROP CONSTRAINT "FK_5f14cc76c59d7a30e5b8b1ce3d8"`);
        await queryRunner.query(`DROP TABLE "cv"`);
        await queryRunner.query(`DROP TABLE "skill"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "contact_info"`);
        await queryRunner.query(`DROP TABLE "work_experience"`);
        await queryRunner.query(`DROP TABLE "education"`);
    }

}
