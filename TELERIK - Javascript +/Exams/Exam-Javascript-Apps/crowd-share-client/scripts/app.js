(function() {
    require.config({
        paths: {
            jquery: 'libs/jquery-2.1.1.min',
            sammy: 'libs/sammy',
            mustache: 'libs/mustache',
            underscore: 'libs/underscore',
            validate: 'validate-data',
            manageApp: 'crowd-share-app',
            controller: 'controllers',
            ui: 'ui-controls',
            crypto: 'cryptojs-sha1'
        }
    });

    require(['jquery', 'sammy', 'controller'],
        function($, sammy, controller) {

            var app = sammy('#main-content', function() {

                this.get('#/', function() {
                    controller.loadPosts();
                });

                this.get('#/post', function() {
                    controller.addPost();
                });

                this.get('#/user', function() {
                    controller.register();
                });

                this.get('#/auth', function() {
                    controller.login();
                });

                this.get('#/logout', function() {
                    controller.logout();
                });
            });
            app.run("#/");

            // send button
            $('#send-comment').on('click', function() {
                //controller.postToChat();
            });

        });
})();