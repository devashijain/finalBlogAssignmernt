var React = require('react');
var ReactDOM = require('react-dom');
var todo = require('../actions/Action')
var Store = require('../stores/store');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var IndexRoute = require('react-router');
var browserHistory = require('react-router').browserHistory;
var CreateBlog = require('./createBlog');
var Reflux= require('reflux');


var Login = React.createClass({
  mixins: [Reflux.listenTo(Store, "onCallingStore")],

  getInitialState: function(){
     return {
       userLoginData: {},
       textLogin : null
     }
   },

onCallingStore : function(data){

  console.log("Inside calling store methods of login" +data.message);
  this.setState({
    userLoginData : data.username,
    textLogin : data.message
  });
  window.localStorage.setItem("username", data.username);
  this.loginSuccess();
},

loginSuccess : function(){
  browserHistory.push('/');
  
},

loginUser: function(){
todo.login($('#userLogin').serialize());
},
  render: function(){
      return(
        <div>
            {this.state.textLogin != 'Authentication successful'?
            <div>
            <h2 className="page-header">Account Login</h2>
              <form id="userLogin">
                <div class="form-group">
                <label>Username</label>
                <input type="text" className="form-control" name="username" placeholder="Username" />
                </div>
                <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" name="password" placeholder="Password" />
              </div>
                <button type="button" onClick={this.loginUser} className="btn btn-default">Submit</button>
                </form>
              </div>:<div><CreateBlog /></div>}
			  </div>

  );
  }

});


module.exports = Login;
