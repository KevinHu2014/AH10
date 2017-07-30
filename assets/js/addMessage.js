'use strict'
const baseUrl = 'https://tommy770221.com/AngelHack/';
const getSingleMessagesUrl = `${baseUrl}getSingleMessages`;
const addSingleMessagesUrl = `${baseUrl}addSingleMessages`;
const getAllMessageUrl = `${baseUrl}getAllMessages`;
const addAllMessageUrl = `${baseUrl}addAllMessages`;
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
    if(SingleMessageTimer!=={}){
        clearInterval(SingleMessageTimer);
        SingleMessageTimer = setInterval(getSingleMessages, 10000);
    } 
    // 更新多人聊天
    if(AllMessageTimer!=={}){
        clearInterval(AllMessageTimer);
        AllMessageTimer = setInterval(getAllMessages, 10000);
    }
});
/**
 * messageToSingle
 */
function messageToSingle(){
    console.log($('#btn-input').val());
    console.log(window.emailContent);
    let content = $('#btn-input').val();
    $.ajax({
        url:addSingleMessagesUrl,
        type: 'POST',
        data:`fromEmail=${window.emailContent}&toEmail=tommy770221@hotmail.com`+
            `&message=${content}&lon=${window.lon}&lat=${window.lat}`
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
        data:`fromEmail=yuanyu_90221@hotmail.com&toEmail=tommy770221g@hotmail.com`
        ,
        success: function(data){
            console.log(data);
            if(data){
                currentCount++;
                $('.glyphicon.glyphicon-bell').html(`<span class="badge alert-danger" style='font-size:1px;'>${currentCount}</span>`);
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
        data:`fromEmail=yuanyu_90221@hotmail.com` 
        ,
        success: function(data){
            console.log('multiple:',data);
        },
        error: function(err){
            console.log(err);
        }
    }); 
}
// //新增多人連線
// function addAllMessages(){
//     $.ajax({
//         url:addAllMessageUrl,
//         type:'POST',
//         data:"?fromEmail=yuanyu_90221@hotmail.com&toEmail=tommy770221@hotmail.com&lat=10.12&lon=123.23"
//         ,
//         success: function(data){
//             console.log('multiple:',data);
//         },
//         error: function(err){
//             console.log(err);
//         }
//     });
// }