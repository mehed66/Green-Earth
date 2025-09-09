



const numbers = [1, 2, 3, 4];

numbers.forEach(nam =>{
     console.log(nam)
})

const duble = numbers.map(num => num*2)
console.log(duble)
duble.forEach(dul =>
     console.log(dul)
)
const even = numbers.filter(num => num % 2  === 0)
console.log(even)