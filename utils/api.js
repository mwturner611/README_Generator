const env = require("dotenv").config({path: '../.env'});
const axios = require('axios');



const api = {
  getUser(username){
    axios
    .get(`https://api.github.com/users/${username}`, {
      headers: {"Authorization": `token ${process.env.GH_TOKEN}`}})
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
  }
};

// https://developer.github.com/v3/users/#get-a-single-user

module.exports = api;

api.getUser("mwturner611");

// how to get avatar = response.data.avatar_url
 