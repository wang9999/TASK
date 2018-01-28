/**
 * Created by Administrator on 2017/11/30.
 */

s = sessionStorage.TotalArr;
//重新转换为数组
TotalArr = JSON.parse(s);
var killnum=sessionStorage.getItem("killnum");
var peoplenum=sessionStorage.getItem("peoplenum");

var dieNum =null;
if(sessionStorage.getItem('dieNum')){
    dieNum=JSON.parse(sessionStorage.getItem('dieNum'));
}else {
    dieNum=[]
}

//定义一个死亡玩家的空数组，并存储，便于在其他页面增加死亡玩家号码；
sessionStorage.setItem("dieNum",JSON.stringify(dieNum));
//储存天数
var day=1;
sessionStorage.setItem("Day",'第'+day+'天');



// 复制参数
var container=[];
var identity;
for (var i = 0; i < TotalArr.length; i++) {
    identity = '<div class="option">'+ '<div class="people">' + TotalArr[i] +
        '</div>' +'<div class="number"> ' + (i + 1) + "号" + '</div>'+'</div>' ;

    container.push(identity);
}
document.getElementById("diary").innerHTML=container.join('');

//把所有的玩家都存入一个数组，并添加状态和序号
// var player = new Array();
// for (i = 0; i < TotalArr.length; i++) {
//     player[i] =
//     {
//         role: TotalArr[i],
//         state: "alive",
//         num: i + 1
//
//     };
// }
// console.log(player);

var testGt=null;

$(document).ready(function () {

    $(".option").click(function () {
        var people = $(this).find(".people").text();                       //获取点击的玩家身份
        var index = $(this).index();                                    //获取死亡人的下标
        testGt=index;
        $(".people").removeClass("down");
        //杀人页面
        if(sessionStorage.getItem('isKill')==1){
            if (people === "杀手") {
                alert("刀下留情！！！去杀平民");                                  //如果是杀手，提示
            } else {
                $(this).find('.people').addClass('down');
            }
        }
        //投票页面
        else {
            // $(this).find('.people').addClass('down');
        }

    });




});



$("#start").click(function () {
    dieNum.push(testGt);
    sessionStorage.setItem("dieNum",JSON.stringify(dieNum));
    // var k = $(".number").text();
    // var  kArr = k.split(',');
    if(dieNum==null){
        alert("杀个人再走啊")
    }
    else{
        location.href="js-The judge this.html";
    }

    });
var predie=sessionStorage.getItem("isKill");
if(predie==1){
    $(".words").text("黑夜降临，杀手请睁眼杀人");
    $("#start").text("杀人");
}else{
    $(".words").text("白天到了，请所有玩家投票");
    $("#start").text("投票");
}

//从存储的东西里找到第几个是死人，然后渲染变色，每次进来后就执行一次
function rendar() {
    for(var k=0;k<TotalArr.length;k++){
        for(var r=0;r<dieNum.length;r++){
            if(dieNum[r]==k){
                $('.people').eq(k).addClass('down')
            }
        }
    }
}
rendar();











