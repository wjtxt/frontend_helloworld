define([], function () {


    //---------------------------------------
    //  方式一
    //---------------------------------------
    // 类的构造函数
    function UserInfo(n, a) {
        this.name = n;
        this.age = a;

        this.getAge = function () {
            return this.age;
        }

        this.getName = function () {
            return this.name;
        }
    }
    // 通过实例对象访问类的静态方法
    UserInfo.prototype.getClassName = function () {
        return "UserInfo";
    }
    // 通过类名访问类的静态方法
    UserInfo.getClassName = function () {
        return "UserInfo";
    }

    //---------------------------------------
    //  方式二
    //---------------------------------------
    // 父类
    var Animal = {
        createNew: function () {
            var obj = {};
            obj.color = 'red';
            obj.size = 18;
            obj.getColor = function () {
                return obj.color;
            }
            obj.getSize = function () {
                return obj.size;
            }
            return obj;
        }
    }

    // 子类
    var Cat = {
        createNew: function () {
            var obj = Animal.createNew();
            obj.catType = '加菲猫';
            obj.getCatType = function () {
                return obj.catType;
            }
            return obj;
        }
    }

    function testFunc() {
        alert('testFunc:hello world!');
    }

    function testFuncEx(a, b) {
        alert('testFuncEx:' + a + ',' + b);
    }

    //---------------------------------------
    //  Promise规范实现
    //---------------------------------------
    var index = 1;

    function fn1(resolve) {
        console.log('create bridge promise:' + id);

        // 执行调用者的handle方法
        handle({
            onFulfilled: onFulfilled || null, // 备注：onFufilled返回一个Promise对象
            resolve: resolve
        });
    }

    function Promise(fn) {
        var state = 'pending',
            value = null,
            callbacks = [];
        
        id = index++;
        this.index = id;
        this.name = 'promise';
        

        console.log('----------------on Promise(),id:' + id);

        this.then = function (onFulfilled) {

            console.log('on then,promise:' + id);
            var curIndex = id;

            // 定义一个function，作用域链为：fn2-->then-->Promise，fn2属于当前this，不会随fn2的调用时机而变化，相当于调用fn2时的this已经确定
            function fn2(resolve) {
                
                console.log('this is '+ this);
                console.log('this name is '+this.name);
                console.log('create bridge promise:' + id);

                // 执行调用者的handle方法
                handle({
                    onFulfilled: onFulfilled || null, // 备注：onFufilled返回一个Promise对象
                    resolve: resolve
                });
            }

            var promise = new Promise(fn2);

            return promise;
        };

        function handle(callback) {

            console.log('on handle,promise:' + id);

            if (state === 'pending') {
                callbacks.push(callback);
                return;
            }

            //如果then中没有传递任何东西
            //if (!callback.onResolved) { // 备注：这句好像有问题，应该是"!callback.onFulfilled"
            if (!callback.onFulfilled) { // 备注：这句好像有问题，应该是"!callback.onFulfilled"

                console.log('callback.onFulfilled is null!');

                callback.resolve(value);
                return;
            }

            console.log('callback.onFulfilled is not null!');

            var ret = callback.onFulfilled(value);	// 备注：这里可能返回的可能是一个新的promise
            callback.resolve(ret);	                // 备注：这里是关键，触发新的promise业务逻辑函数执行
        }

        function resolve(newValue) {

            console.log('on resolve,promise:' + id);
            console.log('current callbacks count:' + callbacks.length);

            if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) { // 备注：可能是一个promise对象  

                console.log('value is a object:' + newValue);

                var then = newValue.then;
                if (typeof then === 'function') {
                    then.call(newValue, resolve);	// 备注：调用then方法，其实是注册响应函数
                    return;
                }
            }

            console.log('value is a basic type:' + newValue);

            state = 'fulfilled';
            value = newValue;
            setTimeout(function () {

                callbacks.forEach(function (callback) {
                    handle(callback);
                });
            }, 0);
        }

        console.log('promise fn be run!promise:' + id);
        console.log('fn:'+fn);
        console.log('this is '+ this);
        fn(resolve);
        console.log('promise fn is finished!promise:' + id);
    }

    function testGetUserIdPromise() {
        var id = 111;
        return new Promise(function (resolve) {

            console.log('promise is running!id:' + id);
            var val = 111;
            console.log('resolve promise result!value:' + val);
            resolve(val);
        });
    }

    function testPromise() {
        // testGetUserIdPromise().then(function (id) {
        //     console.log('on fullfiled-1:' + id);
        //     return new Promise(function (resolve) {
        //         console.log('on promise fn!id:'+id);
        //         resolve(222);
        //     })
        // }).then(function (val) {
        //    console.log('on fullfiled-2:' + val);
        // });

        testGetUserIdPromise().then(function (val) {
            //alert('on then-1:' + val);
            console.log('on fullfiled-1:' + val);
        }).then(function (val) {
            //alert('on then-2:' + val);
            console.log('on fullfiled-2:' + val);
        })
    }

    //---------------------------------------
    //  测试代码
    //---------------------------------------
    return {
        test: function () {
            // var obj = new UserInfo('zhangsan', 16);
            // console.log('name:' + obj.getName());
            // console.log('age:' + obj.getAge());
            // console.log('class:' + obj.getClassName());

            // var cat = Cat.createNew();
            // console.log(cat.getColor());
            // console.log(cat.getSize());
            // console.log(cat.getCatType());

            // testFuncEx(1, 2);
            // testFuncEx();

            // testFunc();
            // testFunc(1, 2);

            testPromise();
        }
    }
});