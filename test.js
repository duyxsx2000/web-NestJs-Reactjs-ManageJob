const vehinhvuong = (n) => {
    let data = ''
    for(let i = 1; i <= n; i++) {
        for(let j = 1; j<=n ; j++) {
            if(i === 1 || i === n || j === 1 || j === n) {
                data += '* ';
            }else data += '  ';
        };
        data += '\n'
    };
    console.log(data);
}
vehinhvuong(5)