var Reflux = require('reflux');
var todo = require('../actions/Action');

var Store = Reflux.createStore({

listenables : todo,
data: {
username : null,
msg: '',
statusCode: null,
message: null,
error: null,
results:{},
movieTitle: null
},

onRegister :function(data){

$.ajax({
    url: '/users/register',
    type:'post',
    data: data,
    success: function(response){
      console.log("In onRegister method " +response.user);

        this.data.username =response.user;
        this.data.msg= response.msg;
        console.log(this.data);
      this.trigger(this.data);
    }.bind(this)

  });
},



onLogin : function(loginData){
$.ajax({

    url:'/users/login',
    type:'post',
    data:loginData,
    success: function(response){
      console.log("Inside onLogin method "+response.statusCode);

        if(response && response.hasOwnProperty('error')) {
          console.log('Error occurred : ' + response.message);
          console.log(response.error);
          this.data.username = null;
          this.data.statusCode = response.statusCode;
          this.data.message= response.message;
        } else if(response && response.statusCode == 200) {
          this.data.username = response.user;
          this.data.statusCode = response.statusCode;
          this.data.message= response.message;
        } else if(response && response.statusCode == 400) {
          this.data.username = null;
          this.data.statusCode = response.statusCode;
          this.data.message= response.message;
        }
        console.log('triggering data');
        console.log(this.data);
        this.trigger(this.data);
      }.bind(this)

  });
},

onLogout : function(){

  window.localStorage.clear();
  this.trigger();

}




});


module.exports = Store;
