function a(b) {
    N = b[0] | 0;
    n = 1,
    d = 1;

    for (k = 2; k <= N; k++) {
        n *= (N + k);
        d *= k;
    }
    return ((n / d) / 2);
}

console.log(a('7'))

function a(e) {
    N = e[0] | 0;
    n = 1, d = 1;
    for (k = 2; k <= N; k++) {
        n *= N + k;
        d *= k
    }
    return n / d / 2
}