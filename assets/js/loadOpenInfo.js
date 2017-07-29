function getParameter(){
    var result = [],
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
        //   if (tmp[0] === parameterName) 
          result.push(tmp[0]:tmp[1]);  
            // decodeURIComponent(tmp[1]);

        });
    return result;
}

$(document).ready(function(){
   console.log( getParameter());
});