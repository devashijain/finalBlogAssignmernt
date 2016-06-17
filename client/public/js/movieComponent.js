var{Router, Route, IndexRoute, Link, browserHistory} = ReactRouter;

var MainLayout = React.createClass({
  render: function(){
    return(
      <div>
        <Navbar />
        <br />
        {this.props.children}
        </div>
    );
  }

});

var Navbar = React.createClass({
  render :function(){
    return(
      <div>
      <ul className="block-menu">
	<li><Link to="/home" className="three-d">
		Home
		<span aria-hidden="true" className="three-d-box">
			<span className="front">Home</span>
			<span className="back">Home</span>
		</span>
	</Link></li>
	<li><Link to="/search" className="three-d">
		Search Movie
		<span aria-hidden="true" className="three-d-box">
			<span className="front">Search Movie</span>
			<span className="back">Search Movie </span>
		</span>
	</Link></li>
  <li><Link to="/viewMovie" className="three-d">
		View Watch-List
		<span aria-hidden="true" className="three-d-box">
			<span className="front">View Watch-List</span>
			<span className="back">View Watch-List </span>
		</span>
	</Link></li>
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
  </ul>

      </div>
    );
  }
});


var Home= React.createClass({
  render : function(){
    return(
      <div>

      <div className="container-fluid">
	<div className="row">
		<div className="col-md-12">
			<blockquote>
				<p >
					 Let us get you started with your WATCHLIST!
				</p>
			</blockquote>
			<div className="carousel slide" id="carousel-799912">
				<ol className="carousel-indicators">
					<li data-slide-to="0" data-target="#carousel-799912">
					</li>
					<li data-slide-to="1" data-target="#carousel-799912">
					</li>
          <li data-slide-to="2" data-target="#carousel-799912">
					</li>
					<li data-slide-to="3" data-target="#carousel-799912" className="active">
					</li>
				</ol>
				<div className="carousel-inner">
					<div className="item">
						<img alt="Carousel Bootstrap First" src="http://img05.deviantart.net/b984/i/2012/224/1/b/the_dark_knight_rises_logo__1_by_moonillustrator-d5avx7k.jpg" />
						</div>
						<div className="item">
						<img alt="Carousel Bootstrap Third" src="http://www.behindwoods.com/tamil-movies/thanga-magan/stills-photos-pictures/thanga-magan-stills-photos-pictures-23.jpg" />
					</div>
					<div className="item">
					<img alt="Carousel Bootstrap Second" src="http://media1.santabanta.com/full1/Bollywood%20Movies/Yeh%20Jawaani%20Hai%20Deewani/yeh-jawaani-hai-deewani-0v.jpg" />
					</div>
					<div className="item active">
					<img alt="Carousel Bootstrap Third" src="http://www.25cineframes.com/images/gallery/2015/09/jr-ntr-nannaku-prematho-movie-first-look-posters-wallpapers/46-Jr-NTR-Nannaku-Prematho-Movie-First-Look-Posters.jpg" />
					</div>

				</div>
        <a className="left carousel-control" href="#carousel-799912" data-slide="prev"><span className="glyphicon glyphicon-chevron-left"></span></a> <a className="right carousel-control" href="#carousel-799912" data-slide="next"><span className="glyphicon glyphicon-chevron-right"></span></a>

      </div>
		</div>
	</div>
</div>
      </div>
    );
}
});


var SearchMovie = React.createClass({
  getInitialState: function(){
    return{
    text:'',
    results: {}
    }

  },
    render :function(){
        return(
        <div>
          <div className="jumbotron well">
            <div className ="container-fluid">
                <div className ="col-md-12">
                  <div className="row">

              <h3 id="heading3">
              Movies to Watch
            </h3>
            <form>
              <input type="text" onChange={this.changeText} value={this.state.text} className="form-control"/>
              <br />
              <button type="button" className="btn btn-primary form-control glyphicon glyphicon-search" onClick={this.onClick.bind(this, this.state.text)}></button>
            </form>

            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
        {this.state.results.Title!=undefined?<Moviedetail results={this.state.results}/>:<div></div>}

    </div>
    );
    },

    changeText: function(e){
       this.setState({text: e.target.value});
        //alert(message);
    },
  onClick: function(message)
  {
    //alert(message);



  if(message!='' && message!=' ' && message!=undefined && message!=null)
    {

    $.ajax({
  url:'/fetchMovieFromIMDB',
  type:'post',
  data: 'name='+message,
  cache:false,
  success:function(movieDetail){

    this.setState({results:movieDetail});
    }.bind(this)
});
}
}
});






var Moviedetail = React.createClass({
  render: function(){
    return (

                <div className="jumbotron well">
                  <div className ="container-fluid">
                      <div className ="col-md-12">
                        <div className="row">
                          <div className ="col-md-3">
                            <img className="img-circle" src={this.props.results.Poster} alt={this.props.results.Title} height="444px" width="300px"/>
                          </div>
                          <div className ="col-md-9" id="details">
                             <input className="form-control" type="text" defaultValue={this.props.results.Title} />
                             <input className="form-control" type="text" value={this.props.results.Year} />
                             <input className="form-control" type="text" value={this.props.results.Actors}/>
                             <input className="form-control" type="text" value={this.props.results.Director}/>
                             <input className="form-control" type="text" value={this.props.results.Plot}/>
                             <input className="form-control" type="text" value={this.props.results.Released}/>
                             <p >
                             <small><h3>
                              <span className="glyphicon glyphicon-calendar"></span>
                              <span id="Released"> {this.props.results.Released}</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                                <b>Ratings : <span id="imdbRating">{this.props.results.imdbRating}</span></b>
                                &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                                <b>Awards : </b><span id="Awards">{this.props.results.Awards}</span></h3></small>
                            </p>
                          <a type="button" href={'http://www.imdb.com/title/'+this.props.results.imdbID}  target="_blank" className="btn btn-primary">Checkout On IMDB </a>
                          <AddMovieToDB  movie_title={this.props.results.Title}/>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

    );
},

onClick : function(data){

alert(data);

$.ajax({

url :'addingMovieToDB',
type : 'post',
data: 'name='+data,
success: function(returnedData)
{
console.log("Success");
}

});

}

});

var AddMovieToDB = React.createClass({

add:function(e){
  alert(this.props.movie_title);
  //e.preventDefault();
  $.ajax({
      url:'/addingMovieToDB',
      data:"name="+this.props.movie_title,
      type:'post',
      dataType: 'json',
      cache: false,
      success: function(dataReturned) {
      console.log("Succes adding");
        }
      });
},

render: function (){
 return (
<form onClick={this.add}>
<button className="btn btn-success" type="button" value={this.props.movie_title} name="movie_title">Add Movies to Data-Base</button>
</form>
);
}
});


var RenderViewMovieDetails = React.createClass({

    getInitialState : function(){
      return {
        results : []
      };
    },

    render : function(){
      return(
        <div>
        <form>

        <input type="button" className="btn btn-danger" value="Delete" onClick={this.selectchecked} />
        <DisplayFetchedMovies fetchedResults={this.state.results}/>

        </form>
        </div>
      )
    },

  selectchecked :function(){
    var checkedValues = $('input:checkbox:checked').map(function() {
       return $(this).val();
     });
    $.ajax({
      url: '/deleteSelectedMovie',
      type: 'post',
      data : 'movieDeleteObj='+checkedValues.toArray(),
      success:function(data)
      {
          $('#box').prop('checked', false);
      }
        })

    },

    fetchMovie : function(){
      console.log("In the fetch movie form db function");
      $.ajax({
        url: '/getMovieFromDb',
        type: 'get',
        success:function(data){
          console.log("before settng state" +data.length);
          this.setState({results:data});
            }.bind(this)
      });
    },

    componentDidMount : function(){
      this.fetchMovie();
      setInterval(this.fetchMovie , 1000);
    }
  });


var DisplayFetchedMovies = React.createClass({

  render: function(){
    return (
                <div>
                {
                this.props.fetchedResults.map(function(data){
                return(
                <div className="jumbotron well">
                  <div className ="container-fluid">
                      <div className ="col-md-12">
                        <div className="row">
                          <div className ="col-md-3">
                            <img className="img-circle" src={data.Poster} alt={data.Title} height="444px" width="300px"/>
                          </div>
                          <div className ="col-md-9" id="details">
                             <input className="form-control" type="text" value={data.Title} />
                             <input className="form-control" type="text" value={data.Year} />
                             <input className="form-control" type="text" value={data.Actors}/>
                             <input className="form-control" type="text" value={data.Director}/>
                             <input className="form-control" type="text" value={data.Plot}/>
                             <input className="form-control" type="text" value={data.Released}/>
                             <p >
                             <small><h3>
                              <span className="glyphicon glyphicon-calendar"></span>
                              <span id="Released"> {data.Released}</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                                <b>Ratings : <span id="imdbRating">{data.imdbRating}</span></b>
                                &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                                <b>Awards : </b><span id="Awards">{data.Awards}</span></h3></small>
                            </p>



                              <input type="checkbox" name={data._id} value={data._id} id="box"/>Check to delete

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            </div>
);
}
});


var Register = React.createClass({

  getInitialState : function(){
    return {
      userCredentials : {},
      text: ''

    };
  },

  registerUser: function(){
    $.ajax({
      url: '/users/register',
      type:'post',
      data:$('#userCredentials').serialize(),
      success: function(data){
        console.log(data);
      }

    });
  },

  render: function(){
    return(
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
    );
  }

});


var UserLogin = React.createClass({

  getInitialState: function(){
     return {
       userLogin: {},
       text : ''
     }
   },

loginUser :function(){
$.ajax({

  url:'/users/login',
  type:'post',
  data:$('#userLogin').serialize(),
  success: function(data){
    console.log(data);
    this.setState({
      userLogin : data,
      text: 'Successfully logged in'
    });
  }.bind(this)

});
},

  render: function(){
      return(
        <div>
            {this.state.userLogin != 'Successfully authenticated'?
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
              </div>:<div><p> Hey there User!{this.state.text}</p></div>}
			  </div>

  );
  }
});

var history = ReactRouter.browserHistory;
ReactDOM.render(
  (
    <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
    <Route path= "/home" component={Home} />
    <Route path="/search" component={SearchMovie} />
    <Route path='/viewMovie' component={RenderViewMovieDetails}/>
    <Route path='/register' component={Register} />
    <Route path='/login' component={UserLogin} />
    </Route>
  </Router>
),document.getElementById('content'));
