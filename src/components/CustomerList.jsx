import React from "react";

function CustomerList({ customers, selectedCustomerId, handleListClick }) {
  return (
    <div>
      <div className="boxed">
        <h4>Customer List</h4>
        <table id="customer-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Pass</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((item, id) => {
              return (
                <tr
                  key={item.id}
                  className={item.id === selectedCustomerId ? "selected" : ""}
                  onClick={() => handleListClick(item)}
                >
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{"•".repeat(item.password.length)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerList;
