function getTotal(cb){
   $.ajax({
      url:'http://172.16.50.197:8080/login.jsp',
      type: "POST",
      beforeSend: function (xhr) {
          xhr.setRequestHeader("X-Atlassian-Token","nocheck");
      },
      data:{
        os_username:'liuchyg',
        os_password:'yy4115021991',
        os_destination:'/browse/YC-530?filter=-1&jql=assignee%20in%20(currentUser())%20ORDER%20BY%20updatedDate%20ASC',
        user_role:'',
        atl_token:'',
        login:'登录'
      }
    }).then(function(data,status,xhr){
        $.ajax({
            url: 'http://172.16.50.197:8080/rest/issueNav/1/issueTable',
            type: "POST",
            data:{
              startIndex:0,
              filterId:-1,
              jql:'assignee in (currentUser()) ORDER BY updatedDate ASC',
              layoutKey:'split-view'
            },
            beforeSend: function (xhr) {
              xhr.setRequestHeader("X-Atlassian-Token","nocheck");
          }
        }).then(function(data){
           cb(data);
        })
    })

}


var bg = chrome.extension.getBackgroundPage();
function exc(){
  getTotal(function(data){ 
      chrome.browserAction.setBadgeText({text:data.issueTable.total+''})
  });
}
exc();
setInterval(exc,60*1000)