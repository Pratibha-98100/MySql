// // src/components/QuickBooksAuth.js
// import React from 'react';
// import axios from 'axios';

// const QuickBooksAuth = () => {

//     axios.defaults.withCredentials = true;

//     const handleButtonClick = () => {
//         // Make a request to the backend to initiate the OAuth flow
//         axios.get('http://localhost:9000/auth')
//             .then(res => {

//                 console.log(res)
//                 console.log(res.data)
//                 // The res is expected to be a redirect
//                 if (res.status === 200) {
//                     window.location.href = res.data.url; // Redirect to QuickBooks authorization URL
//                 } else {
//                     console.error('Error during OAuth flow:', res.statusText);
//                 }
//             })
//             .catch(error => console.error('Error during OAuth flow:', error));
//     };
    
//     return (
//         <div>
//             <button onClick={handleButtonClick}>Connect to QuickBooks</button>
//         </div>
//     );
// };

// export default QuickBooksAuth;



import React from 'react';
import axios from 'axios';

const QuickBooksAuth = () => {

    axios.defaults.withCredentials = true;

    const handleButtonClick = () => {
        axios.get('http://localhost:9000/auth')
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    window.location.href = res.data.url; // Redirect to QuickBooks authorization URL
                } else {
                    console.error('Error during OAuth flow:', res.statusText);
                }
            })
            .catch(error => console.error('Error during OAuth flow:', error));
    };
    
    
    return (
        <div>
            <button onClick={handleButtonClick}>Connect to QuickBooks</button>
        </div>
    );
};

export default QuickBooksAuth;
