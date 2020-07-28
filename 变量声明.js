// let a 
// console.log(a)

// console.log('script start')//1
// async function async1() {
//     await async2()
//     console.log('async1 end')//5
// }
// async function async2() {console.log('async2 end')}//2
// async1()
// setTimeout(function () {console.log('setTimeout')}, 0)//8
// new Promise(resolve => {
//     console.log('Promise')//3
//     resolve()
// }).then(function () {
//         console.log('promise1')//6
//     }).then(function () {
//         console.log('promise2')//7
//     })
// console.log('script end')//4

function lazyMan(name) {
    this.task = [];
    this.task.push(() => {
        return new Promise(res => {
            console.log('name:' + name);res()
        })
    })
    let run = () => {
        let sequence = Promise.resolve()
        for (const func of this.task) {
            sequence = sequence.then(()=>func())
        }
    }
    setTimeout(() => {run()}, 0)
    this.eat = (str) => {
        this.task.push(() => {
            return new (res => {
                console.log('eat:' + str);res()
            })
        })
        return this;
    }
    this.sleep = (time) => {
        this.task.push(() => {
            return new Promise(res => {
                setTimeout(() => {
                    console.log(`Wake up after ` + time);res()
                }, time)
            })
        })
        return this;
    }
    this.sleepFirst = (time) => {
        this.task.unshift(() => {
            return new Promise(res => {
                setTimeout(() => {
                    console.log(`sleepFirst up after ` + time);res()
                }, time)
            })
        })
        return this;
    }
    return this;
}
lazyMan('xxx').sleep(1000).eat('333').sleepFirst(2000)