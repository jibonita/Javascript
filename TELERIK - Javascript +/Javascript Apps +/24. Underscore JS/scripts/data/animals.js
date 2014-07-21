// I used this site to generate data: http://www.json-generator.com/
// Code generator:
// var animals = ['ant', 'bird', 'cat', 'chicken', 'cow', 'dog', 'elephant', 'fish', 'fox', 'horse', 'kangaroo', 'lion', 'monkey', 'penguin', 'pig', 'rabbit', 'sheep', 'tiger', 'whale', 'wolf'];
// [
//   '{{repeat(50)}}',
//   {
//     id: '{{index()}}',
//     legs: '{{random(2, 4, 6, 8, 100)}}',
//     specie: function (tags) {
//       return animals[tags.integer(0, animals.length - 1)];
//     }
//   }
// ]
//** PLEASE NOTE THAT ANIMAL SPECIE AND NUMBER OF LEGS ARE NOT CONSISTENT IN THIS JSON OBJECT!!!!!!!

var animals = [{
    "id": 0,
    "legs": 100,
    "specie": "cow"
}, {
    "id": 1,
    "legs": 2,
    "specie": "elephant"
}, {
    "id": 2,
    "legs": 4,
    "specie": "kangaroo"
}, {
    "id": 3,
    "legs": 4,
    "specie": "bird"
}, {
    "id": 4,
    "legs": 8,
    "specie": "cow"
}, {
    "id": 5,
    "legs": 4,
    "specie": "elephant"
}, {
    "id": 6,
    "legs": 2,
    "specie": "fox"
}, {
    "id": 7,
    "legs": 4,
    "specie": "sheep"
}, {
    "id": 8,
    "legs": 6,
    "specie": "wolf"
}, {
    "id": 9,
    "legs": 4,
    "specie": "fish"
}, {
    "id": 10,
    "legs": 100,
    "specie": "rabbit"
}, {
    "id": 11,
    "legs": 6,
    "specie": "tiger"
}, {
    "id": 12,
    "legs": 2,
    "specie": "horse"
}];