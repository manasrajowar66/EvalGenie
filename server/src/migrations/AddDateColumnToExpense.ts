import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateColumnToExpense1707070000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "expense" ADD COLUMN "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "expense" DROP COLUMN "date";
        `);
    }
}
