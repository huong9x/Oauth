import {
    Plasma as CorePlasma,
    inject,
    Kernel,
    Router,
    Authorizer,
    Authenticator,
    ErrorHandlerManager,
    UnAuthenticated,
    UnAuthorized,
    JsonWebTokenIdentityProvider,
    FacebookIdentityProvider,
    GoogleIdentityProvider, GithubIdentityProvider, InstagramIdentityProvider, SlackIdentityProvider
} from "@fusion.io/proton";
import TimePolicy from "../TimePolicy";
import UserIDP from "../UserIDP";
import HelloController from "./HelloController";

export default class Plasma extends CorePlasma {

    @inject(Authorizer, Authenticator, UserIDP)
    compose(authorizer, authenticator, userIdentityProvider) {
        /**
         * @type Authorizer
         */
        authorizer.supporting('time', () => new TimePolicy());

        authenticator
                    .connect('facebook', () => [
                    new FacebookIdentityProvider('3.3'),
                    userIdentityProvider
                    ])
                    .connect('slack', () => {
                    return new SlackIdentityProvider("X-Demo");
                    })
                    .connect('google', (options) => {
                    return new GoogleIdentityProvider(options.clientSecret);
                    })
                    .connect('github', () => {
                        return new GithubIdentityProvider("X-Demo");
                    })
                    .connect('instagram', () => {
                        return new InstagramIdentityProvider();
                    })
    }

    @inject(Kernel, Router, Authorizer, ErrorHandlerManager)
    boot(kernel, router, authorizer, errorHandler) {

        errorHandler.willHandle(UnAuthenticated, (error, context) => {
            context.status = 403;
            context.body = {
                message: 'You must login first'
            }
        });

        errorHandler.willHandle(UnAuthorized, (error, context) => {
            context.status = 401;
            context.body = {
                message: 'Your are not allowed to perform this action'
            }
        });


        kernel.use(router.routes());
        kernel.use(router.allowedMethods());

        router.controller(HelloController);
    }
}
