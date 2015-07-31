define([], function() {

    //** apply transform. Some of the elements will have 'double' transform and we don't want the second transorm to override the first
    //** this functions works ONLY FOR ONE level of subordination
    function applyTransform(x, y, st) {
        var emx;
        st.forEach(
            function(element, index) {
                if (element.length) {
                    element.forEach(function(e, i) {
                        emx = e.matrix.split();
                        e.transform('t' + (x + emx.dx) + ',' + (y + emx.dy));
                    });
                } else {
                    emx = element.matrix.split();
                  //  alert('r' + emx.rotate + 's' + emx.scalex + ',' + emx.scaley);
                    element.transform('t' + (x + emx.dx) + ',' + (y + emx.dy) + 
                        'r' + emx.rotate + 's' + emx.scalex + ',' + emx.scaley);
                }
            }
        );
    }

    return {
        applyTransform: applyTransform
    };
});