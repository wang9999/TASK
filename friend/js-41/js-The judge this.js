$(document).ready(function(){
    $(".firstday").click(function(){
        $("#day").toggle();
    });
});
$(document).ready(function () {
    var fsm = new StateMachine({
        init: 'none',
        transitions: [
            {name: 'kill', from: 'none', to: 'die'},
            {name: 'lastWords', from: 'die', to: 'lastSpeak'},
            {name: 'speak', from: 'lastSpeak', to: 'discuss'},
            {name: 'vote', from: 'discuss', to: 'none'},
            {name: 'goto', from: '*', to: function (a) {return a}}

        ],
        methods: {
            onAfterKill: function (lifecycle) {                             //杀人事件后
                console.log('状态、 ' + fsm.state);
                sessionStorage.setItem('stateDie', fsm.state);

            },

            onLastWords:function (lifecycle) {
                console.log('状态: ' + fsm.state);//当执行发表遗言事件时
                alert("请亡者发表最后遗言");
                sessionStorage.setItem('last', fsm.state);
                $("#lastWords").css('background-color','#18758D');

            },

            onSpeak:function (lifecycle) {          //当执行玩家发言时
                console.log('状态: ' + fsm.state);//当执行发表遗言事件时
                sessionStorage.setItem('speak', fsm.state);
                alert("请玩家依次发言");
                $("#speak").css('background-color','#18758D');

            },

            onAfterVote:function (lifecycle) {
                $('#vote').css('background-color', '#18758D');
                sessionStorage.setItem('stateNone',fsm.state  );                //保存状态 None
                sessionStorage.removeItem('stateDie');                          //清除 stateDie 状态的数据，回到第二天
                sessionStorage.removeItem('last');
                sessionStorage.removeItem('speak');
            }
        }
    });

    var Die=sessionStorage.getItem('stateDie');
    var Last=sessionStorage.getItem('last');
    var Discuss=sessionStorage.getItem('speak');

    if(Die === "die"){    //保存杀手杀人状态
        $('#kill').css('background-color', '#18758D');
    }
    $("#kill").click(function () {
        if(Die === "die"){   //如果已经杀过人，就进行下一步，并执行kill方法
            alert('请按步骤来');
        }
        else {
            location.href = 'js-kill people.html';
            fsm.kill();
            sessionStorage.setItem('isKill',1);
        }
    });

    if(Last=== "lastSpeak"){
        $('#lastWords').css('background-color', '#18758D');
    }
    $("#lastWords").click(function () {
        if(Die !== "die"){
            alert("请先杀人")
        }
        else {
            fsm.kill();    //显示die状态才能进行下一步
            if (Last === "lastSpeak") {
                alert("请按步骤来");
                $('#lastWords').css('background-color', '#18758D');
            }
            else {
                fsm.lastWords();
            }
        }
    });


    if(Discuss === "discuss"){
        $('#speak').css('background-color', '#18758D');
    }
    $("#speak").click(function () {
        if(Die !== "die"){
            alert("请先杀人")
        }
        else{
            if ((Discuss === "discuss")) {
                alert("请按步骤来");
            } else {
                fsm.speak();
            }
        }

    });

    $("#vote").click(function () {
        if(Die !== "die") {
            alert("请先杀人")
        }
        else{
            fsm.vote();
            location.href = 'js-kill people.html';
        }
    });

});

$(".over").click(function () {
    if (confirm("确定结束该游戏吗？")) {
        sessionStorage.clear();
        location.href = "../js-2/js2-1.html";
    }
});