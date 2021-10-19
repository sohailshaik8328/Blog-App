import '../stylesheets/App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Signin from './Signin';
import SignUp from './SignUp';
import SingleArticle from './SingleArticle';

function App() {
  return (
    <>
      <Header />
   
      <Switch>
        <Route path='/' exact >
          <Home />
        </Route>
        <Route path="/signin" exact >
            <Signin />
        </Route>
        <Route path="/signup" exact >
            <SignUp />
        </Route>
        <Route path="/article/:slug" component={SingleArticle} exact/>
      </Switch>
    
    </>
  );
}

export default App;
