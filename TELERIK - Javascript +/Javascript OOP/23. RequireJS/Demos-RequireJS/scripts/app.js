(function() {
    require.config({
        paths: {
            'jquery': 'libs/jquery-2.1.1.min',
            'mustache': 'libs/mustache',
            'rsvp': 'libs/rsvp.min'
        }
    });

    require(['controls/listview',
            'data/http-requester'
        ],
        function(controls, httpRequest) {
            httpRequest.getJSON('scripts/data/people.js')
                .then(function(data) {
                    var listView = controls.getListView(data, 'person-item-template');
                    document.body.innerHTML += listView;
                });
        });
})();