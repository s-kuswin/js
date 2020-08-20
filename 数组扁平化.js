let arr = [1,2,3,[2,3,[1,2,3,3],5]];
console.log(flatArr(arr))
function flatArr (arr) {
    let arrList = []
    for(const v of arr) {
        Array.isArray(v)?arrList.push(...flatArr(v)) : arrList.push(v)
    }
    return arrList
}

function flatArr2(arr) {
    return arr.reduce((prvious,current) => {
        return Array.isArray(current)?prvious.concat(flatArr2(current)):prvious.concat(current)
    })
}