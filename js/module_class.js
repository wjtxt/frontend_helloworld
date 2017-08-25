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

    function Promise(fn) {
        
         // 定义局部变量，作用域在此函数内部，当此函数递归执行时，会形成多个不用的作用域对象，这些对象间是相互隔离的；可看成函数对象的属性
        var state = 'pending',
            value = null,
            callbacks = [];

        var id = index++;

        // 为传入对象添加属性，注意传入对象与函数对象的区别
        this.index = id;
        this.name = 'promise';

        console.log('---------------- on Promise(),promise:' + id + ',this is ' + this);
        this.then = function (onFulfilled) {

            console.log('#### on then(),promise:' + id + ',this is ' + this);
            var curIndex = id;

            // 定义一个function，作用域链为：fn2-->then-->Promise，fn2属于当前this，不会随fn2的调用时机而变化，相当于调用fn2时的this已经确定
            console.log('then：create/define function obj fn2.');
            function fn2(resolve) {

                console.log('#### on bridge promise fn2(),promise:' + id + ',this is ' + this);

                // 执行调用者的handle方法
                console.log('fn2：prepare to call handle().');
                var callback = {
                    onFulfilled: onFulfilled || null, // 备注：onFufilled返回一个Promise对象
                    resolve: resolve
                };
                handle(callback);
            }

            console.log('then：prepare to create bridge promise.');
            var promise = new Promise(fn2);
            return promise;
        };

        function handle(callback) {

            console.log('#### on handle(),promise:' + id + ',this is ' + this);

            if (state === 'pending') {
                callbacks.push(callback);
                return;
            }

            //如果then中没有传递任何东西
            //if (!callback.onResolved) { // 备注：这句好像有问题，应该是"!callback.onFulfilled"
            if (!callback.onFulfilled) {
                console.log('handle：prepare to call resolve() directly,because callback.onFulfilled is null.');
                callback.resolve(value);
                return;
            }

            console.log('handle：prepare to call callback.onFulfilled().');
            var ret = callback.onFulfilled(value);	// 备注：这里可能返回的可能是一个新的promise

            // 这里注意callback.resolve与resolve的区别，前者函数执行时this指向callback对象，后者则指向全局对象（即window）
            // 
            console.log('handle：prepare to call resolve().');
            callback.resolve(ret);	                // 备注：这里是关键，触发新的promise业务逻辑函数执行
        }

        function resolve(newValue) {

            console.log('#### on resolve(),promise:' + id + ',this is ' + this + ',this name '+this.name);
            console.log('resolve：current callbacks count:' + callbacks.length);

            if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) { // 备注：可能是一个promise对象  

                console.log('resolve：value is an object:' + newValue);

                var then = newValue.then;
                if (typeof then === 'function') {

                    console.log('prepare to call then() ');
                    then.call(newValue, resolve);	// 备注：相当于将bridge的resolve，注册为新的promise对象的then回调
                    return;
                }
            }

            console.log('resolve：value is a basic type:' + newValue);

            state = 'fulfilled';
            value = newValue;
            setTimeout(function () {
                callbacks.forEach(function (callback) {
                    handle(callback);
                });
            }, 0);
        }

        console.log('Promise：prepare to call fn!promise:' + id);

        // 将当前作用域下的resolve函数作为参数传入，注意当前resolve函数作用域链，相对上一次定义时的变化
        fn(resolve);

        console.log('Promise：promise fn is finished!promise:' + id);
    }

    function testGetUserIdPromise() {
        return new Promise(function (resolve) {

            var val = 111;
            console.log('#### on testGetUserIdPromise promise fn!,this is ' + this);
            console.log('fn：prepare to call resolve(),value:' + val);

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
            console.log('fullfiled1：value is ' + val);
        }).then(function (val) {
            console.log('fullfiled2：value is ' + val);
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