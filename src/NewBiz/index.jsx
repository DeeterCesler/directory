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
            <option value="Restaurant">Restaurant</option>
            <option value="Finance">Finance</option>
            <option value="Office">Office</option>
            <option value="Media">Media</option>
            <option value="Salon">Salon, Barber</option>
            <option value="Other">Other</option>
          </select>
          <br/>
          <br/>
          <input className="box" placeholder="zip" onChange={props.handleInputs} name="zip" type="number"></input>
          <br/>
          <br/>
          <input className="box" placeholder="phone #" onChange={props.handleInputs} name="phoneNumber" type="text"></input>
          <br/>
          <br/>
          <input className="box" placeholder="address" onChange={props.handleInputs} name="address" type="text"></input>
          <br/>
          <br/>
          <input className="box" placeholder="website" onChange={props.handleInputs} name="website" type="text"></input>
          <br/>
          <br/>
          <textarea className="box description" maxLength="200" placeholder="description (keep it as short as possible)" onChange={props.handleInputs} name="description" type="text"></textarea>
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