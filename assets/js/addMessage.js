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
                            <img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle">
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
                                <img src="http://placehold.it/50/55C1E7/fff&amp;text=U" alt="User Avatar" class="img-circle">
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