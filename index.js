// bring in inquirer,fs,util
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const env = require("dotenv").config({path: '.env'});
const axios = require('axios');

// Define user prompt function
function promptUser() {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name?"
      },      
      {
        type: "input",
        name: "username",
        message: "What is your GitHub username?"
      },
      {
        type: "input",
        name: "title",
        message: "Title: What is the title of your project?"
      },
      {
        type: "list",
        name: "license",
        message: "License: What license is this project?",
        choices: [
          'MIT License',
          'GNU GPLv3',
          'GNU AGPLv3',
          'Mozilla Public License 2.0'
        ]
      },
      {
        type: "input",
        name: "linkedin",
        message: "LinkedIn: What's your linked in URL?"
      },

      {
        type: "input",
        name: "description",
        message: "Description: Please provide a description of your project"
      },
      {
        type: "list",
        name: "linesInstall",
        message: "Install: Please select the number of lines needed for install instructions",
        choices: [1,2,3,4,5]
      },
      {
        type: "input",
        name: "instal1",
        message: "This is your first line for the install. Start with '1. '"
      },
      {
        type: "input",
        name: "instal2",
        message: "This is your second line for the install. Start with '2. '",
        when: (answers) => answers.linesInstall > 1
      },
      {
        type: "input",
        name: "instal3",
        message: "This is your third line for the install. Start with '3. '",
        when: (answers) => answers.linesInstall > 2
      },
      {
        type: "input",
        name: "instal4",
        message: "This is your fourth line for the install. Start with '4. '",
        when: (answers) => answers.linesInstall > 3
      },
      {
        type: "input",
        name: "instal5",
        message: "This is your fifth line for the install. Start with '5. '",
        when: (answers) => answers.linesInstall > 4
      },
      {
        type: "list",
        name: "linesUsage",
        message: "Usage: Please select the number of lines needed for usage instructions",
        choices: [1,2,3,4,5]
      },
      {
        type: "input",
        name: "usage1",
        message: "This is your first line for the usage. Start with '1. '"
      },
      {
        type: "input",
        name: "usage2",
        message: "This is your second line for the usage. Start with '2. '",
        when: (answers) => answers.linesUsage > 1
      },
      {
        type: "input",
        name: "usage3",
        message: "This is your third line for the usage. Start with '3. '",
        when: (answers) => answers.linesUsage > 2
      },
      {
        type: "input",
        name: "usage4",
        message: "This is your fourth line for the usage. Start with '4. '",
        when: (answers) => answers.linesUsage > 3
      },
      {
        type: "input",
        name: "usage5",
        message: "This is your fifth line for the usage. Start with '5. '",
        when: (answers) => answers.linesUsage > 4
      },
      {
        type: "input",
        name: "credits",
        message: "Credits: please list anyone or materials that made this possible"
      },
      {
        type: "input",
        name: "contributing",
        message: "Contributing: Please leave instructions for those who want to contribute"
      },
      {
        type: "input",
        name: "tests",
        message: "Tests: Please describe any tests for this code"
      },
    ]);
  }

// create the function that generates the readme
  function generateMarkdown(data,data2) {
    const readme = `  
<img alt="License" src="https://img.shields.io/badge/-${data.license}-blue">
    
# ${data.title}
###### Description
<p>${data.description}</p>

# Demo
<img src="images/demo.gif">


## Table of Contents (Optional)
* [Top of Page](#description)
* [Gif](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Contacts](#contacts)

## Installation
${data.instal1}
${data.instal2}
${data.instal3}
${data.instal4}
${data.instal5}

## Usage 
${data.usage1}
${data.usage2}
${data.usage3}
${data.usage4}
${data.usage5}

## Credits
${data.credits}    



## License
This project is licensed under The ${data.license}.

## Contributing
${data.contributing}

## Tests
${data.tests}

## Contacts
<img src="${data2.avatarURL}">

* Name: ${data.name} (${data.username})
* e-mail: ${data2.email}
* [LinkedIn](${data.linkedin})`;
    
    fs.writeFile("README.md",readme, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log("Generated Readme!")
      }
    });
}

// call promptuser function
promptUser()
  .then(function(answers) {
    // call axios call function
    api.getUser(answers);
  })
   .catch(function(err) {
    console.log(err);
  });

// Define getUser function for axios call to github API
const api = {
  getUser(inquirer){
                    axios
                    .get(`https://api.github.com/users/${inquirer.username}`, {
                      headers: {"Authorization": `token ${process.env.GH_TOKEN}`}})
                    .then(response => {
                      const githubInfo = {
                        avatarURL: response.data.avatar_url,
                        githubURL: response.data.url,
                        email: response.data.email,
                      }
                       
                      // send user responses and gethub info to readme generator
                      const readme = generateMarkdown(inquirer,githubInfo);                      
                    })   
                    .catch(error => console.log(error))
  }
};

  
  

 