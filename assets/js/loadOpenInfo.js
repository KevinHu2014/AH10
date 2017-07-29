
function getParameter(key){
    var result = [],
        tmp = [];
    console.log(window.location.search);
    var url = new URL(window.location.search);
    console.log(url);
    
    return  url.searchParams.get(key);
}
var keySearch =["as",
   "city",
   "country",
   "countryCode",
   "isp",
   "lat",
   "lon",
   "org",
   "query",
   "region",
   "regionName",
   "status",
   "timezone",
   "zip"];

$(document).ready(function(){
    console.log(window.location.search.substring(1));
//    parseQuery();
});

function parseQuery(){
    keySearch.forEach(function(key){
        console.log(key, getParameter(key));
    });
}