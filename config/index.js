module.exports = {
    "debug": true,
    "keys": [],
    "services": {},
    "authentication": {
        "default": "",
        "gateways": {
            "user.token": {
                protocol: "proton.token",
                options: {
                    privateKey: 'qwertyuiopasdfghjklzxcvbnm123456'
                }
            },
            'facebook': {
                protocol: 'proton.oauth2',
                options: {
                    graphAPIVersion: '3.3',
                    scope: 'email',
                    clientId: '2352414428330995',
                    clientSecret: '4a61ffdc02a291bfd8eb520e272dec3a',
                    authorizePath: 'https://graph.facebook.com/oauth/authorize',
                    tokenPath: 'https://graph.facebook.com/oauth/access_token',
                    redirectUri: 'http://localhost:2512/oauth/facebook'
                }
            },
            'instagram': {
                protocol: 'proton.oauth2',
                options: {
                    scope: 'basic',
                    clientId: '0bc5bc42f00345418e2581e5259648f4',
                    clientSecret: '21024db9c86f4090998fdd74d4b0e5a3',
                    authorizePath: 'https://api.instagram.com/oauth/authorize',
                    tokenPath: 'https://api.instagram.com/oauth/access_token',
                    redirectUri: 'http://localhost:2512/oauth/instagram'
                }
            },
            'google': {
                protocol: 'proton.oauth2',
                options: {
                    scope: 'profile',
                    clientId: '964964403840-98u7nt1cgf79rge7la3gr9robg8okq8j.apps.googleusercontent.com',
                    clientSecret: 'EWzM8i21PbDmD_8qEoR6ReQe',
                    authorizePath: 'https://accounts.google.com/o/oauth2/auth',
                    tokenPath: 'https://www.googleapis.com/oauth2/v4/token',
                    redirectUri: 'http://localhost:2512/oauth/google'
                }
            },
            'github': {
                protocol: 'proton.oauth2',
                options: {
                    scope: "public_repo",
                    clientId: 'bd7d0f4f317bb4dce5c3',
                    clientSecret: '5a1fa06bfd2915b14de7c3d85b8addd7dc89efe0',
                    authorizePath: 'https://github.com/login/oauth/authorize',
                    tokenPath: 'https://github.com/login/oauth/access_token',
                    redirectUri: 'http://localhost:2512/oauth/github'
                }
            },
            'slack': {
                protocol: 'proton.oauth2',
                options: {
                    scope: "users:read",
                    clientId: '56574233313.724801399136',
                    clientSecret: '37f9b1f9cc015c1ad995dcbd3189da87',
                    authorizePath: 'https://slack.com/oauth/authorize',
                    tokenPath: 'https://slack.com/api/oauth.access',
                    redirectUri: 'http://localhost:2512/oauth/slack'
                }
            }
        }
    },
    "authorization": {
        "default": "",
        "policies": {
            "post": {
                "driver": "config",
                "options": {
                    "user": [ "view", "comment", "create", "like", "edit"],
                    "admin": ["view", "comment", "create", "like", "edit", "delete"],
                    "mod": ["view", "comment", "create", "like", "edit", "delete"]
                }
            },
            "time": {
               "driver": "time"
            },
            "time.post": {
                "driver": "combined",
                "options": {
                    "policies": [
                        "time", "post"
                    ]
                }
            },
            "image": {
                "driver": "grouped",
                "options": {
                    "policies": [
                        "post", "time"
                    ]
                }
            },

        }
    },
    "locale": {
        "default": "",
        "presets": {}
    },
    "database": {
        "default": "fusion",
        "connections": {
            "fusion" : {
                client: "sqlite3",
                connection: __dirname + '/../db.sqlite',
                useNullAsDefault: true
            }
        },
        "migration": {
            directory: __dirname + "/../migrations"
        }
    },
    "view": "views"
};


