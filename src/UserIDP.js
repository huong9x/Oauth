import {singleton, DatabaseManager} from "@fusion.io/proton";

class User {
    constructor(profile) {
        this.profile = profile;
    }

    getName() {
        return this.profile.name;
    }

    getRoles() {
        return [this.profile.role]
    }
}

@singleton(DatabaseManager)
export default class UserIDP {
    constructor(dbm) {
        this.dbm = dbm;
    }

    async isRegistered(profile) {
        return await this.dbm.connection()
            .from('profiles')
            .where('provider', 'facebook')
            .where('external_id', profile.id).first();
    }

    async provide({ profile }) {
        const registered = await this.isRegistered(profile);

        if (!registered) {
            await this.dbm.connection()
                .from('profiles')
                .insert({ external_id: profile.id, provider: 'facebook', externalProfile: JSON.stringify(profile)})
        } else {
            await this.dbm.connection()
                .from('profiles')
                .update({ external_id: profile.id, provider: 'facebook', externalProfile: JSON.stringify(profile)})
                .where('id', registered.id)
        }

        return new User(profile);
    }
}