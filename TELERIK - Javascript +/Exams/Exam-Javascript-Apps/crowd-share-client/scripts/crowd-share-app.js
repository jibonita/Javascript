define(['jquery', 'mustache', 'crypto'], function($, mustache, crypto) {

    var DATA_LINK = 'http://localhost:3000/',
        POST_USERNAME_VAR = 'username',
        POST_SESSIONKEY_VAR = 'sessionKey',
        POSTS_BOX_ID = '#posts-box';

    function loadPostsContent() {
        var resourceLink = DATA_LINK + 'post';

        $.getJSON(resourceLink, {})
            .done(function(data) {

                var templateString, postsData, templatedPost;
                postsData = data;

                $postsList = $("<ul />").addClass("posts-list");

                $.get("partials/post-template.html")
                    .then(function(data) {

                        templateString = $(data).html();
                        mustache.parse(templateString);

                        for (var i = 0; i < postsData.length; i++) {
                            templatedPost = mustache.render(templateString, postsData[i]);
                            $postsList.append(templatedPost);
                        }

                        $(POSTS_BOX_ID).html($postsList);

                    });

                // $postsList = $("<ul />").addClass("posts-list");
                // mustache.parse(templateString);

                // for (var i = resultsCount - RESULTS_PER_VIEW; i < resultsCount; i++) {
                //     templatedPost = mustache.render(templateString, data[i]);
                //     $postsList.append(templatedPost);
                // }

                // $(CHAT_BOX_ID).html($postsList);

                // // scroll content to the bottom
                // scrollContent(CHAT_BOX_ID);

                // // display comments block if logged
                // if (localStorage.getItem(CHAT_USERNAME_VAR)) {
                //     $(COMMENT_BLOCK_ID).show();
                // }

            })
            .fail(function(err) {
                console.log('failed to load posts data');
            });
    }

    function saveNewPost(title, body) {
        var resourceLink = DATA_LINK + 'post';
        var postToSend = {
            title: title,
            body: body
        };

        $.ajax({
            url: resourceLink,
            type: 'POST',
            headers: {
                "X-SessionKey": localStorage.getItem(POST_SESSIONKEY_VAR)
            },
            data: postToSend
        })
            .done(function(data) {
                console.log('POst added');
            })
            .fail(function(err) {
                console.log(JSON.parse(err.responseText).message);
            });
    }

    function registerUser(username, password) {
        var resourceLink = DATA_LINK + 'user';
        var dataToSend = {
            username: username,
            authCode: crypto.CryptoJS.SHA1(username + password).toString()
        };

        $.post(resourceLink, dataToSend)
            .done(function(data) {
                userLogin(username, password);
            })
            .fail(function(err) {
                console.log(JSON.parse(err.responseText).message);
            });
    }

    function userLogin(username, password) {
        var resourceLink = DATA_LINK + 'auth';
        var dataToSend = {
            username: username,
            authCode: crypto.CryptoJS.SHA1(username + password).toString()
        };

        $.post(resourceLink, dataToSend)
            .done(function(data) {
                localStorage.setItem(POST_USERNAME_VAR, data.username);
                localStorage.setItem(POST_SESSIONKEY_VAR, data.sessionKey);
                console.log('Logged in: ' + data.sessionKey);
            })
            .fail(function(err) {
                console.log(JSON.parse(err.responseText).message);
            });
    }

    function userLogout() {
        var resourceLink = DATA_LINK + 'user';
        $.ajax({
            url: resourceLink,
            type: 'PUT',
            headers: {
                "X-SessionKey": localStorage.getItem(POST_SESSIONKEY_VAR)
            }
        })
            .done(function(data) {
                console.log('Logged out');
                localStorage.removeItem(POST_USERNAME_VAR);
                localStorage.removeItem(POST_SESSIONKEY_VAR);
            })
            .fail(function(err) {
                console.log(JSON.parse(err.responseText).message);
            });


        //$(COMMENT_BLOCK_ID).hide();
    }

    return {
        loadPosts: loadPostsContent,
        addPost: saveNewPost,
        register: registerUser,
        login: userLogin,
        logout: userLogout
    };
});