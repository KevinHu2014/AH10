//'use strict'
var baseUrl = 'https://tommy770221.com/AngelHack/';
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



    // 更新單人聊天
     if(SingleMessageTimer!={}){
       // SingleMessageTimer = setInterval(getSingleMessages, 10000);
     }

    // 更新多人聊天
    if(SingleMessageTimer!={}) {
        clearInterval(AllMessageTimer);
        AllMessageTimer = setInterval(getAllMessages, 10000);
    }

});
/**
 * messageToSingle
 */
function messageToSingle(x){
    console.log($('#btn-input').val());
    console.log(window.emailContent);
    console.log(x);
    var content = $('#btn-input').val();
    $.ajax({
        url:addSingleMessagesUrl,
        type: 'POST',
        data:"fromEmail="+window.emailContent+"&toEmail="+x+
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
function getSingleMessages(x){
    console.log(x);
     $('#btn-chat').attr("onclick",'messageToSingle("'+x+'")');

    $.ajax({
        url:getSingleMessagesUrl,
        type: 'GET',
        data:"fromEmail="+window.emailContent+"&toEmail="+x,
        success: function(data){
            console.log(data);
            if(data){
              //  currentCount++;
              //  $('.glyphicon.glyphicon-bell').html("<span class='badge alert-danger' style='font-size:1px;'>"+currentCount+"</span>");
                $('.chat').empty();
                for(var i=0;i<data.length;i++){
                    var message=data[i];
                    console.log(data[i]);
                    if(data[i].fromEmail==window.emailContent){
                        $('.chat').append(`<li class="right clearfix"><span class="chat-img pull-right">
                            <img src="https://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle">
                            </span>
                            <div class="chat-body clearfix">
                            <div class="header">
                            <small class=" text-muted"><span class="glyphicon glyphicon-time"></span>`+data[i].createDate+` ago</small>
                        <strong class="pull-right primary-font">`+data[i].fromEmail+`</strong>
                        </div>
                        <p>`+data[i].message+`
                        </p>
                        </div>
                        </li>`);
                    }else{

                        $('.chat').append(` <li class="left clearfix"><span class="chat-img pull-left">
                                <img src="https://placehold.it/50/55C1E7/fff&amp;text=U" alt="User Avatar" class="img-circle">
                            </span>
                                <div class="chat-body clearfix">
                                    <div class="header">
                                        <strong class="primary-font">`+data[i].fromEmail+`</strong> <small class="pull-right text-muted">
                                            <span class="glyphicon glyphicon-time"></span>`+data[i].createDate+` ago</small>
                                    </div>
                                    <p>
                                       `+data[i].message+`
                                    </p>
                                </div>
                            </li>`);
                    }



              }

          /*  <li class="right clearfix"><span class="chat-img pull-right">
                    <img src="http://placehold.it/50/FA6F57/fff&amp;text=ME" alt="User Avatar" class="img-circle">
                    </span>
                    <div class="chat-body clearfix">
                    <div class="header">
                    <small class=" text-muted"><span class="glyphicon glyphicon-time"></span>13 mins ago</small>
                <strong class="pull-right primary-font">Bhaumik Patel</strong>
                </div>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                dolor, quis ullamcorper ligula sodales.
                </p>
                </div>
                </li>*/
            }
         },
        error: function(err){
            console.log(err);
        }
    });
}
var chatAllList = [];
//取得多人連線
function getAllMessages(){
    $('#allMessagesContent').empty();
    console.log('getAllMessages');
    var count = 0;
    chatAllList = [];
    // 把再現上的對話都抓出來
    chatList.forEach(function(chatItem){
   
    $.ajax({
        url:getAllMessageUrl,
        type:'GET',
        data:"fromEmail="+chatItem.email,
        success: function(data){
            console.log('multiple:',data);
            data.forEach(function(dt){
                chatAllList.push(dt);
            });
            chatAllList.sort(function(first, second){
                return first.createDate <= second.createDate;
            });
              $('#allMessagesContent').empty();
            fillInPublicField(chatAllList);
        },
        error: function(err){
            console.log(err);
        }
    });
    });

}

function fillInPublicField(data){
   for(var i=0;i<data.length;i++){
                var message=data[i];
                console.log(message);
                // $('#allMessagesContent').append(`<p>`+message.fromEmail+" : "+message.message+`   `+message.createDate+`</p>`);
                var chat = searchChatByEmail(message.fromEmail);
                let time = new Date(message.createDate);
                let timestamp = time.toLocaleTimeString();
                let thumnail = (message.fromEmail === window.emailContent)?"https://placehold.it/50/FA6F57/fff&amp;text=ME"
                                                                          :"https://placehold.it/50/55C1E7/fff&amp;text=U";
                $('#allMessagesContent').append(
                `<div class="left clearfix" style="margin-bottom:10px;">
                    <span class="chat-img pull-left">
                        <img src="${thumnail}" alt="User Avatar" class="img-circle" style="height:64px;">
                    </span>
                    <div class="chat-body clearfix">
                        <div class="header">
                            <strong class="primary-font">${chat.name}</strong> <small class="pull-right text-muted">
                                <span class="glyphicon glyphicon-time"></span>${timestamp}</small>
                        </div>
                        <p>${message.message}
                        </p>
                    </div>
                </div>`);
            }
}
function searchChatByEmail(email){
    return chatList.find(function(chat){
        return chat.email === email;
    });
}

function searchImageUrl(name){
    let chatArray = Array.from($('#nav .media .media-body .media-heading'));
    let url = 'https://placehold.it/50/55C1E7/fff&amp;text=U';
    let length = chatArray.length;
    for(let i =0; i < length; i++){
        if(name === chatArray[i].innerText){
            return $('#nav .media .media-left img')[i].src;
        }
    }
    return url;
}
// //新增多人連線
function addAllMessages(){
    $('.chat').empty();
    var comment=$('#comment').val();
   // var commentText=$('#comment').text();
    console.log(comment);
   // console.log(commentText);
    $.ajax({
        url:addAllMessageUrl,
        type:'POST',
        data:"fromEmail="+window.emailContent+"&message="+comment+"&lat="+window.lon+"&lon="+window.lat
        ,
        success: function(data){           
            $('#Modal2All').modal('hide');
            console.log('multiple:',data);
            addMessageToMarker(comment);
             $('#comment').val('');
        },
        error: function(err){
            $('#comment').val('');
            console.log(err);
        }
    });
}
