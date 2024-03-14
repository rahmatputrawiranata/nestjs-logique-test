const isPrima = (num) => {
    if (num < 2) return false;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

console.log(isPrima(1))
console.log(isPrima(2))
console.log(isPrima(3))
console.log(isPrima(4))
console.log(isPrima(5))
console.log(isPrima(6))