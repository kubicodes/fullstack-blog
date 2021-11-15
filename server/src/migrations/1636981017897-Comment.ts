import {MigrationInterface, QueryRunner} from "typeorm";

export class Comment1636981017897 implements MigrationInterface {
    name = 'Comment1636981017897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_c6fb082a3114f35d0cc27c518e0\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_276779da446413a0d79598d4fbd\``);
        await queryRunner.query(`DROP INDEX \`IDX_c6fb082a3114f35d0cc27c518e\` ON \`post\``);
        await queryRunner.query(`DROP INDEX \`REL_c6fb082a3114f35d0cc27c518e\` ON \`post\``);
        await queryRunner.query(`DROP INDEX \`IDX_276779da446413a0d79598d4fb\` ON \`comment\``);
        await queryRunner.query(`DROP INDEX \`REL_276779da446413a0d79598d4fb\` ON \`comment\``);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`postId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`CREATE INDEX \`idx_postId\` ON \`comment\` (\`postId\`)`);
        await queryRunner.query(`CREATE INDEX \`idx_authorId\` ON \`comment\` (\`authorId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`idx_authorId\` ON \`comment\``);
        await queryRunner.query(`DROP INDEX \`idx_postId\` ON \`comment\``);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD PRIMARY KEY (\`id\`, \`authorId\`)`);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`postId\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_276779da446413a0d79598d4fb\` ON \`comment\` (\`authorId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_276779da446413a0d79598d4fb\` ON \`comment\` (\`authorId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c6fb082a3114f35d0cc27c518e\` ON \`post\` (\`authorId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_c6fb082a3114f35d0cc27c518e\` ON \`post\` (\`authorId\`)`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_276779da446413a0d79598d4fbd\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_c6fb082a3114f35d0cc27c518e0\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
