import React from 'react';

const Home = (props) => {   
    return (
      <div>
        <h1>the directory</h1>
        <div className="container">
          <br/>
          <form onSubmit={props.searchForBusiness}>
            <div className="row">
              <div className="col">
                <p>Name</p>
                <input className="box" placeholder="business name" onChange={props.handleInputs} name="name" type="text"></input>
              </div>
              <div className="col">
                <p>Business Type</p>
                <select className="box" name="type" onChange={props.handleInputs}>
                  <option></option>
                  <option value="restaurant">Restaurant</option>
                  <option value="office">Office</option>
                  <option value="media">Media</option>
                </select>
              </div>
              <div className="col">
                <p>Zip code</p>
                <input className="box" placeholder="zip" onChange={props.handleInputs} name="zip" type="number"></input>
              </div>
            </div>
            <br/>
            <br/>
            <div className="row">
              <div className="col">
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
                return <li>{result.name}</li>
              })
            }
            </ul>
          </div>
        
        </div>      </div>
    );
}


export default Home;