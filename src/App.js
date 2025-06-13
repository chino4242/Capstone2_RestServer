import React, {useState, useEffect } from 'react';
import {getAll, post, put, deleteById, TEST_VARIABLE} from './restdb';
import CustomerList from '../src/components/CustomerList'
import CustomerAddUpdateForm from '../src/components/CustomerAddUpdateForm';
import "./App.css";
console.log("Test import:", TEST_VARIABLE)
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
    getAll(setCustomers);
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
  console.log("formObject in onDeleteClick:", formObject);
  console.log("Type of setCustomers:", typeof setCustomers);
  
  if (formObject.id >= 0) {
    console.log("Calling deleteById with:", formObject.id);
    deleteById(formObject.id, setCustomers);
  } else {
    console.log("Not deleting: Invalid ID", formObject.id);
  }
  
  setFormObject(blankCustomer);
}


let onSaveClick = function () {
  log("in onSaveClick()");
  
  if (mode === 'Add') {
    post(formObject, setCustomers);
  }
  if (mode === 'Update') {
    put(formObject.id, formObject, setCustomers);
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
