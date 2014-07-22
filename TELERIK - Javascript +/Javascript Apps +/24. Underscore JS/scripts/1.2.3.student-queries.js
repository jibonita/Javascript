(function() {

    //check if running on Node.js
    if (typeof require !== 'undefined') {
        //load underscore if on Node.js
        _ = require('./libs/underscore.js');

        // load data file
        var dataObject = require('./data/students.js');
        var students = dataObject.students;
    }


    // Task 1: 
    // from a given array of students 
    // finds all students whose first name is before its last 
    // name alphabetically. Print the students in 
    // descending order by full name.
    function getStudentsByFisrtNamebeforeLastNameDesc(objects) {
        return _.chain(objects)
            .filter(function(st) {
                return st.firstname < st.lastname;
            })
            .map(function(st) {
                return st.firstname + ' ' + st.lastname;
            })
            .sortBy(function(st) {
                return st;
            })
            .reverse()
            .value();
    }

    // Task 2:
    //  function that finds the first name and last 
    // name of all students with age between 18 and 24
    function getStudentsInAgeRange(objects, min, max) {
        // min and max values are included in the search
        return _.chain(objects)
            .filter(function(st) {
                return min <= st.age && st.age <= max;
            })
            .map(function(st) {
                //USE the commented return below to get a tring with the age and the name for each student
                //return 'age:' + st.age + ' // ' + st.firstname + ' ' + st.lastname;

                // since the task requeires only name, I commented the 'age' line
                return {
                    //age: st.age,
                    firstname: st.firstname,
                    lastname: st.lastname
                };
            })
            .value();
    }

    // Task 3:
    //  function that by a given array of students 
    // finds the student with highest marks
    function getStudentWithHighestMarks(objects) {
        // min and max values are included in the search
        return _.chain(objects)
            .max(function(st) {
                // user the 'reduce' method to sum all the elements of the 'mark' array of each student
                var sumOfMarks = _.reduce(st.marks, function(memo, num) {
                    return memo + num;
                }, 0);
                return sumOfMarks;
            })
            .value();
    }

    //** task 1
    console.log(getStudentsByFisrtNamebeforeLastNameDesc(students));
    //** task 2
    console.log(getStudentsInAgeRange(students, 18, 24));
    //** task 3
    console.log(getStudentWithHighestMarks(students));
}());