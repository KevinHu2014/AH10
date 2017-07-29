
function getParameter(key){
    var result = [],
        tmp = [];
    // console.log
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
   parseQuery();
});

function parseQuery(){
    keySearch.forEach(function(key){
        console.log(key, getParameter(key));
    });
}