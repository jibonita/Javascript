(function() {
    require.config({
        paths: {
            jquery: 'libs/jquery-2.1.1.min',
            sammy: 'libs/sammy-latest.min',
            mustache: 'libs/mustache',
            chatApp: 'chat-application'
        }
    });

    require(['jquery', 'sammy', 'mustache', 'chatApp'],
        function($, sammy, mustache, chatApp) {

            var DATA_LINK = 'http://crowd-chat.herokuapp.com/posts';
            var chat = chatApp;

            var app = sammy('#main-content', function() {

                this.get('#/', function() {
                    chat.loadChat();
                });

                this.get('#/login', function() {
                    chat.login();
                });

                this.get('#/logout', function() {
                    chat.logout();
                });

            });
            app.run("#/");

            // send button
            $('#send-comment').on('click', function() {
                chat.postToChat();
            });

            // refresh the chat to get latest posts
            setInterval(function() {
                chat.loadChat();
            }, 700);

        });
})();