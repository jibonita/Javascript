function solve(args) {
    function getNumberBase(number) {
        return number | 1 - 1;
    }

    var s = args[0] | 0,
        c1 = args[1] | 0,
        c2 = args[2] | 0,
        c3 = args[3] | 0;

    var amountAcumulated = 0;
    // var maxC1 = getNumberBase(s/c1),
    //     maxC2 = getNumberBase(s/c2),
    //     maxC3 = getNumberBase(s/c3);
    var maxC1 = getNumberBase(s / c1),
        maxC2, maxC3;

    for (var iC1 = 0; iC1 <= maxC1; iC1++) {
        var amountC1s = c1 * iC1;
        maxC2 = getNumberBase((s - amountC1s) / c2);

        for (var iC2 = 0; iC2 <= maxC2; iC2++) {
            var amountC2s = c2 * iC2;
            maxC3 = getNumberBase((s - amountC1s - amountC2s) / c3);

            for (var iC3 = 0; iC3 <= maxC3; iC3++) {
                var amountC3s = c3 * iC3;
                if (amountC1s + amountC2s + amountC3s > amountAcumulated) {
                    amountAcumulated = amountC1s + amountC2s + amountC3s;
                }
            }

        }
    }

    return amountAcumulated;
}

var input = ['110', '13', '15', '17'];
input = ['20', '11', '200', '300'];
input = ['110', '19', '29', '39'];
console.log(solve(input));