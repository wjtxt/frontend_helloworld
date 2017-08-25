
/**
 * 一切皆对象，包括Object(实例)和Function（函数，或类型），Function是Object的特例，可作为普通方法使用，也可以结合new作为class的构造函数使用；
 * 类型是对象，对象也看做是类型；
 * 
 * var obj = new funcName(arg)，可以把funcName看做是class名称，这种写法和oop中创建对象的写法一致，内部原理有所区别，先创建一个空对象obj，然后将此对象的__proto__设置为funcName.prototype，
 * 然后调用此funcName(obj,arg)，最后返回obj，整个过程全部是基于function实现。
 * 
 * 定义class时，产生一个ClassRTI对象，记录class的类型信息；创建class对象时，根据ClassRTI对象信息，生成一个class的对象；
 * js定义函数时，js引擎会通过new Function()创建一个Function对象（函数对象），对象中保存函数的基本信息，
 * js中oop通过new、function()、prototype和__prototype__共同实现，new负责完成创建并初始化对象的工作，function用来定义class的构造函数，prototype用来定义class对象的属性和方法，
 * __prototype__则保存着父类的类型信息，实现继承，函数对象自身定义类的静态属性和方法；
 * 
 * js中对象分为2类：
 * 1.Object：根Object（Object基类）、自定义Object；
 * 2.Function：根Function（Function基类）、自定义Function（定义函数、类）；
 * 
 * js对象原型链中的几种类型（或基类）:
 * 1. funcName，从oop角度看，funcName就是class的名字，可以使用类似"new funcName()"的方法，创建一个funcName类型的对象；
 * 2. function funcName()，一个具有特定功能的函数对象（一个具体的函数对象、函数对象的子类、函数对象的实例），对象（子类、实例）的名字叫funcName；
 * 3. function()，函数对象，定义函数对象的基本属性和方法，含constructor属性，constructor为new Function()
 * 4. function Function(),function()对象的constructor
 * 5. Object，含constructor属性
 * 6. function Object()，根Object对象的constructor
 */

// Object，一切对象由此派生
class Object{
    // 构造函数，用来初始化类实例
    var constructor = function Object(){};

    hasOwnProperty : function(){};
    isPrototypeOf : function(){};
};

// Function，是Object的一种特例
class Function : public Object{

    // 构造函数，用来初始化类实例
    var constructor = function Function(){};

    // Function的基本属性信息
    var name;
    var length;
    var arguments;
    var callers;

    // Function的基本方法信息
    apply : function(){};
    call : function(){};
    
    // 父类类型信息，Object.protoType
    Object _proto_;
}

// 函数对象，使用"new Function()"创建，定义函数时js引擎自动创建
class FuncObj : public Function{

    // 父对象的prototype属性引用，用于访问父类的方法，使用new构造对象时赋值（js引擎赋值）
    // 包括函数对象的常用方法和属性，例如apply、call等方法，可以是Function.prototype
    Function _proto_;

    // 属性可以自由扩充，被子类继承(可以理解为类的对象或实例)，定义子类需要使用的方法和属性
    Object prototype;
}

// 普通对象，使用"new funcName()"创建
class NormalObj : public Object {

    // 父对象的prototype属性引用，用于访问父类的方法，使用new构造对象时赋值（js引擎赋值）
    // 通常在父类中自定义，例如userName、userAge等，可以是FuncObj.prototype
    Object _proto_;

    // 属性可以自由扩充，被子类继承(可以理解为类的对象或实例)，定义子类需要使用的方法和属性
    Object prototype;
}