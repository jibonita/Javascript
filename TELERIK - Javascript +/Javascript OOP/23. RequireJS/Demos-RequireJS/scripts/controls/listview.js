define(['libs/mustache'], function(mustache) {
    function getListView(data, templateId) {
        var templateString = document.getElementById(templateId).innerHTML,
            template = mustache.compile(templateString);
        var listview = '<ul>';
        for (var i = 0; i < data.length; i += 1) {
            listview += template(data[i]);
        }
        return listview;
    }

    return {
        getListView: getListView
    };
});