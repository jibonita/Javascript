define(['jquery', 'mustache'], function($, mustache) {
    var DATA_LINK = 'http://crowd-chat.herokuapp.com/posts',
        RESULTS_PER_VIEW = 40,
        CHAT_BOX_ID = '#chat-box',
        CHAT_USERNAME_VAR = 'chat-name',
        COMMENT_BLOCK_ID = '#comment-block';

    var templateString = $("#chat-post-template").html();

    function loadPostsContent() {
        var resultsCount, templatedPost, $postsList;

        $.getJSON(DATA_LINK, {})
            .done(function(data) {

                resultsCount = data.length;

                $postsList = $("<ul />").addClass("posts-list");
                mustache.parse(templateString);

                for (var i = resultsCount - RESULTS_PER_VIEW; i < resultsCount; i++) {
                    templatedPost = mustache.render(templateString, data[i]);
                    $postsList.append(templatedPost);
                }

                $(CHAT_BOX_ID).html($postsList);

                // scroll content to the bottom
                scrollContent(CHAT_BOX_ID);

                // display comments block if logged
                if (localStorage.getItem(CHAT_USERNAME_VAR)) {
                    $(COMMENT_BLOCK_ID).show();
                }

            })
            .fail(function(err) {
                console.log('failed to load chat data');
            });
    }

    function postContent() {
        var comment, username;

        comment = $('#user-comment').val().escapeHTML();

        if (comment.length > 0) {
            // check if there is username
            username = localStorage.getItem(CHAT_USERNAME_VAR);
            if (username) {
                var postToSend = {
                    "user": username,
                    "text": comment
                };

                $.post(DATA_LINK, postToSend)
                    .done(function(data) {
                        $('#user-comment').val('');
                        loadPostsContent();
                    })
                    .fail(function(err) {
                        console.log('unable to save your post');
                    });
            } else {
                chatLogin();
            }

        } else {
            alert('Please enter message first!');
        }
    }

    function chatLogin() {
        // console.log('clicked');
        var username = localStorage.getItem(CHAT_USERNAME_VAR);
        if (username) {
            alert('You are already logged in as: ' + username);
        } else {
            username = prompt("nickname?");
            if (username.length > 0) {
                localStorage.setItem('chat-name', username);
                $(COMMENT_BLOCK_ID).show();
            }
        }
    }

    function chatLogout() {
        localStorage.removeItem(CHAT_USERNAME_VAR);
        $(COMMENT_BLOCK_ID).hide();
    }

    function scrollContent(id) {
        var obj = $(id);
        if (obj.length) {
            // to put cursor at the end
            obj.focus().val(obj.val());
            // to scroll the textarea
            obj.scrollTop(obj.prop("scrollHeight"));
        }
    }

    // I know the place of this function is not here :(
    String.prototype.escapeHTML = function() {
        var __entityMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        };
        return String(this).replace(/[&<>"'\/]/g, function(s) {
            return __entityMap[s];
        });
    };

    return {
        loadChat: loadPostsContent,
        postToChat: postContent,
        login: chatLogin,
        logout: chatLogout
    };
});