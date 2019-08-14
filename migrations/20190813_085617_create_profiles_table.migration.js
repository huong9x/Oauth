export default class CreateProfilesTable {

    async up(schema) {
        await schema.createTable('profiles', table => {
            table.increments();
            table.timestamps();
            table.string('external_id');
            table.string('provider');
            table.string('externalProfile');
        })
    }

    async down(schema) {
        await schema.dropTable('profiles');
    }
}
