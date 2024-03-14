const checkTheBiggestNumber = (a) => {
    let max = a[0];
    for (let i = 1; i < a.length; i++) {
        if (a[i] > max) max = a[i];
    }
    return max;
}
console.log(checkTheBiggestNumber([11,
    6, 31, 201, 99, 861, 1, 7, 14, 79]))