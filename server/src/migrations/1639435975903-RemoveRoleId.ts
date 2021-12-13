import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveRoleId1639435975903 implements MigrationInterface {
    name = 'RemoveRoleId1639435975903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role_id\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role_id\` int NOT NULL`);
    }

}
