import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import NewBiz from './NewBiz';
import Home from './Home';
import GetSheetDone from 'get-sheet-done';

const backendUrl = process.env.REACT_APP_BACKEND_SERVER_ADDRESS;

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      name: '',
      type: null,
      zip: null,
      address: null,
      phoneNumber: null,
      website: null,
      description: null,
      results: null,
      isLoading: false,
      sheetData: null,
    }
  }

  componentDidMount = async () => {
    console.log('loading...');
    this.setState({
      isLoading: true
    });
    try {
      GetSheetDone.raw('1jskVNrchKrYaicG7y792k7A9XkFhkfOey-KOg7b-9TU').then(sheet => {
          console.log('results got!');
          console.log(sheet);
          sheet.data.shift();
          this.setState({
            sheetData: sheet.data,
            results: sheet.data,
            isLoading: false,
          })
      }).then(k => {
        console.log('oi??/');
        console.log(this.state.sheetData);
      })

        // gapi.client.sheets.spreadsheets.values.get({
        //   spreadsheetId: '1jskVNrchKrYaicG7y792k7A9XkFhkfOey',
        //   range: 'A2:A4'
        // }).then((response) => {
        //   var result = response.result;
        //   var numRows = result.values ? result.values.length : 0;
        //   console.log(`${numRows} rows retrieved.`);
        // });  
    } catch (e) {
      console.log('error: ');
      console.log(e);
    }

    // ping heroku server to wake up it as soon as someone accesses the site
    try {
      const req = await fetch(backendUrl + "ping", {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': "GET",
          'credentials': 'same-origin',
        },
      });
      const res = await req.json();
      console.log('PINGED!');
      console.log(res.message);
    } catch (e) {console.log('error: ' + e);}
  }

  newBiz = () => {
    return <NewBiz handleInputs={this.handleInputs} submitNewBiz={this.submitNewBiz} />
  }

  home = () => {
    return <Home handleInputs={this.handleInputs} searchForBusiness={this.searchForBusiness} results={this.state.results} isLoading={this.state.isLoading} errorOnSearch={this.state.errorOnSearch} />
  }

  handleInputs = async (e) => {
    await this.setState({
      ...this.state,
      [e.currentTarget.name]: e.currentTarget.value
    });

    let foundBizzies = null;
    if (this.state.name) {
      foundBizzies = await this.state.sheetData.filter(biz => biz[0].match(new RegExp(this.state.name + '.*?', 'i')))
      if (foundBizzies.length && this.state.zip){
        foundBizzies = foundBizzies.filter(biz => biz[2].match(new RegExp(this.state.zip + '.*?', 'i')))
      }
      if (foundBizzies.length && this.state.type){
        foundBizzies = foundBizzies.filter(biz => biz[3].toLowerCase() === this.state.type.toLowerCase())
      }
    } else if (this.state.type) {
      foundBizzies = this.state.sheetData.filter(biz => biz[3].toLowerCase() === this.state.type.toLowerCase())
      if (foundBizzies.length && this.state.name){
        foundBizzies = await this.state.sheetData.filter(biz => biz[0].match(new RegExp(this.state.name + '.*?', 'i')))
      }
      if (foundBizzies.length && this.state.zip){
        foundBizzies = foundBizzies.filter(biz => biz[2].match(new RegExp(this.state.zip + '.*?', 'i')))
      }
    } else if (this.state.zip) {
      foundBizzies = this.state.sheetData.filter(biz => biz[2].match(new RegExp(this.state.zip + '.*?', 'i')))
      if (foundBizzies.length && this.state.type){
        foundBizzies = foundBizzies.filter(biz => biz[3].toLowerCase() === this.state.type.toLowerCase())
      }
      if (foundBizzies.length && this.state.name){
        foundBizzies = await this.state.sheetData.filter(biz => biz[0].match(new RegExp(this.state.name + '.*?', 'i')))
      }
    } else {
      foundBizzies = await this.state.sheetData;
    }

    await this.setState({
      ...this.state,
      results: foundBizzies,
    })

    console.log(this.state)
  }

  searchForBusiness = async (e) => {

  }


  /*
  searchForBusiness = async (e) => {
    e.preventDefault();
    console.log('backendUrl')
    console.log(backendUrl + "search")
    this.setState({
      ...this.state,
      isLoading: true,
    })
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
        isLoading: false,
      })
    } catch (e) {
      console.log('error: ' + e);
      this.setState({
        ...this.state,
        isLoading: false,
        errorOnSearch: true,
      })
    }
  }
  */

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
          address: this.state.address,
          phoneNumber: this.state.phoneNumber,
          website: this.state.website,
          description: this.state.description,
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
