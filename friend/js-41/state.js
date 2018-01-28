/**
 * Created by Administrator on 2017/12/22.
 */
$(document).ready(function () {
var fsm =new StateMachine({
    init: 'none',
    transitions: [
        { name: 'green',  from:['none','yellow','red'],  to: 'green' },
        { name: 'yellow', from:['red','green'] ,  to: 'yellow' },
        { name: 'red',  from: ['green','yellow'], to: 'red' }
        // { name: 'vote', from: 'discuss',   to: 'next' }
    ],

    methods:{
        onBeforeNone:function () {
            $('#green').css('background','green')
        },
        onBeforeGreen:function () {
            $('#green').css('background','green')
        },
        onLeaveGreen:function () {
            // sessionStorage.setItem("killed","killed");
            // console.log(fsm.state)
            $('#green').css('background','none')
        },
        onBeforeYellow:function () {
            $('#yellow').css('background','yellow')
        },
        onLeaveYellow:function () {
            // sessionStorage.setItem("ghosted","ghosted");
            // console.log(fsm.state)
            $('#yellow').css('background','none')
        },
        onBeforeRed:function () {
            $('#red').css('background','red')
        },
        onLeaveRed:function () {
            // sessionStorage.setItem("speaked","speaked");
            // console.log(fsm.state)
            $('#red').css('background','none')
        }
    }

});
    $('#green').css('background','green')
$(document).ready(function () {
    fsm.none();
});
    $('#gre').click(function () {
        fsm.green()
    });
    $('#yel').click(function () {
        fsm.yellow()
    });
    $('#re').click(function () {
        fsm.red()
    });

});
