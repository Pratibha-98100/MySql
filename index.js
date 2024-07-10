const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();

const salt =10;

const app = express();


require('dotenv').config();
const OAuthClient = require('intuit-oauth');


app.use(express.json());
app.use(cors({
    origin :["http://localhost:3000"],
    methods :["POST", "GET"],
    credentials:true
}));

app.use(cookieParser());



// building a mysql connection
const db= mysql.createConnection({
    host:"localhost",
    port:3306,
    database:"company",
    user:"root",
    password:"Pratibha@1"
})















// ---------------for token------------------
const verifyUser = (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json({Error :" You are not authenticated"})
    }
    else{
        jwt.verify(token, "jwt-secret-key" , (err, decoded)=>{
            if(err){
                return res.json({Error : "Problem with token"})
            }
            else{
                req.name = decoded.name;
                next();
            }
        })
    }
}



app.get("/", verifyUser, (req, res) =>{
    return res.json({Status :"Sucusseful", name : req.name})
})










app.post("/signup", (req, res) =>{

 console.log("hello"+ " " +req.body.name)

    const sql= "INSERT INTO person (`name`, `email`,`password` ) VALUES (?)";

  // ----------hasing password----------------
    bcrypt.hash(req.body.password.toString(), salt,(err, hash)=>{
        if(err) {
            return res.json({Error:"Error in hassing password"})
        }

        const values =[
            req.body.name,
            req.body.email,
            hash
    
        ]
    
        db.query(sql, [values], (err, result) =>{                                                                                                        // -------------passing the sql anf the values----------
            if(err){
                console.log(err)
                return res.json({Error :"Inserting data error in server"});
            }
    
            return res.json({Status :"Sucusseful"})
        })
    })
    

})




app.post("/login", (req, res) =>{
   
    const sql = 'SELECT  * FROM  person  WHERE email = ?';
    db.query(sql , [req.body.email], (err, data) =>{
        console.log(req.body.email)
        console.log(req.body)
        console.log(req)
        if(err){
            return res.json({Error : "Login error in the server"});
        }
        if(data.length >0){
            bcrypt.compare(req.body.password.toString(), data[0].password,(err, response)=>{
                if(err) {
                    return res.json({Error:"Error in comparing password"})
                }
                if(response){
                    const name = data[0].name
                    const token = jwt.sign({name}, "jwt-secret-key",{ expiresIn :"30d"})
                    res.cookie("token", token);
                    return res.json({Status :"Sucusseful"})
                }
                else{
                    return res.json({Error :"Password not matching"})
                }

            })
       }
       else{
        return res.json({Error:"No email exist "})
       }
    }) 
})




app.get("/logout",( req, res)=>{
    res.clearCookie("token");
        return res.json({Status :"Sucusseful"}) 
})









// -------------------------------------------quickbook------------------------------------



// Configure the OAuthClient with credentials and environment
const oauthClient = new OAuthClient({
    clientId: process.env.CLIENT_ID, // QuickBooks OAuth2 Client ID
    clientSecret: process.env.CLIENT_SECRET, // QuickBooks OAuth2 Client Secret
    environment: process.env.ENVIRONMENT, // 'sandbox' or 'production'
    redirectUri: process.env.REDIRECT_URL // Redirect URI for OAuth callbacks
});




// Route to initiate the OAuth flow
app.get('/auth', (req, res) => {
    // Generate the authorization URL for QuickBooks
    const authUri = oauthClient.authorizeUri({
        scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
        state: '5banyuniquestringb' // State to protect against CSRF attacks
    });
    // Redirect user to the QuickBooks authorization page
    // res.redirect(authUri);
    res.json({ url: authUri });
});


// Callback route for handling the response from QuickBooks
app.get('/callback', async (req, res) => {
    const parseRedirect = req.url;

    try {
        // Create an OAuth token using the callback URL
        const authResponse = await oauthClient.createToken(parseRedirect);
        console.log(authResponse)
        // Redirect to the accounts route after successful authentication
        res.redirect('/accounts');
        // res.json(authResponse.getJson()); // Send the token to the fronten
    } catch (e) {
        console.error('Error', e);
    }
});




// Route to fetch accounts data from QuickBooks
app.get('/accounts', async (req, res) => {
    try {
        // Make an API call to QuickBooks to fetch accounts
        const response = await oauthClient.makeApiCall({
            url: 'https://sandbox-quickbooks.api.intuit.com/v3/company/9341452593722214/query?query=Select * from Account STARTPOSITION 1 MAXRESULTS 5&minorversion=70',
            // https://sandbox-quickbooks.api.intuit.com/v3/company/9341452593722214/query?query=select * from Payment&minorversion=70
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
     // Send the fetched data as JSON response
        // res.json(JSON.parse(response.body));

        if (typeof response.body === 'string') {
            res.json(JSON.parse(response.body));
        } else {
            res.json(response.body);
        }
        
    } catch (e) {
        console.error(e);
    }
});











app.listen(9000, ()=>{
    
    console.log("listening and running")
})