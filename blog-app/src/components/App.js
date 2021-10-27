import '../stylesheets/App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Signin from './Signin';
import SignUp from './SignUp';
import SingleArticle from './SingleArticle';
import NoMatch from './NoMatch';
import React from 'react';
import { BaseUrl, localStorageKey } from './utils/constant';
import Loader from './Loader';
import NewArticle from './NewArticle';
import Settings from './Settings';
import Profile from './Profile';
import OthersProfile from './OthersProfile';
import UpdateArticle from './UpdateArticle';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged : false,
      user : null,
      isVerified : true,
      updateProfile : null
    }
  }

  
  onUpdateProfile = (profile) => {
    this.setState({
      updateProfile : profile,
    })
  }

  logout = () => {
    this.setState({
      isLogged : false,
      user : null,
      isVerified : false
    })
    localStorage.clear();
  }


  updateUser = (loggedUser) => {
    this.setState({
      isLogged : true,
      user : loggedUser,
      isVerified : false
    })
    localStorage.getItem(localStorageKey, loggedUser.token)
  }

  componentDidMount() {
    let url = BaseUrl + "user";
    let key = localStorage[localStorageKey];
    if(key) {
      fetch(url, {
        method : "GET",
        headers : {authorization : `Token ${key}`},
      })
      .then(res => {
        if(res.ok) {
          return res.json()
        }
        return res.json().then(({errors}) => {
          return Promise.reject(errors)
        })
      })
      .then((user) => {
        this.updateUser(user)
      })
      .catch(err => console.log(err))
    } else {
      this.setState({
        isVerified : false
      })
    }
  }

 render() {
   if(this.state.isVerified) {
     return  <Loader />
    //  <img className="gif" src="/images/login2.gif" alt="login Gif" />
   }
  //  let user = this.state.user.user
  //  console.log(user.username)
  return (
    <>
    <Header {...this.state}  logout={this.logout} />
      {
        this.state.isLogged ? <Authenticated {...this.state} onUpdateProfile = {this.onUpdateProfile} updateUser={this.updateUser} logout = {this.logout} /> : <UnAuthenticated {...this.state} onUpdateProfile = {this.onUpdateProfile} updateUser={this.updateUser} />
      }
    
    </>
  );
 }
}

function UnAuthenticated(props) {
  // let user = props.user.user
  // console.log(user)
  return (
    <>
   <Switch>
     <Route path='/' exact >
       <Home />
     </Route>
     <Route path="/signin" exact >
         <Signin updateUser={props.updateUser} />
     </Route>
     <Route path="/signup" exact >
         <SignUp updateUser={props.updateUser} />
     </Route>
     <Route path="/article/:slug" component={SingleArticle} exact/>

     {/* <Route path="/profiles/:username">
        <OthersProfile {...props} user={user}   />
      </Route> */}

     <Route path="*">
       <NoMatch />
     </Route>
   </Switch>
    </>
  )
}

function Authenticated(props) {
  let user = props.user.user
  // console.log(props.user)
  return (
    <>
   <Switch>
     <Route path='/' exact >
       <Home />
     </Route>
     <Route path='/new-article' exact >
       <NewArticle />
     </Route>
     <Route path='/profile' exact >
       <Profile {...props} user = {user}  />
     </Route>
     <Route path='/settings' exact  >
       <Settings updateUser={props.updateUser} onUpdateProfile = {props.onUpdateProfile}/>
     </Route>
     <Route exact path="/article/:slug/update">
       <UpdateArticle {...props} />
     </Route>

     {/* <Route path="/article/:slug" component={SingleArticle} exact/> */}
     <Route path="/article/:slug" exact>
       <SingleArticle  user={user} />
     </Route>

     <Route path="/profiles/:username">
        <OthersProfile {...props} user={user} />
      </Route>

     <Route path="*">
       <NoMatch />
     </Route>
   </Switch>
    </>
  )
}



export default App;
