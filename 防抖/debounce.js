const { call } = require("file-loader");

var count = 1;
var container = document.getElementById('container');
function getUserAction(e) {
    console.log(this,e);      
    container.innerHTML = count++;
};

// container.onmousemove = getUserAction
container.onmousemove = debounce5(getUserAction,1000)

//第一版
function debounce(func,wait) {
    var timeout;
    return function () {
        clearTimeout(timeout) 
        timeout = setTimeout(func,wait)
    }
}

//第二版
function debounce2(func,wait) {
    var timeout;
    return function () {
        var context = this;
        clearTimeout(timeout)
        timeout = setTimeout(function() {
            func.apply(context)
        },wait)
    }
}
//第三版

function debounce3(func,wait) {
    var timeout;
    return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timeout)

        timeout = setTimeout(function() {
            func.apply(context,args)
        },wait)

    }
}

//第四版
function debounce4(func,wait) {
    var timeout, result;
    return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timeout)
        timeout = setTimeout(function() {
            result = func.apply(context, args)
        },wait);
        return result;
    }
}

//第五版
function debounce5(func,wait,immediate) {
    var timeout, result;

    return function() {
        var context = this;
        var args = arguments;

        if(timeout) clearTimeout(timeout);
        if(immediate) {
            var callNow = !timeout;
            timeout = setTimeout(function() {
                timeout = null
            },wait)
            if(callNow) result = func.apply(context,args)

        } else {
            timeout = setTimeout(function() {
                result =  func.apply(context,args)
            },wait)
        }
        return result
    }
}

//第六版
function debounce6(func,wait,immediate) {
    var timeout, result;
    var debounced = function() {
        var context = this;
        var args = arguments;
       if(timeout) clearTimeout(timeout);
       if(immediate) {
           var callNow = !timeout;
           timeout = setTimeout(function() {
               timeout = null;
           },wait)
           if(callNow) result = func.apply(context, args)
       } 
       else {
           timeout = setTimeout(function() {
               result = func.apply(context,args)
           },wait)
       }
       return result
    }

    debounced.cancel = function() {
        clearTimeout(timeout)
        timeout = null
    };
    return debounced
}