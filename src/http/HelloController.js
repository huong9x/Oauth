import {singleton, get, Controller, authorize, authenticate, inject, DatabaseManager} from "@fusion.io/proton";

@singleton()
export default class HelloController extends Controller {
    @get('/', authenticate('user.token'), authorize('view', 'post'))
    async index(context, next) {
        // context.render('hello', { message: "tokamak.fuse(ProtonPlasma);" });
        console.log(context.identity);
        context.body = context.identity
    }

    @get('/oauth/facebook', authenticate('facebook'))
    async facebook(context) {
        context.body = context.identity;
    }

    @get('/facebook-users')
    @inject(DatabaseManager)
    async user(context, next, dbm) {
        context.body = await dbm.connection().from('profiles');
    }

    @get('/oauth/instagram', authenticate('instagram'))
    async instagram(context) {
        context.body = context.identity;
    }

    @get('/oauth/google', authenticate('google'))
    async google(context) {
        context.body = context.identity;
    }
    @get('/oauth/github', authenticate('github'))
    async github(context) {
        context.body = context.identity;
    }
    @get('/oauth/slack', authenticate('slack'))
    async slack(context) {
        context.body = context.identity;
    }
}
