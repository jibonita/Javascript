 window.onload = function() {
     var rows = [{
         unit: "Course Introduction",
         dates: ["Wed 18:00, 28-May 2014", "Thu 14:00, 29-May 2014"],
     }, {
         unit: "Document Object Model",
         dates: ["Wed 18:00, 28-May 2014", "Thu 14:00, 29-May 2014"],
     }, {
         unit: "HTML5 Canvas",
         dates: ["Thu 18:00, 29-May 2014", "Fri 14:00, 30-May 2014"],
     }, {
         unit: "Kinect JS Overview",
         dates: ["Thu 18:00, 29-May 2014", "Fri 14:00, 30-May 2014"],
     }, {
         unit: "SVG and RaphaelJS",
         dates: ["Wed 18:00, 04-Jun 2014", "Thu 14:00, 05-Jun 2014"],
     }, {
         unit: "Animations with Canvas and SVG",
         dates: ["Wed 18:00, 04-Jun 2014", "Thu 14:00, 05-Jun 2014"],
     }, {
         unit: "DOM operations",
         dates: ["Thu 18:00, 05-Jun 2014", "Fri 14:00, 06-Jun 2014"],
     }, {
         unit: "Event model",
         dates: ["Thu 18:00, 05-Jun 2014", "Fri 14:00, 06-Jun 2014"],
     }, {
         unit: "jQuery overview",
         dates: ["Wed 18:00, 11-Jun 2014", "Thu 14:00, 12-Jun 2014"],
     }, {
         unit: "HTML templates",
         dates: ["Wed 18:00, 11-Jun 2014", "Thu 14:00, 12-Jun 2014"],
     }, {
         unit: "Exam preparation",
        dates: ["Thu 18:00, 12-Jun 2014", "Fri 14:00, 13-Jun 2014"],
     }, {
         unit: "Exam",
         dates: ["Tue 10:00, 17-Jun 2014", "Tue 16:30, 17-Jun 2014"],
     }, {
         unit: "Teamwork Defense",
        dates: ["Thu 10:00, 19-Jun 2014", "Thu 10:00, 19-Jun 2014"],
     }];

     var tableRowsContainer = document.getElementById('table');

     var tableRowsTemplate = Handlebars.compile((document.getElementById('table-template')).innerHTML);

     // empty the container
     while (tableRowsContainer.firstChild) {
         tableRowsContainer.removeChild(tableRowsContainer.firstChild);
     }

     tableRowsContainer.innerHTML = tableRowsTemplate({
         rows: rows
     });
 };