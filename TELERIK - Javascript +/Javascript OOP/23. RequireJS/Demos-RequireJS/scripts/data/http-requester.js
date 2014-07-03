define(['jquery', 'rsvp'], function() {
    function getJSON(path) {
        var promise = new RSVP.Promise(
            function(resolve, reject) {
                $.ajax({
                    url: path,
                    success: function(data) {
                        resolve(data);
                    },
                    error: function(err) {
                        console.log(err);
                        reject(err);
                    }
                });
            });
        return promise;
    }

    return {
        getJSON: getJSON
    };
});