import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import NewBiz from './NewBiz';
import Home from './Home';

const backendUrl = process.env.REACT_APP_BACKEND_SERVER_ADDRESS;

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      name: '',
      type: null,
      zip: null,
      results: null,
    }
  }

  newBiz = () => {
    return <NewBiz handleInputs={this.handleInputs} submitNewBiz={this.submitNewBiz} />
  }

  home = () => {
    return <Home handleInputs={this.handleInputs} searchForBusiness={this.searchForBusiness} results={this.state.results} />
  }

  handleInputs = async (e) => {
    await this.setState({
      ...this.state,
      [e.currentTarget.name]: e.currentTarget.value
    })
    console.log(this.state)
  }

  searchForBusiness = async (e) => {
    e.preventDefault();
    console.log('backendUrl')
    console.log(backendUrl + "search")
    try {
      const req = await fetch(backendUrl + "search", {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': "POST",
          'credentials': 'same-origin',
        },
        body: JSON.stringify({
          name: this.state.name,
          type: this.state.type,
          zip: this.state.zip,
        }),      
      });
      const res = await req.json();
      console.log('res');
      console.log(res);
      this.setState({
        ...this.state,
        results: res.data,
      })
    } catch (e) {console.log('error: ' + e);}
  }

  submitNewBiz = async (e) => {
    e.preventDefault();
    console.log('backendUrl')
    console.log(backendUrl + "new")
    try {
      const req = await fetch(backendUrl + "new", {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': "POST",
          'credentials': 'same-origin',
        },
        body: JSON.stringify({
          name: this.state.name,
          type: this.state.type,
          zip: this.state.zip,
        }),      
      });
      const res = await req.json();
      console.log('res');
      console.log(res);
    } catch (e) {console.log('error: ' + e);}
  }

  clearResults = () => {
    this.setState({
      ...this.state,
      filteredResults: [],
    })
  }

  render () {
    return (
      <div className="App">
        <Switch>
            <Route exact path="/" render={this.home}/>
            <Route exact path="/new" render={this.newBiz}/>
            {/* <Route exact path="/about" render={this.aboutPage}/>
            <Route exact path="/login" render={this.loginPage}/>
            <Route exact path="/logout" render={this.logoutPage}/>
            <Route exact path="/reset" render={this.resetPasswordAttempt}/>
            <Route exact path="/reset/confirm/:id" render={(props) => this.resetPassword(props)}/>
            <Route exact path="/register" render={this.registerPage}/>
            <Route exact path="/plans" render={this.planChoicePage}/>
            <Route exact path="/success/:sessionId" render={this.successPage}/>
            <Route exact path="/routes/new" render={this.newEndpointPage}/>
            <Route exact path="/routes" render={this.allEndpointsPage}/>
            <Route exact path="/help" render={this.helpPage}/>
            <Route exact path="/account" render={this.accountPage}/>
            <Route exact path="/owner" render={this.ownerPage}/>
            <Route render={this.NoMatch} /> */}
          </Switch>
      </div>
    );
  }
}

export default App;
