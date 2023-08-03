import {MigrationInterface, QueryRunner} from "typeorm";

export class Todo1599371052458 implements MigrationInterface {
    name = 'Todo1599371052458'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "todo" ("id" SERIAL NOT NULL, "singleUUID" character varying NOT NULL, "createdOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "completedOn" TIMESTAMP WITH TIME ZONE, "updatedOn" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "todo"`, undefined);
    }

}
