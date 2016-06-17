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
var Login = require('./login');
var Logout = require('./logout');
var CreateBlog = require('./createBlog');
var ViewBlog = require('./viewBlog');

var LayoutComponent = React.createClass({
  render : function(){
  return(
      <div>
      <Navbar />
      {this.props.children}
      </div>

  );
}

});

var Navbar = React.createClass({
  render :function(){
    return(
      <div>
      {
      window.localStorage.getItem('username')==null?
             <ul className="block-menu">
	       <li><Link to="/register" className="three-d">
		       Register
		      <span aria-hidden="true" className="three-d-box">
			    <span className="front">Register</span>
			    <span className="back">Register</span>
		    </span>
	    </Link></li>


     <li><Link to="/login" className="three-d">
      Sign-in
      <span aria-hidden="true" className="three-d-box">
      <span className="front">Sign-in</span>
      <span className="back">Sign-in</span>
    </span>
  </Link></li>
  <li><Link to="/viewBlog" className="three-d">
   View Blog
   <span aria-hidden="true" className="three-d-box">
   <span className="front"> View Blog</span>
   <span className="back"> View Blog</span>
 </span>
</Link></li>
  </ul>
  :
  <ul className="block-menu">
  <li><Link to="/logout" className="three-d">
   Sign-out
   <span aria-hidden="true" className="three-d-box">
   <span className="front">Sign-out</span>
   <span className="back">Sign-out</span>
 </span>
</Link></li>

 <li><Link to="/createBlog" className="three-d">
  Create-Blog
  <span aria-hidden="true" className="three-d-box">
  <span className="front">Create-Blog</span>
  <span className="back">Create-Blog</span>
</span>
</Link></li>
</ul>
}
      </div>
    );
  }
});

var Register = React.createClass({

mixins : [Reflux.listenTo(Store, "onCallingStore")],

  getInitialState : function(){
    return {
      userCredentials : {},
      text1: null
    }
  },

onCallingStore :function(data){

    console.log("In onCallingStore method " +data.msg);
    this.setState({
      userCredentials : data.username,
      text1: data.msg
    });
  },

  registerUser: function(){
   todo.register($('#userCredentials').serialize());

  },

  render: function(){
    return(
      <div>
      {this.state.text1==null?
      <div>
      <form id="userCredentials">
   <div className="form-group">
    <label>Name</label>
    <input type="text" className="form-control" placeholder="Name" name="name" />
  </div>
  <div className="form-group">
    <label>Username</label>
    <input type="text" className="form-control" placeholder="Username" name="username" />
  </div>
   <div className="form-group">
    <label>Email</label>
    <input type="email" className="form-control" placeholder="Email" name="email" />
  </div>
  <div className="form-group">
    <label>Password</label>
    <input type="password" className="form-control" placeholder="Password" name="password" />
  </div>
  <div className="form-group">
    <label>Confirm Password</label>
    <input type="password" className="form-control" placeholder="Password" name="password2" />
  </div>
  <button type="button" onClick={this.registerUser} className="btn btn-default">Submit</button>
</form>
</div>:<div><h3><Login /></h3></div>}
</div>
    );
  }

});


ReactDOM.render((
<Router history={browserHistory}>
    <Route path="/" component={LayoutComponent}>
    <Route path="/register" component={Register} />
    <Route path ="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/createBlog" component={CreateBlog} />
    <Route path="/viewBlog" component={ViewBlog} />
    </Route>
</Router>
),document.getElementById('content'));
