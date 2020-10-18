import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import GetSheetDone from 'get-sheet-done';

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
      });
    } catch (e) {
      console.log('error: ');
      console.log(e);
    }
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

  render () {
    return (
      <div className="App">
        <Switch>
            <Route exact path="/" render={this.home}/>
          </Switch>
      </div>
    );
  }
}

export default App;
