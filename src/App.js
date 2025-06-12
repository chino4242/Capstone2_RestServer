import React, {useState, useEffect } from 'react';
import {getAll, post, put, deleteById } from '../src/ProjectAssets/memdb';
import CustomerList from '../src/components/CustomerList'
import CustomerAddUpdateForm from '../src/components/CustomerAddUpdateForm';
import "./App.css";

function log(message){console.log(message);}

export function App(params) {
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState (blankCustomer);

  let mode = (formObject.id >= 0) ? 'Update' : 'Add';
  useEffect(() => { getCustomers() }, []);
  const [selectedId, setSelectedId] = useState(null);

  const getCustomers =  function(){
    log("in getCustomers()");
    setCustomers(getAll);
  }

  const handleListClick = function(item){
    log("in handleListClick()");
    if (item.id === formObject.id) {
      setFormObject(blankCustomer);
    } else {
    setFormObject(item);
    }
  }  

  const handleInputChange = function (event) {
    log("in handleInputChange()");
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = {...formObject}
    newFormObject[name] = value;
    setFormObject(newFormObject);

  }

  let onCancelClick = function () {
    log("in onCancelClick()");
    setFormObject(blankCustomer);
  }

  let onDeleteClick = function () {
    log("in onDeleteClick()");
    if(formObject.id >= 0) {
      deleteById(formObject.id);
    }
    setFormObject(blankCustomer);
  }

  let onSaveClick = function () {
    log("in onSaveClick()");
    if (mode === 'Add') {
      post(formObject);
    }
    if (mode === 'Update') {
      put(formObject.id, formObject);
    }
    setFormObject(blankCustomer);
  }

  return (
    <div>
    <CustomerList
    customers= {customers}
    selectedCustomerId = {formObject.id}
    handleListClick={handleListClick}
    />
    
    <CustomerAddUpdateForm
      formObject = {formObject}
      mode = {mode}
      handleInputChange={handleInputChange}
      onDeleteClick = {onDeleteClick}
      onSaveClick = {onSaveClick}
      onCancelClick = {onCancelClick
      }
/>
</div>
  );
}

export default App;
