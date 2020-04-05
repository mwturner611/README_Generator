// retuired packages to make axios call with dotenv token
const env = require("dotenv").config({path: '../.env'});
const axios = require('axios');

// api call to github with the username and referencing token file
const api = {
  getUser(username){
    axios
    .get(`https://api.github.com/users/${username}`, {
      headers: {"Authorization": `token ${process.env.GH_TOKEN}`}})
    .then(response => 
          {
        console.log(response.data.avatar_url);
        console.log(response.data.url);
        console.log(response.data.email)
      })
    .catch(error => console.log(error))
  }
};


module.exports = api;

api.getUser("mwturner611");

// how to get avatar = response.data.avatar_url
 