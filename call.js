Function.prototype.srwCall = function(context){
    context = context || window
    context.inFun = this
    let arg = [...arguments].slice(1)
    let results = context.inFun(...arg)
    Reflect.deleteProperty(context,'isFun')
    return resultssssss
}
