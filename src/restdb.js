export const TEST_VARIABLE = "If you see this message, the import is working"
const baseURL = 'http://localhost:4000/customers';

const items = [
    {
      "id": 0,
      "name": "Mike Johnsons",
      "email": "mikej@abc.com",
      "password": "mikej"
    },
    {
      "name": "Cindy Smiths",
      "email": "cinds@abc.com",
      "password": "cinds",
      "id": 1
    },
    {
      "name": "Julio Martins",
      "email": "julim@abc.com",
      "password": "julim",
      "id": 2
    },
       {
      "name": "Justin Jefferson",
      "email": "JJ@abc.com",
      "password": "JJettas",
      "id": 3
    }
  ]


export async function getAll(setCustomers){
    const myInit = {
      method: 'GET',
      mode: 'cors' };
    const fetchData = async (url) => {
      try {
        const response = await fetch(url, myInit);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        alert(error);
      }
    }
    fetchData(baseURL);
}

export async function deleteById(id, setCustomers) {
  // Validate parameters
  if (typeof id !== 'number' || id < 0) {
    console.error("Invalid ID provided to deleteById:", id);
    return;
  }
  
  if (typeof setCustomers !== 'function') {
    console.error("setCustomers is not a function in deleteById");
    alert("Internal error: setCustomers is not a function");
    return;
  }
  
  const deleteURL = `${baseURL}/${id}`;
  const myInit = {
    method: 'DELETE',
    mode: 'cors'
  };
  
  try {
    const response = await fetch(deleteURL, myInit);
    
    if (!response.ok) {
      throw new Error(`Error deleting data: ${response.status}`);
    }
    
    // After successful deletion, get the updated list
    const fetchAllInit = {
      method: 'GET',
      mode: 'cors'
    };
    
    const getAllResponse = await fetch(baseURL, fetchAllInit);
    
    if (!getAllResponse.ok) {
      throw new Error(`Error fetching updated data: ${getAllResponse.status}`);
    }
    
    const updatedData = await getAllResponse.json();
    
    // Update the state with new data
    setCustomers(updatedData);
    return true;
  } catch (error) {
    console.error("Error in deleteById:", error);
    alert(error.message);
    return false;
  }
}



export async function post(item, setCustomers) {
  console.log("Starting post function with item:", item);
  
  // Create a copy to avoid modifying the original
  const itemToPost = {...item};
  
  // Remove any existing ID to let the server assign one
  delete itemToPost.id;
  
  const myInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemToPost)
  };
  
  console.log("About to fetch with:", myInit);
  
  try {
    // Make the POST request
    const response = await fetch(baseURL, myInit);
    console.log("POST response:", response);
    
    if (!response.ok) {
      throw new Error(`Error posting data: ${response.status}`);
    }
    
    // After successful POST, get the updated list
    const getAllResponse = await fetch(baseURL);
    console.log("GET response after POST:", getAllResponse);
    
    if (!getAllResponse.ok) {
      throw new Error(`Error fetching updated data: ${getAllResponse.status}`);
    }
    
    const updatedData = await getAllResponse.json();
    console.log("Updated customer list:", updatedData);
    
    // Update the state with the new data
    setCustomers(updatedData);
    
    console.log("Customer state updated successfully");
    return true;
  } catch (error) {
    console.error("Error in post function:", error);
    alert(error.message);
    return false;
  }
}



export async function put(id, customer, setCustomers) {
    if (typeof setCustomers !== 'function') {
    console.error("setCustomers is not a function in put");
    alert("Internal error: setCustomers is not a function");
    return;
  }
  const putURL = `${baseURL}/${id}`;
  const myInit = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customer)
  };
  
  const updateData = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error updating data: ${response.status}`);
      }
      
      // After successful update, get the updated list
      const fetchAllInit = {
        method: 'GET',
        mode: 'cors'
      };
      const getAllResponse = await fetch(baseURL, fetchAllInit);
      if (!getAllResponse.ok) {
        throw new Error(`Error fetching updated data: ${getAllResponse.status}`);
      }
      const updatedData = await getAllResponse.json();
      setCustomers(updatedData);
    } catch (error) {
      alert(error);
    }
  }
  
  updateData(putURL);
}

function getArrayIndexForId(id){
  for( let i = 0; i < items.length; i++){
    if(items[i].id === id){
      return i;
    }
  }
  return -1;  
}


function getNextId(){
  let maxid = 0;
  for( let item of items){
    maxid = (item.id > maxid)?item.id:maxid;
  }  
  return maxid + 1;
}
