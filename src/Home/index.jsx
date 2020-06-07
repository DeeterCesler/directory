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
                  <option value="Finance">Finance</option>
                  <option value="Office">Office</option>
                  <option value="Media">Media</option>
                  <option value="Salon">Salon, Barber</option>
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
                    <td>Name</td>
                    {/* <td>Type</td> */}
                    <td>Address</td>
                    <td>Zip</td>
                    <td>Description</td>
                    <td>Website</td>
                    <td>Phone #</td>
                  </tr>
                  {
                  props.results.length === 0 
                  &&
                  <p>No results found.</p>
                  }
                  {props.results.map(result => {
                    let website;
                    if(result.website && result.website.substring(0,4) === "http") website = result.website;
                    else if (result.website) website = "http://" + result.website;
                    return <tr className="row result" key={result._id}>
                      <td>{result.name}</td>
                      {/* <td>{result.type}</td> */}
                      <td>{result.address}</td>
                      <td>{result.zip}</td>
                      <td>{result.description}</td>
                      <td><a rel="noopener noreferrer" target="_blank" href={website}>{result.website}</a></td>
                      <td>{result.phoneNumber}</td>
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