'use strict'
const taipei = {lat: 25.09108, lng: 121.5598};
function getParameter(key){
    var result = [],
        tmp = [];
    var url = new URL(window.location.href);
    return  url.searchParams.get(key);
}
var mark1 = {};
var initialLoctaion = {};
var keySearch =[
    "memberCondition",
   "lat",
   "lon",
   "email" 
];
var chatList = [];
$(document).ready(function(){
   parseQuery();
   getGEOLocation();   
});
window.emailContent = "";
var currentUserObj = {};
function parseQuery(){
    keySearch.forEach(function(key){
        console.log(key, getParameter(key));
        currentUserObj.key = getParameter(key);
    });
    window.emailContent = currentUserObj.email;
    getChatList();
}
let baseUrl = 'https://tommy770221.com/AngelHack/';
const GetUserLocURL = `${baseUrl}queryUserLoc`;
function getChatList() {
  $.ajax({
    method: 'GET',
    url: GetUserLocURL+"?id="+currentUserObj.memberCondition,
    // data: {id+currentUserObj.memberCondition},
    success: function(data){
      console.log(data);
    },
    error: function(err){
      console.log(err);
    }
  })
}
function getGEOLocation(){
    initialLoctaion = taipei;
    // successful function
  function success(position){
    let {latitude, longitude} = position.coords;
    console.log(latitude, longitude);
    initialLoctaion = {lat: Number(latitude),lng: Number(longitude)};
    mark1 = new google.maps.Marker({
      position: initialLoctaion,
      map: window.map      
    });
    window.map.setCenter(initialLoctaion);
  }
   // error function
  function error(){
    console.log('default loc');
    
  }
   //如果有geolocation 物件
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

// 設定Marker1
function setMark(location, map){
  mark1 = new google.maps.Marker({
    position: location,
    map: window.map
  });
  window.map.setCenter(location);
}

