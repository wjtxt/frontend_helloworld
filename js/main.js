var requireConfig = {
    baseUrl:"H:/CacheFiles/Windows/桌面/temp/test/js",
    paths:{
        libs : "H:/CacheFiles/Windows/桌面/temp/test/libs"
    }
};

require.config(requireConfig);

//require(['../libs/jquery.js','../js/module_testentry','../js/module_class'],
require(['libs/jquery-3.2.1','module_testentry','module_div'],

function(jquery,module_testentry,module_div){
    // (function(){
    //     // 测试
    //     module_class.test();
    // })();

    $(function(){
        module_testentry.test();
        module_div.init();
    });
    
});