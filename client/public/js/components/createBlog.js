var React = require('react');
var ReactDOM = require('react-dom');
var todo = require('../actions/Action')
var Store = require('../stores/store');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var IndexRoute = require('react-router');
var browserHistory = require('react-router').browserHistory;
var Reflux= require('reflux');



var CreateBlog = React.createClass({

  render: function(){

    return(

      <div>
      <p>
      Create your blog here!
      </p>
      </div>
    );

  }


});
module.exports = CreateBlog;
