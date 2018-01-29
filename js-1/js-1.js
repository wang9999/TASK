/**
 * Created by Administrator on 2017/11/15.
 */

function bg3(){
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    return "rgb("+r+','+g+','+b+")";
}
function bg4(){
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    return "rgb("+r+','+g+','+b+")";
}
function bg5(){
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    return "rgb("+r+','+g+','+b+")";
}

// function change() {
//   // // parseInt(Math.random()*100);
//   //   var choose_num =document.getElementsByTagName("div");
//   //   for (var x = 0; x < 4; x++) {
//   //       nu[random].style.backgroundColor = bg3();
//     }
function change() {
    var num = document.getElementsByTagName("div");
    for (i = 0; i < 9; i++) {
        var n1 = Math.floor(Math.random() * 9);
        var n2 = Math.floor(Math.random() * 9);
        var n3 = Math.floor(Math.random() * 9);
        if (n1 != n2 && n2 != n3 && n1 != n3&&bg3()!=bg4()&&bg3()!=bg5()&&bg4()!=bg5()) {
            break;
        }
    }
    for(var j=0;j<num.length;j++){
        num[j].style.background = "orange";
    }
    num[n1].style.background = bg3();
    num[n2].style.background = bg4();
    num[n3].style.background = bg5();

// var s=document.getElementById("star").value=numb;
//     numb=numb+1;

     s=setTimeout("change()",1000);

}

function end() {
clearTimeout(s);
    var num = document.getElementsByTagName("div");
    for (i=0;i<9;i++){
        num[i].style.background ="orange";
    }
}

// function getRandomArrayElements(arr, count) {
//     var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
//     while (i-- > min) {
//         index = Math.floor((i + 1) * Math.random());
//         temp = shuffled[index];
//         shuffled[index] = shuffled[i];
//         shuffled[i] = temp;
//     }
//     return shuffled.slice(min);
// }
// var items = ['1','2','4','5','6','7','8','9','10'];
// console.log( getRandomArrayElements(items, 4) );

//
// var arr=new Array(3);//创建数组容纳随机数
// // var arr1=new Array(3);
// for(var i=0;i<arr.length;i++){//创建第一组数组
//     var a=parseInt(Math.random()*4);
//     console.log(a);
//     if(i==0){//第一个数字直接导入数组
//         arr[i]=a;
//     }else{
//         for(var j=0;j<i;j++){//第二个与第三个数字进行判断
//             if(a==arr[j]){//如果重复从新开始
//                 i--
//             }else{
//                 arr[i]=a;
//             }
//         }
//     }
// }
// for(var i=0;i<arr.length;i++) {
//     choose_num[4].style.background = bg3();//将随机的颜色给随机的地址
// }
// }
// var items = ['nu1','nu2','nu3','nu4','nu5','nu6','nu7','nu8','nu9'];
// function getRandomArrayElements(arr, count) {
//     var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
//     while (i-- > min) {
//         index = Math.floor((i + 1) * Math.random());
//         temp = shuffled[index];
//         shuffled[index] = shuffled[i];
//         shuffled[i] = temp;
//     }
//     return shuffled.slice(min);
// }
// var items = ['nu1','nu2','nu3','nu4','nu5','nu6','nu7','nu8','nu9'];
// function change3() {
//     var n3=document.getElementById(getRandomArrayElements(items, 3) );
//     getRandomArrayElements(items, 3).className="colorc"
// }
