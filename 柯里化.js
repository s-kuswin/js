// 闭包是函数柯里化的灵魂
// 支持多参数传递
function progressCurrying(fn, args) {
    console.log(args)
    var _this = this
    var len = fn.length;
    var args = args || [];
  
    return function() {
        var _args = Array.prototype.slice.call(arguments);
        Array.prototype.push.apply(args, _args);
  
        // 如果参数个数小于最初的fn.length，则递归调用，继续收集参数
        if (_args.length < len) {
            return progressCurrying.call(_this, fn, _args);
        }
        console.log(_args)
        // 参数收集完毕，则执行fn
        return fn.apply(this, _args);
    }
  }
  
  function f (x) {
    console.log(x)
  }
  progressCurrying(f,{1:1,2:2})
  
  function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.prototype.slice.call(arguments);
  
    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function() {
        console.log(arguments);
        _args.push(...arguments);
        return _adder;
    };
      console.log(_args);
      // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
        return _args.reduce(function (a, b) {
            return a + b;
        });
    }
      return _adder;
  }
  
  console.log(add(1)(2)(3)())                // 6
  console.log(add(1, 2, 3)(4) )            // 10
  console.log(add(1)(2)(3)(4)(5))          // 15
  console.log(add(2, 6)(1) )               // 9
  