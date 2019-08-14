export default class CreateUserTable {

    /**
     *
     *
     * @param {SchemaBuilder} schema
     * @returns {Promise<void>}
     */
    async up(schema) {
        return schema.createTable('users', table => {
            table.increments();
            table.string('email');
            table.string('password');
            table.string('role');
            table.timestamps();
        });
    }

    async down(schema) {
        return schema.dropTable('users');
    }
}
