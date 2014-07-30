define(['jquery', 'ui', 'manageApp'], function($, UI, App) {

    function registerUser() {
        var registerControl = new UI.register();
        registerControl.build('#main-content')
            .done(function() {
                registerControl.attachRegisterClickHandler(function(data) {
                    App.register(data.username, data.password);
                }, true);
            });
    }

    function loginUser() {
        var loginControl = new UI.login();
        loginControl.build('#main-content')
            .done(function() {
                loginControl.attachLoginClickHandler(function(data) {
                    App.login(data.username, data.password);
                }, true);
            });
    }

    function logoutUser() {
        App.logout();
    }

    function loadPosts() {
        App.loadPosts();
    }

    function addPost() {
        var addPostControl = new UI.post();
        addPostControl.build('#main-content')
            .done(function() {
                addPostControl.attachPostClickHandler(function(data) {
                    App.addPost(data.title, data.body);
                }, true);
            });
    }


    return {
        register: registerUser,
        login: loginUser,
        logout: logoutUser,
        loadPosts: loadPosts,
        addPost: addPost
    };

});