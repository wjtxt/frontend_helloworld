
// 最简单的函数
function add() {
    return "abc";
}

//定义一个加法，传入参数类型可以不填，传出参数可以任意（void、int、string等）
function add(a, b) {
    return a + b;
}

// 定义一个constructor（函数的一种，模拟class的实现）
function UserInfo(n,a) {
    name = n;
    age = a;
};

UserInfo.prototype.setName = function(name){
    this.name = name;
}
UserInfo.prototype.getName = function(){
    //return this.name;
    return name;
}
UserInfo.prototype.getClassName = function(){
    return "UserInfo";
}

// 测试函数
function testFunc() {
    var sum = add(1, 2);
    console.log(sum);

    // 测试“new A”和“new A()”的区别
    var obj1 = new UserInfo;
    UserInfo.prototype.getClassName = function(){
        return "UserInfo_new"
    }
    console.log(obj1.getClassName());

    var obj = new UserInfo("WJ",10);
    obj.sex = "male";
    console.log(obj.name);
    console.log(obj.sex);
    console.log(obj.getName());
    //console.log(UserInfo.getName()); // function object can not access method and attr of prototype object
    console.log(UserInfo.prototype.getName());
    console.log(obj.__proto__.getName());

    // 研究原型链
    function f() { }
    f.prototype.foo = "abc";
    f.__proto__.age = 18;
    var obj = new f();
    obj.sex = "male";
    console.log(obj.foo); //abc
}

// 定义1个匿名方法，并将函数指针赋值给变量onClickMeVar，var代表任意类型的变量（对象、实例），可以用任意类型（基本类型、复合类型、函数等）复制
var onClickMeVar = function () {
    alert("hello world on test!");

    return function () {
        alert("111-222");
    }
};

// 定义1个名为clickmeFunc的函数
function onClickMe() {
    alert("hello world on testFunc!");

    //动态在document尾部添加一个按钮
    var btn = document.createElement("BUTTON");
    var text = document.createTextNode("hello world!");
    btn.appendChild(text);
    document.body.appendChild(btn);

    return function () {
        alert("111-222-333");
    }
}

// 定义绑定控件事件的函数
function onloadFinished() {

    testFunc();

    document.getElementById("btn_clickme").onclick = onClickMe;

    document.getElementById("btn_clickme").onmouseover = function () {
        // alert("onmouseover!");
        document.getElementById("btn_clickme").setAttribute("value", "ok");
    };

    document.getElementById("btn_clickme").onmouseout = function () {
        document.getElementById("btn_clickme").setAttribute("value", "点我");
    };
};

// 绑定消息响应函数，右侧写函数名（代表函数指针）
/*document.getElementById("btn_clickme").onclick=testFunc();
document.getElementById("btn_clickme").onclick=testFunc;*/

//----------------------------------------
//  原生
//----------------------------------------
// 文档加载完成事件响应函数，必须保证这段脚本，在body元素加载完成后执行，否则body对象为空，即："Cannot set property 'onload' of null"
//document.body.onload = bindEvent;
//window.onload = onloadFinished;

//----------------------------------------
//  jquery
//----------------------------------------
// 方法一（jquery），文档加载完成事件响应函数
/*$(document).ready(function(){
    alert("document is ready!");

    // $("#btn_clickme").onclick=testFunc;
    $("#btn_clickme").click(testFunc);
});*/

// 方法二（jquery），文档加载完成事件响应函数，推荐
 $(function(){
     //$("#btn_clickme").click(testFunc);
     onloadFinished();
 })