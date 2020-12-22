import { MigrationInterface, QueryRunner, Table } from 'typeorm';

/**
 * Time line
 *
 * 1st week: appointments table created
 * 2nd week: users table created
 * 3rd week: a new dev change the appointments table
 * 4th week: buying table is created
 *
 * A migration avoids that each developers work on data bases different
 * versions
 *
 * The migrations control the data base version and simultaneous data base
 * changes.
 *
 * Instead of making changes straight to the data base, the developer creates
 * a migration file that has data base changes instructions.
 *
 * So when others developers download the new file (migration) from github,
 * it is only necessary to run it and everything that others developers had
 * done in yours data bases will be done in yours too.
 *
 * It's only possible to change a migration if it was not sent to the version
 * control system. Otherwise it is necessary to create a new migration.
 *
 * After you send the migration to github, you will never change it again. You
 * will need to create a new migration in order to apply new changes (ALWAYS):
 *
 * Samples:
 *  Creates a migration to create a table:
 *    yarn typeorm migration:create -n CreateUsers
 *
 *  Creates a new migration to alter a table:
 *    yarn typeorm migration:create -n AlterProviderFieldToProviderId
 *
 *  Runs the migration:
 *    yarn typeorm migration:run
 *
 *  Reverts the migration:
 *    yarn typeorm migration:revert
 */

export default class CreateAppointments1598961159570
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
  }
}
