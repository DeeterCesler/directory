import React from 'react';

const Home = (props) => {   
    return (
      <div>
        <br/>
        <br/>
        <div className="container-fluid">
          <h1>directory</h1>
          <br/>
          <form onSubmit={props.searchForBusiness}>
            <div className="row">
              <div className="col-md">
                <br/>
                <p>Name</p>
                <input className="box" placeholder="business name" onChange={props.handleInputs} name="name" type="text"></input>
              </div>
              <div className="col-md">
                <br/>
                <p>Business Type</p>
                <select className="box" name="type" onChange={props.handleInputs}>
                  <option></option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Office">Office</option>
                  <option value="Media">Media</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md">
                <br/>
                <p>Zip code</p>
                <input className="box" placeholder="zip" onChange={props.handleInputs} name="zip" type="number"></input>
              </div>
            </div>
            <br/>
            <br/>
            <div className="row">
              <div className="col-md">
                <input type="submit" className="submit-box"></input>
              </div>
            </div>
          </form>
          <br/>
          <br/>

          <div className="results">
            <ul>
            { props.results !== null 
              &&
              props.results.map(result => {
                return <li>{result.name}, {result.type}, {result.zip}</li>
              })
            }
            </ul>
          </div>
        </div>
      </div>
    );
}


export default Home;