var React = require('react');
var ReactDOM = require('react-dom');
var todo = require('../actions/Action')
var Store = require('../stores/store');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var IndexRoute = require('react-router');
var browserHistory = require('react-router').browserHistory;
var ViewBlog = require('./viewBlog');
var Reflux= require('reflux');



var Logout = React.createClass({

  mixins: [Reflux.listenTo(Store, "onCallingStore")],

onCallingStore: function(){

  browserHistory.push('/');
},

componentDidMount : function() {
  this.signout();
},

signout : function(){
  todo.logout();
},

render : function(){
    return(

        <div> <ViewBlog /> </div>

    );
  }

});

module.exports = Logout;
