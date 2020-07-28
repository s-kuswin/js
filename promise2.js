class MyPromise{
    constructor(executor) {
        this._resolveQueue = [] //then收集的执行成功的回调队列
        this._rejectQueue = [] //then收集的执行失败的队列

        let _resolve = (val) => {
            console.log(val,this._resolveQueue.length);
            while(this._resolveQueue.length){
                const callback = this._resolveQueue.shift()
                console.log(callback)
                callback(val)
            }
        }

        let _reject = (val) => {
            while(this._rejectQueue.length) {
                const callback = this._rejectQueue.shift()
                callback()
            }
        }
        executor(_resolve,_reject)
    }
    then(resolveFn,rejectFn) {
        console.log(resolveFn);   
        this._resolveQueue.push(resolveFn)
        this._rejectQueue.push(rejectFn)
    }
}

function t () {
    new MyPromise(
        function (resolve, reject) {
          // 一段耗时的异步操作
          resolve('成功') // 数据处理完成
          // reject('失败') // 数据处理出错
        }
      ).then(res => console.log(res))
    }
    t()