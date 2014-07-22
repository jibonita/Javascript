(function() {

    //check if running on Node.js
    if (typeof require !== 'undefined') {
        //load underscore if on Node.js
        _ = require('./libs/underscore.js');

        // load data file
        var dataObject = require('./data/animals.js');
        var animals = dataObject.animals;
    }


    // Task 4: 
    //  function that by a given array of animals, 
    // groups them by species and sorts them by number of 
    // legs
    function getSpeciesGroups(objects) {
        return _.chain(objects)
            .sortBy(function(item) {
                return -item.legs;
                //in case we want descending order by legs number:
                // return -item.legs
            })
            .groupBy(function(item) {
                return item.specie;
            })
            .value();
    }

    // Task 5:
    //find the total number of legs
    function getTotalNumbeOfLegs(objects) {
        return _.chain(objects)
            .map(function(item) {
                return item.legs;
            })
            // 'map' will return a list of all the legs and we will use 'reduce' to calculate their sum
            .reduce(function(memo, num) {
                return memo + num;
            }, 0)
            .value();
    }



    //** task 4
    console.log(getSpeciesGroups(animals));
    //** task 5
    console.log(getTotalNumbeOfLegs(animals));

}());