let a = 3;
let b = 4;
[a, b] = ((a, b) => [b, a])(a, b);
const xx = ((a,b) => a*b);
console.log(xx(1,3));