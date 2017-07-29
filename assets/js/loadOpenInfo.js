function getParameter(){
    var result = [],
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
        //   if (tmp[0] === parameterName)
          var key = tmp[0], name = decodeURIComponent(tmp[1]); 
          result.push({key:name});  
            // decodeURIComponent(tmp[1]);

        });
    return result;
}

$(document).ready(function(){
   console.log( getParameter());
});