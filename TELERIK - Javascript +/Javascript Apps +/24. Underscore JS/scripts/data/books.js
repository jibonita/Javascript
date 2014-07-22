// I used this site to generate data: http://www.json-generator.com/
// Code generator:
// [
//     '{{repeat(50)}}', {
//         id: '{{index()}}',
//         book: '{{lorem(3, "words")}}',
//         author: function(tags) {
//           var authors = ['James Baldwin', 'Toni Cade Bambara', 'Leslie Esdaile Banks', 'Amiri Baraka ', 'Steven Barnes', 'Robert Beck', 'Carol S. Batey', 'Samuel Alfred Beadle', 'Paul Beatty', 'Christopher C. Bell', 'Derrick Bell'];
//             return authors[tags.integer(0, authors.length - 1)];
//         }
//     }
// ]

var books = [{
    "id": 0,
    "book": "ut minim adipisicing",
    "author": "Leslie Esdaile Banks"
}, {
    "id": 1,
    "book": "enim laborum ad",
    "author": "James Baldwin"
}, {
    "id": 2,
    "book": "qui sit aute",
    "author": "Christopher C. Bell"
}, {
    "id": 3,
    "book": "anim veniam adipisicing",
    "author": "Leslie Esdaile Banks"
}, {
    "id": 4,
    "book": "voluptate minim minim",
    "author": "Christopher C. Bell"
}, {
    "id": 5,
    "book": "id reprehenderit reprehenderit",
    "author": "Steven Barnes"
}, {
    "id": 6,
    "book": "ut sit voluptate",
    "author": "Amiri Baraka "
}, {
    "id": 7,
    "book": "labore laborum aliquip",
    "author": "Leslie Esdaile Banks"
}, {
    "id": 8,
    "book": "magna do sint",
    "author": "Carol S. Batey"
}, {
    "id": 9,
    "book": "qui nostrud aliqua",
    "author": "Steven Barnes"
}, {
    "id": 10,
    "book": "aute dolore ullamco",
    "author": "Toni Cade Bambara"
}, {
    "id": 11,
    "book": "non incididunt amet",
    "author": "Amiri Baraka "
}, {
    "id": 12,
    "book": "id do deserunt",
    "author": "Amiri Baraka "
}, {
    "id": 13,
    "book": "ea ea officia",
    "author": "Derrick Bell"
}, {
    "id": 14,
    "book": "excepteur esse voluptate",
    "author": "Steven Barnes"
}, {
    "id": 15,
    "book": "exercitation dolor nulla",
    "author": "Toni Cade Bambara"
}, {
    "id": 16,
    "book": "dolore proident do",
    "author": "Paul Beatty"
}, {
    "id": 17,
    "book": "occaecat irure eiusmod",
    "author": "James Baldwin"
}, {
    "id": 18,
    "book": "dolor cupidatat aliquip",
    "author": "Derrick Bell"
}, {
    "id": 19,
    "book": "veniam eiusmod non",
    "author": "Leslie Esdaile Banks"
}, {
    "id": 20,
    "book": "consequat laboris ullamco",
    "author": "Samuel Alfred Beadle"
}, {
    "id": 21,
    "book": "tempor voluptate aliquip",
    "author": "Carol S. Batey"
}, {
    "id": 22,
    "book": "ex ex ad",
    "author": "Christopher C. Bell"
}, {
    "id": 23,
    "book": "officia nulla veniam",
    "author": "Paul Beatty"
}, {
    "id": 24,
    "book": "amet labore consequat",
    "author": "James Baldwin"
}, {
    "id": 25,
    "book": "ut ad anim",
    "author": "Carol S. Batey"
}, {
    "id": 26,
    "book": "cupidatat cupidatat dolore",
    "author": "Amiri Baraka "
}, {
    "id": 27,
    "book": "incididunt enim consequat",
    "author": "Steven Barnes"
}, {
    "id": 28,
    "book": "sit deserunt veniam",
    "author": "Paul Beatty"
}, {
    "id": 29,
    "book": "Lorem culpa eiusmod",
    "author": "Paul Beatty"
}, {
    "id": 30,
    "book": "eiusmod voluptate occaecat",
    "author": "Samuel Alfred Beadle"
}, {
    "id": 31,
    "book": "ullamco ipsum consectetur",
    "author": "Christopher C. Bell"
}, {
    "id": 32,
    "book": "non deserunt commodo",
    "author": "Derrick Bell"
}, {
    "id": 33,
    "book": "consequat consectetur sunt",
    "author": "Derrick Bell"
}, {
    "id": 34,
    "book": "exercitation quis esse",
    "author": "Derrick Bell"
}, {
    "id": 35,
    "book": "consequat Lorem aute",
    "author": "Leslie Esdaile Banks"
}, {
    "id": 36,
    "book": "ipsum esse ex",
    "author": "Amiri Baraka "
}, {
    "id": 37,
    "book": "proident sunt dolor",
    "author": "Toni Cade Bambara"
}, {
    "id": 38,
    "book": "veniam nulla culpa",
    "author": "Derrick Bell"
}, {
    "id": 39,
    "book": "enim voluptate excepteur",
    "author": "Samuel Alfred Beadle"
}, {
    "id": 40,
    "book": "duis nostrud sint",
    "author": "Paul Beatty"
}, {
    "id": 41,
    "book": "in quis enim",
    "author": "Leslie Esdaile Banks"
}, {
    "id": 42,
    "book": "ex ut minim",
    "author": "Christopher C. Bell"
}, {
    "id": 43,
    "book": "eu anim aliquip",
    "author": "Carol S. Batey"
}, {
    "id": 44,
    "book": "laborum deserunt proident",
    "author": "James Baldwin"
}, {
    "id": 45,
    "book": "reprehenderit consectetur id",
    "author": "Robert Beck"
}, {
    "id": 46,
    "book": "do eiusmod commodo",
    "author": "Leslie Esdaile Banks"
}, {
    "id": 47,
    "book": "irure anim minim",
    "author": "Toni Cade Bambara"
}, {
    "id": 48,
    "book": "proident irure tempor",
    "author": "Christopher C. Bell"
}, {
    "id": 49,
    "book": "reprehenderit aliqua labore",
    "author": "James Baldwin"
}];


// this is used for Node.js
if (typeof require !== 'undefined') {
    module.exports = {
        books: books
    };
}