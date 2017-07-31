'use strict'
//var baseUrl = 'https://tommy770221.com/AngelHack/';
var getSingleMessagesUrl = baseUrl+"getSingleMessages";
var addSingleMessagesUrl = baseUrl+"addSingleMessages";
var getAllMessageUrl = baseUrl+"getAllMessages";
var addAllMessageUrl = baseUrl+"addAllMessages";
var SingleMessageTimer = {};
var AllMessageTimer = {};
//
$(document).ready(function(){
    //單人聊天傳送訊息
    $('#btn-chat').off('click');
    $('#btn-chat').on('click',function(){
        messageToSingle();
    });
    // 更新單人聊天

        SingleMessageTimer = setInterval(getSingleMessages, 10000);

    // 更新多人聊天
        clearInterval(AllMessageTimer);
        AllMessageTimer = setInterval(getAllMessages, 10000);

});
/**
 * messageToSingle
 */
function messageToSingle(){
    console.log($('#btn-input').val());
    console.log(window.emailContent);
    console.log(this);
    var content = $('#btn-input').val();
    $.ajax({
        url:addSingleMessagesUrl,
        type: 'POST',
        data:"fromEmail="+window.emailContent+"&toEmail=tommy770221@hotmail.com"+
             "&message="+content+"&lon="+window.lon+"&lat="+window.lat
        ,
        success: function(data){
            console.log(data);
            $('#myModal').modal('hide');
        },
        error: function(err){
            console.log(err);
            $('#myModal').modal('hide');
        }
    });
}

//取得單人連線
var currentCount = 0;
function getSingleMessages(){
    $.ajax({
        url:getSingleMessagesUrl,
        type: 'GET',
        data:"fromEmail="+window.emailContent+"&toEmail=tommy770221@hotmail.com",
        success: function(data){
            console.log(data);
            if(data){
                currentCount++;
                $('.glyphicon.glyphicon-bell').html("<span class='badge alert-danger' style='font-size:1px;'>"+currentCount+"</span>");
            }
         },
        error: function(err){
            console.log(err);
        }
    });
}
//取得多人連線
function getAllMessages(){
    console.log('getAllMessages');
    $.ajax({
        url:getAllMessageUrl,
        type:'GET',
        data:"fromEmail="+window.emailContent,
        success: function(data){
            console.log('multiple:',data);
          //  $('#Modal2All').modal('hide');

        },
        error: function(err){
            console.log(err);
        }
    });
}
// //新增多人連線
function addAllMessages(){
    $.ajax({
        url:addAllMessageUrl,
        type:'POST',
        data:"fromEmail="+window.emailContent+"&message="+"&lat="+window.lon+"&lon="+window.lat
        ,
        success: function(data){
            console.log('multiple:',data);
        },
        error: function(err){
            console.log(err);
        }
    });
}