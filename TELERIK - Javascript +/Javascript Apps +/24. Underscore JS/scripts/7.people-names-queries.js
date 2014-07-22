(function() {

    //check if running on Node.js
    if (typeof require !== 'undefined') {
        //load underscore if on Node.js
        _ = require('./libs/underscore.js');

        // load data file
        var dataObject = require('./data/people.js');
        var people = dataObject.people;
    }


    // Task 7: 
    // find the most common first and last name
    function getMostCommonByKey(objects, key) {
        return _.chain(objects)
            // group them by the passed key
            .groupBy(function(item) {
                return item[key];
            })
            // creating pairs of key and all items that have it - not sure why it's not working without this method
            .pairs(function(item) {
                return item;
            })
            //create list of objects that contain key name and number of occurencies
            .map(function(item) {
                return {
                    name: item[0],
                    count: item[1].length
                };
            })
            // find item 'key' with max number of occurencies
            .max(function(item) {
                return item.count;
            })
            .value();
    }

    function getMostCommonFirstName(objects) {
        return getMostCommonByKey(objects, 'firstname').name;
    }

    function getMostCommonLastName(objects) {
        return getMostCommonByKey(objects, 'lastname').name;
    }

    //** task 7
    console.log('first name: ' + getMostCommonFirstName(people));
    console.log('last name: ' + getMostCommonLastName(people));

}());