define([
    'libs/jquery-3.2.1', 'libs/ztree/jquery.ztree.all'
], function (jq, zt) {
    return {
        init: function () {

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
                var newNode = document.body.appendChild(btn);
                newNode.onclick = function () {
                    alert('you click new button！');
                };

                return function () {
                    alert("111-222-333");
                }
            };

            function onClickTest() {
                //alert('你点的是测试按钮！');
                var username = $('#tb_username').prop('value');
                var password = $('#tb_password').prop('value');
                var queryString = '用户名：' + username + '，密码：' + password;
                alert(queryString);
            }

            // 初始化树
            function initTree() {

                var zTreeObj;

                // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
                // function zTreeOnClick(event, treeId, treeNode) {
                //     alert(treeNode.id + ", " + treeNode.name+','+treeNode.custom);
                // };
                function zTreeOnClick() {
                    alert('hello world!');
                };
                var setting = {
                    callback: {
                        onClick: zTreeOnClick
                    }
                };

                // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
                var zNodes = [
                    {
                        name: "pds", open: true, children: [
                            { name: "be",id:1,custom:'hello' }, { name: "bw",id:2,custom:'hello' }]
                    },
                    {
                        name: "express", open: true, children: [
                            { name: "mds",id:3,custom:'hello' }, { name: "apps",id:4,custom:'hello' }]
                    }
                ];

                zTreeObj = $.fn.zTree.init($("#tree"), setting, zNodes);
            }

            // 定义绑定控件事件的函数
            function onloadFinished() {
                initTree();

                //document.getElementById("btn_clickme").onclick = onClickMe;
                $("#btn_clickme").click(onClickMe);
                $('#btn_test').click(onClickTest);

                // document.getElementById("btn_clickme").onmouseover = function () {
                //     // alert("onmouseover!");
                //     document.getElementById("btn_clickme").setAttribute("value", "ok");;
                // };
                $('#btn_clickme').mouseenter(function () {
                    // $('#btn_clickme').setAttribute('value','ok');
                    $('#btn_clickme').attr('value', 'ok');
                });

                // document.getElementById("btn_clickme").onmouseout = function () {
                //     document.getElementById("btn_clickme").setAttribute("value", "点我");
                // };
                $('#btn_clickme').mouseleave(function () {
                    // $('btn_clickme').setAttribute('value','点我');
                    $('#btn_clickme').attr('value', '点我');
                })
            };

            // 绑定控件事件
            onloadFinished();
        }
    }
});