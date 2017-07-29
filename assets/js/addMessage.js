'use strict'
const baseUrl = 'http://tommy770221.com:8080/AngelHack/';
const getSingleMessagesUrl = `${baseUrl}getSingleMessages`;
const addSingleMessagesUrl = `${baseUrl}getSingleMessages`;
const getAllMessageUrl = `${baseUrl}getAllMessages`;
const addAllMessageUrl = `${baseUrl}addAllMessages`;
var SingleMessageTimer = {};
var AllMessageTimer = {};
$(document).ready(function(){
    $('#btn-chat').off('click');
    $('#btn-chat').on('click',function(){
        messageToSingle();
    });
    if(SingleMessageTimer!=={}){
        clearInterval(SingleMessageTimer);
        SingleMessageTimer = setInterval(getSingleMessages, 10000);
    } 
    if(AllMessageTimer!=={}){
        clearInterval(AllMessageTimer);
        AllMessageTimer = setInterval(getAllMessages, 10000);
    }
});
/**
 * messageToSingle
 */
function messageToSingle(){
    console.log($('#btn-input').text());
    $.ajax({
        url:addSingleMessagesUrl,
        type: 'POST',
        data: {
            fromEmail:"me@gmail.com",
            toEmail:"yuanyu90221@gmail.com",
            message:$('#btn-input').text(),
            lon: 12.2,
            lat: 13.5  
        },
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


var currentCount = 0;
function getSingleMessages(){
    $.ajax({
        url:getSingleMessagesUrl,
        type: 'GET',
        data: {
            fromEmail:"me@gmail.com",
            toEmail:"yuanyu90221@gmail.com"
        },
        success: function(data){
            console.log(data);
            if(data){
                currentCount++;
                $('.glyphicon.glyphicon-bell').html(`<span class="badge badge-error" style="color:red;">${currentCount}</span>`);
            }
        },
        error: function(err){
            console.log(err);
        }
    });
}

function getAllMessages(){
    console.log('getAllMessages');
    $.ajax({
        url:getAllMessageUrl,
        type:'GET',
        data: {
            fromEmail:"me@gmail.com"
        },
        success: function(data){
            console.log('multiple:',data);
        },
        error: function(err){
            console.log(err);
        }
    }); 
}

function addAllMessages(){
    $.ajax({
        url:addAllMessageUrl,
        type:'POST',
        data: {
            fromEmail:"me@gmail.com",
            toEmail:'test@gmail.com',
            lat:10.23,
            lon:123.23
        },
        success: function(data){
            console.log('multiple:',data);
        },
        error: function(err){
            console.log(err);
        }
    });
}