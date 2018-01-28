//
var app=angular.module('App',['ui.router']);
// // app.controller('mainPage',function(){
// // });
//
    app.config(function ($stateProvider,$urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('login ', {
                url: '/login',
                templateUrl: 'landing-page.html',
                controller:'logCtr'
            })
            .state('backstage', {
                url: '/backstage',
                templateUrl: 'backstage.html',
                controller:'textController'
            })
            .state('backstage.page1',{
                url:'/backstage/page1',
                templateUrl: 'page1.html'
        })
            .state('backstage.page2',{
                url:'/backstage/page2',
                templateUrl: 'page2.html'
            })
    });

    app.controller('logCtr',function ($scope,$state) {

        $(document).keypress(function(e) {
            // 回车键事件
            if(e.which == 13) {
                jQuery("#submit").click();
            }
        });
        console.log(4);
       $("#submit").click(function() {
            $.ajax({
                url: "/carrots-admin-ajax/a/login",
                type: "POST",
                dataType: "json",
                data: {
                    name: $("#name").val(),
                    pwd: $("#code").val()
                },
                success: function (data) {
                    console.log(data);
                    if (data.code === 0) {
                        alert( data.message);
                        $state.go('backstage')
                    } else{
                       $('#hint').text(data.message);
                    }
                },
                error: function (data) {
                    console.log(data);
                    alert("添加失败");
                }
            });
        });
    });

















// angular.module('textApp',['ui.router'])
//                // app.factory('myFactory',function () {
//                //     return {
//                //         name:'wangjiaoyan',
//                //         method:function () {
//                //             alert('我是测试服务的方法！')
//                //         }
//                //     }
//                // });
//                // app.controller ('textController',function ($scope,myFactory) {
//                //     $scope.test=function () {
//                //         alert(1)
//                //     };
//                //     $scope.test();
//                //     console.log(myFactory);
//                //     myFactory.method();
//                //     console.log(myFactory.name)
//                // })
//     //            .controller('test11111111',function ($scope,myFactory) {
//     //                myFactory.method();
//     //            })
//     .controller('textController',function (){
//
//     })
//     .config(function ($stateProvider,$urlRouterProvider) {
//         $urlRouterProvider
//             .otherwise('page1');
//         $stateProvider
//             .state('page1',{
//                 url:'/page1',
//                 templateUrl:'page1.html'
//             })
//             .state('page2',{
//                 url:'/page2',
//                 templateUrl:'page2.html'
//             })
//     })
//
//
$('.info').click(function () {
    $('#info1').toggle();

    $(".trangile1").animate({rotate:'135deg'},1000);
});
$('.list').click(function () {
    $('#list1').toggle();

    $(".trangile2").animate({rotate:'135deg'},1000);
});



// app.config(function ($provide) {
//     $provide.service('movie', function () {
//         this.title = 'The Matrix';
//     });
// });
//
// app.controller('ctrl', function (movie) {
//     expect(movie.title).toEqual('The Matrix');
// });