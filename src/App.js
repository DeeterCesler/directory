import React from 'react';
import './App.css';
import { Button } from 'reactstrap';

const names = ['James', 'John', 'Paul', 'Ringo', 'George'];

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      name: '',
      type: null,
      zip: null,
      results: [
        {
          name: "Restaurant 1",
          zip: 45202,
          type: "restaurant",
        },
        {
          name: "Restaurant 2",
          zip: 45202,
          type: "restaurant",
        },
        {
          name: "Office 3",
          zip: 60007,
          type: "office",
        },
        {
          name: "Office 4",
          zip: 60007,
          type: "office",
        },
        {
          name: "Media 5",
          zip: 80234,
          type: "media",
        },
        {
          name: "Media 6",
          zip: 80234,
          type: "media",
        },
      ],
      filteredResults: [],
    }
  }

  handleInputs = async (e) => {
    await this.setState({
      ...this.state,
      [e.currentTarget.name]: e.currentTarget.value
    })
    console.log(this.state)
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
        <h1>the directory</h1>
        <div className="container">
          <br/>
          <div className="row">
            <div className="col">
              <p>Name</p>
              <input className="box" placeholder="business name" onChange={this.handleInputs} name="name" type="text"></input>
            </div>
            <div className="col">
              <p>Business Type</p>
              <select className="box" name="type" onChange={this.handleInputs}>
                <option></option>
                <option value="restaurant">Restaurant</option>
                <option value="office">Office</option>
                <option value="media">Media</option>
              </select>
            </div>
            <div className="col">
              <p>Zip code</p>
              <input className="box" placeholder="zip" onChange={this.handleInputs} name="zip" type="number"></input>
            </div>
          </div>
          <br/>
          <br/>
          {/* if ANY input is done, a filter will execute
            if the input is name, it's the name one
            if it's type, it's the type one
            if it's zip, it's the zip one

            if it's multiple, it'll stack
          */}
          { this.state.name !== '' ? 
            this.state.results.filter(result => result.name.match(new RegExp(this.state.name +'.*?', 'i'))).map(biz => 
              // this.setState({
              //   ...this.state,
              // filteredResults: [...biz],
              // })
              (
              <div>
                {biz.name}
              </div>
            ))
          :
          null
          }
          { this.state.type !== '' ? 
            this.state.results.filter(result => result.type.match(new RegExp(this.state.type +'.*?', 'i'))).map(biz => (
              <div>
                {biz.name}
              </div>
            ))
          :
          null
          }
          { this.state.zip !== null ? 
            this.state.results.filter(result => result.zip.toString().match(new RegExp(this.state.zip +'.*?'))).map(biz => (
              <div>
                {biz.name}
              </div>
            ))
          :
          null
          }
          {/* <div className="box" onClick={this.clearResults}>
            clear
          </div> */}
          <div className="results">
            {/* { this.state.name !== null ? 
              <div> {this.state.results.filter(result => {
                result.name.match(new RegExp(this.state.name.toString() +'.*')).map(foundBiz => (
                  <div>
                    {foundBiz.name}
                  </div>
                ));
              })}
              </div>
              :
              null
            } */}
  
          </div>
        
        </div>
      </div>
    );
  }
}

export default App;
