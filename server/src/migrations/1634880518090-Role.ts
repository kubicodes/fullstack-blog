import {MigrationInterface, QueryRunner} from "typeorm";

export class Role1634880518090 implements MigrationInterface {
    name = 'Role1634880518090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` ADD UNIQUE INDEX \`IDX_4a74ca47fe1aa34a28a6db3c72\` (\`title\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` DROP INDEX \`IDX_4a74ca47fe1aa34a28a6db3c72\``);
    }

}
