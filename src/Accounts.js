// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "./style.css"

// const Accounts = () => {
//   const [accounts, setAccounts] = useState([]);

//   axios.defaults.withCredentials = true;

//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const response = await fetch('http://localhost:9000/accounts', {
//           method: 'GET',
//           credentials: 'include', // Include credentials for CORS
//         });
//         const data = await response.json();
//         setAccounts(data.QueryResponse.Account);
//       } catch (error) {
//         console.error('Error fetching accounts:', error);
//       }
//     };

//     fetchAccounts();
//   }, []);

//   return (
//     <div className="accounts-container">
//             <h1>Accounts</h1>
//             <table className="accounts-table">
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Type</th>
//                         <th>SubType</th>
//                         <th>Balance</th>
//                         <th>Currency</th>
//                         <th>Created Time</th>
//                         <th>Last Updated Time</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {accounts.map(account => (
//                         <tr key={account.Id}>
//                             <td>{account.Name}</td>
//                             <td>{account.AccountType}</td>
//                             <td>{account.AccountSubType}</td>
//                             <td>{account.CurrentBalance}</td>
//                             <td>{account.CurrencyRef.name}</td>
//                             <td>{account.MetaData.CreateTime}</td>
//                             <td>{account.MetaData.LastUpdatedTime}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//   );
// };

// export default Accounts;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./style.css"

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
          const response = await fetch('http://localhost:9000/accounts', {
              method: 'GET',
              credentials: 'include', // Include credentials for CORS
          });
          const data = await response.json();
          setAccounts(data.QueryResponse.Account);
      } catch (error) {
          console.error('Error fetching accounts:', error);
      }
  };
  

    fetchAccounts();
  }, []);

  return (
    <div className="accounts-container">
      <h1>Accounts</h1>
      <table className="accounts-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>SubType</th>
            <th>Balance</th>
            <th>Currency</th>
            <th>Created Time</th>
            <th>Last Updated Time</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr key={account.Id}>
              <td>{account.Name}</td>
              <td>{account.AccountType}</td>
              <td>{account.AccountSubType}</td>
              <td>{account.CurrentBalance}</td>
              <td>{account.CurrencyRef.name}</td>
              <td>{account.MetaData.CreateTime}</td>
              <td>{account.MetaData.LastUpdatedTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Accounts;
