import React from 'react';

const Home = (props) => {   
    return (
      <div>
        <br/>
        <br/>
        <div className="container-fluid">
          <h1>black business directory</h1>
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
                  <option value="Coffee">Coffee</option>
                  <option value="Bar, Brewery">Bar, Brewery</option>
                  <option value="Media">Media</option>
                  <option value="Ice Cream">Ice Cream</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md">
                <br/>
                <p>Zip code</p>
                <input className="box" placeholder="zip" onChange={props.handleInputs} name="zip" type="number"></input>
              </div>
            </div>
          </form>
          <br/>
          <br/>
          {
            props.isLoading &&
            <p>Searching for results...</p>
          }
          {
            props.errorOnSearch &&
            <p>Something went wrong. Please try searching again.</p>
          }
          { props.results !== null 
            &&
            (<div className="results">
              <table>
                <tbody>
                  <tr className="row bold">
                    <td></td>
                    <td>Name</td>
                    <td>Description</td>
                    <td>Type</td>
                    <td>Website</td>
                  </tr>
                  {
                  props.results.length === 0 
                  &&
                  <div>
                    <br/>
                    <p>No results found.</p>
                  </div>
                  }
                  {props.results.map(result => {
                    let website;
                    if(result[4] && result[4].substring(0,4) === "http") website = result[4];
                    else if (result[4]) website = "http://" + result[4];
                    return <tr className="row result" key={result._id}>
                      <td></td>
                      <td><strong>{result[0]}</strong></td>
                      <td>{result[1]}</td>
                      <td>{result[3]}</td>
                      <td className="website"><a rel="noopener noreferrer" target="_blank" href={website}>{result[4]}</a></td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>)
          }
        </div>
      </div>
    );
}


export default Home;