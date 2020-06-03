import React from 'react';

const NewBiz = (props) => {   
    return (
      <div>
        <h1>new biz</h1>
        <form onSubmit={props.submitNewBiz}>
          <br/>
          <input className="box" placeholder="business name" onChange={props.handleInputs} name="name" type="text"></input>
          <br/>
          <br/>
          <select className="box" name="type" onChange={props.handleInputs}>
            <option></option>
            <option value="restaurant">Restaurant</option>
            <option value="office">Office</option>
            <option value="media">Media</option>
          </select>
          <br/>
          <br/>
          <input className="box" placeholder="zip" onChange={props.handleInputs} name="zip" type="number"></input>
          <br/>
          <br/>
          <div className="row">
              <div className="col-md">
                <input type="submit" className="submit-box" />
              </div>
            </div>
        </form>
      </div>
    );
}


export default NewBiz;