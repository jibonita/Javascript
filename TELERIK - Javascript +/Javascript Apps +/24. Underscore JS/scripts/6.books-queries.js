(function() {

    //check if running on Node.js
    if (typeof require !== 'undefined') {
        //load underscore if on Node.js
        _ = require('./libs/underscore.js');

        // load data file
        var dataObject = require('./data/books.js');
        var books = dataObject.books;
    }


    // Task 6: 
    // find the most popular author 
    //(the author with the highest number of books)
    function getMostCommonFirstAndLastName(objects) {
        var result = _.chain(objects)
            // group them by author
            .groupBy(function(item) {
                return item.author;
            })
            // creating pairs of author and their books - not sure why it's not working without this method
            .pairs(function(item) {
                return item;
            })
            //create list of objects that contain author name and number of books
            .map(function(item) {
                return {
                    author: item[0],
                    books: item[1].length
                };
            })
            // find item with max number of books
            .max(function(item) {
                return item.books;
            })
            .value();

        return result.author;
    }


    //** task 6
    console.log(getMostCommonFirstAndLastName(books));

}());