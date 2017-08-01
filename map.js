var mark1 = {};
function initMap() {
  console.log('fsdf');
  var uluru = {
    lat: 25.363,
    lng: 121.044
  };

  var mapStyle = [
      {
          "featureType": "landscape",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "stylers": [
              {
                  "hue": "#00aaff"
              },
              {
                  "saturation": -100
              },
              {
                  "gamma": 2.15
              },
              {
                  "lightness": 12
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "lightness": 24
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
              {
                  "lightness": 57
              }
          ]
      }
  ];

  window.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru,
    styles: mapStyle
  });


  var image = {

          url: 'https://s4.postimg.org/onf9j7sj1/2017-07-29_12.11.53.png',
          // This marker is 20 pixels wide by 32 pixels high.
          // （寬， 高）
          size: new google.maps.Size(128, 128),
          // The origin for this image is (0, 0).
          //Marker的 起始點  （左上角座標）
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 50)

        };

  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    title: 'Uluru (Ayers Rock)',
    icon: image,

  });
//   marker.addListener('click', function() {
//     infowindow.open(map, marker);
//   });
}
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
});

var taipei = {lat: 25.09108, lng: 121.5598};
function getParameter(key){
    var result = [],
        tmp = [];
    var url = new URL(window.location.href);
    return  url.searchParams.get(key);
}

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
   $('#sendAllMessages').on('click', function(){
     addAllMessages();
   });
});
window.emailContent = "";
var currentUserObj = {};
var keySearch =[
    "memberCondition",
   "lat",
   "lon",
   "email"
];
function parseQuery(){
    keySearch.forEach(function(key){
        console.log(key, getParameter(key));
        currentUserObj[key] = getParameter(key);
    });
    console.log(currentUserObj.memberCondition);
    console.log(currentUserObj.email);
    window.emailContent = currentUserObj.email;
    window.lon = currentUserObj.lon;
    window.lat = currentUserObj.lat;
    getChatList(currentUserObj.memberCondition);
}
var baseUrl = 'https://tommy770221.com/AngelHack/';
var GetUserLocURL = baseUrl+"queryUserLoc";
function getChatList(id) {
  $.ajax({
    method: 'GET',
    url: GetUserLocURL+"?id="+id,
    // data: {id+currentUserObj.memberCondition},
    success: function(data){
      console.log(data);
      data.forEach(function(item){
          chatList.push(item);
      });
      fillInMedia(chatList);
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
      var coordinationArray=[];
      let {longitude ,latitude} = position.coords;
    console.log(longitude , latitude);
    initialLoctaion = {lat: Number(longitude ),lng: Number(latitude)};
    mark1 = new google.maps.Marker({
      position: initialLoctaion,
      map: window.map
    });
    window.map.setCenter(initialLoctaion);
  }
   // error function
  function error(){
    console.log('default loc');
    mark1 = new google.maps.Marker({
      position: initialLoctaion,
      map: window.map
    });
    window.map.setCenter(initialLoctaion);
  }
   //如果有geolocation 物件
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

// 設定Marker
function setMark(location, map){
   new google.maps.Marker({
    position: location,
    map: window.map
  });
//   window.map.setCenter(location);
}
var addAllMessageUrl = baseUrl+"addAllMessages";
//新增多人連線
// function addAllMessages(){
//     var text= $('#comment').val();
//     $.ajax({
//         url:addAllMessageUrl,
//         type:'POST',
//         data:"fromEmail="+window.emailContent+"&message="+text+"&lat="+window.lat+"&lon="+window.lon,
//         success: function(data){
//             console.log('multiple:',data);
//             $(".modal-dialog").css('display','none');
//         },
//         error: function(err){
//             console.log(err);
//         }
//     });
// }
var males = [
"https://adminlte.io/themes/AdminLTE/dist/img/user1-128x128.jpg",
"https://adminlte.io/themes/AdminLTE/dist/img/user8-128x128.jpg",
"https://adminlte.io/themes/AdminLTE/dist/img/user6-128x128.jpg"
];
var females = [
"https://adminlte.io/themes/AdminLTE/dist/img/user5-128x128.jpg",
"https://adminlte.io/themes/AdminLTE/dist/img/user7-128x128.jpg"];
// fill in media
function fillInMedia(medias){

  medias.forEach(function(media){
      var numberMale = parseInt(Math.floor(Math.random()*males.length));
      var numberFeMale = parseInt(Math.floor(Math.random()*females.length));

      console.log(typeof numberFeMale, numberFeMale);
      console.log(typeof numberMale, numberMale);
      var thumnailurl = (media.gender==='male')? males[numberMale]:females[numberFeMale];
      let location = {lat: media.lat,lng: media.lon};
      setMark(location, map);
      $('#nav').append(`
        <div class="media">
            <div class="media-left">
                <a href="#">
                    <img class="media-object img-circle" src="${thumnailurl}" style="height:64px;width:64px" alt="...">
                </a>
            </div>
            <div class="media-body">
                <h4 class="media-heading">${media.name}</h4>
                <h5>Gender:<small>${media.gender}</small></h5>
                <h4>lang:${media.locale}</h4>
                <input id="singleChatEmail" type="hidden" value="${media.email}" name='email'/>
            </div>
            <div class="media-right">
                <br>
                <br>
                <button type="button" id="changeMyModal" onclick="getSingleMessages('${media.email}')" class="btn btn-default" data-toggle="modal" data-target="#myModal">
                    <span class="glyphicon glyphicon-comment" aria-hidden="true"  ></span>
                </button>
            </div>
        </div>
      `);
  });
}

// 新增個人發話到 messageWindow
function addMessageToMarker(message){
  console.log('addMessageToMarker', message);
  var contentString =`<div id="content">`+
      `<div id="bodyContent">`+
      `<p>${message}</p>`+
      `</div>`+
      `</div>`;
  console.log(mark1);
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  infowindow.open(map,mark1);

    mark1.addListener('click', function(){
        console.log(mark1);
        infowindow.open(map,mark1);
    });
}
