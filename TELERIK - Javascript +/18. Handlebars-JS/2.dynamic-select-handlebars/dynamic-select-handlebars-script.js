 window.onload = function() {
     var items = [{
         value: 1,
         text: "Course Introduction",
     }, {
         value: 2,
         text: "Document Object Model",
     }, {
         value: 3,
         text: "HTML5 Canvas",
     }, {
         value: 4,
         text: "Kinect JS Overview",
     }, {
         value: 5,
         text: "SVG and RaphaelJS",
     }, {
         value: 6,
         text: "Animations with Canvas and SVG",
     }, {
         value: 7,
         text: "DOM operations",
     }, {
         value: 8,
         text: "Event model",
     }, {
         value: 9,
         text: "jQuery overview",
     }, {
         value: 10,
         text: "HTML templates",
     }, {
         value: 11,
         text: "Exam preparation",
     }, {
         value: 12,
         text: "Exam",
     }, {
         value: 13,
         text: "Teamwork Defense",
     }];

     var optionsContainer = document.getElementById('the-select');

     var selectTemplate = Handlebars.compile((document.getElementById('select-template')).innerHTML);

     // empty the container
     while (optionsContainer.firstChild) {
         optionsContainer.removeChild(optionsContainer.firstChild);
     }

     optionsContainer.innerHTML = selectTemplate({
         options: items
     });
 };