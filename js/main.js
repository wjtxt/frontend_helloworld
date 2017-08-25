
// 定义requirejs配置参数
var requireConfig = {
    // 注意：这里是绝对路径！！！
    // baseUrl配置的是js脚本的根路径
    baseUrl: "H:/CacheFiles/Windows/桌面/temp/code/test_frontend/js",
    paths: {
        // libs为宏，后续可以使用这个宏
        libs: "H:/CacheFiles/Windows/桌面/temp/code/test_frontend/libs"
    }
};

// 启用配置
require.config(requireConfig);

/**
 * 1. js脚本不要加js后缀,否则会加载失败！
 * 2. require加载的js组件是异步化的，无法预期加载次序，而jquery是最基础的组件，因此最好静态加载！
 */
require([/*'libs/jquery-3.2.1',*/
        'libs/bootstrap/4.0.0-alpha.6/bootstrap',
        'libs/bootstrap-table/1.11.0/bootstrap-table',
        'module_testentry',
        'module_init'
    ],

    // 
    function (bs, bst,module_testentry, module_init) {
        // (function(){
        //     // 测试
        //     module_class.test();
        // })();

        $(function () {
            //module_testentry.test();
            module_init.init();
        });

    });