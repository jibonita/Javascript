define(['jquery', 'validate'], function($, Validator) {

    var Register = (function() {

        var Register = function() {};

        Register.prototype = {
            build: function(selector) {
                var self = this;
                self.rootElement = $(selector);

                return $.get("partials/register.html")
                    .then(function(data) {
                        self.rootElement.html(data);
                    });

            },

            getUsernameText: function() {
                return $("#register-username-input").val();
            },

            getPasswordText: function() {
                return $("#register-password-input").val();
            },

            attachRegisterClickHandler: function(handler, removePreviousHandlers) {
                var self = this;

                if (removePreviousHandlers) {
                    $(this.rootElement).off("click");
                }

                $(this.rootElement).on("click", "#register-button", function() {
                    var registerData = {
                        username: self.getUsernameText(),
                        password: self.getPasswordText()
                    };

                    if (Validator.validateStringData(registerData.username) && Validator.validateStringData(registerData.password)) {
                        handler(registerData);

                        // hide reg form
                        self.rootElement.html('');
                    } else {
                        alert(Validator.errorMessage());
                    }

                });
            }
        };

        return Register;
    })();

    var Login = (function() {
        var Login = function() {};

        Login.prototype = {
            build: function(selector) {
                var self = this;
                self.rootElement = $(selector);

                return $.get("partials/login.html")
                    .then(function(data) {
                        self.rootElement.html(data);
                    });

            },

            getUsernameText: function() {
                return $("#login-username-input").val();
            },

            getPasswordText: function() {
                return $("#login-password-input").val();
            },

            attachLoginClickHandler: function(handler, removePreviousHandlers) {

                var self = this;

                if (removePreviousHandlers) {
                    $(this.rootElement).off("click");
                }

                this.rootElement.on("click", "#login-button", function() {
                    var loginData = {
                        username: self.getUsernameText(),
                        password: self.getPasswordText()
                    };

                    handler(loginData);
                });
            },

            reportError: function(errorMessage) {
                this.rootElement.append("<p class='error-message' style='color:red'>" + errorMessage + "</p>");
            }
        };

        return Login;
    })();

    var Post = (function() {
        var Post = function() {};

        Post.prototype = {
            build: function(selector) {
                var self = this;
                self.rootElement = $(selector);

                return $.get("partials/add-post.html")
                    .then(function(data) {
                        self.rootElement.html(data);
                    });

            },

            getPostTitle: function() {
                return $("#post-title").val();
            },

            getPostBody: function() {
                return $("#post-body").val();
            },

            attachPostClickHandler: function(handler, removePreviousHandlers) {

                var self = this;

                if (removePreviousHandlers) {
                    $(this.rootElement).off("click");
                }

                this.rootElement.on("click", "#post-add-button", function() {
                    var postData = {
                        title: self.getPostTitle(),
                        body: self.getPostBody()
                    };

                    if (Validator.isNotEmptyData(postData.title) && Validator.isNotEmptyData(postData.body)) {
                        handler(postData);
                    } else {
                        alert(Validator.errorMessage());
                    }
                });
            }
        };

        return Post;
    })();

    return {
        register: Register,
        login: Login,
        post: Post
    };
});