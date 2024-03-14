function generatePattern(n) {
    for (let i = 1; i <= n; i++) {
        let line = '';
        for (let j = 0; j < n- 1; j++) {
            line += (i + j * n) + ' ';
        }
        console.log(line.trim());
    }
}

generatePattern(4);