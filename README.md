[![Build Status](https://travis-ci.com/Jesse-efe/Politico.svg?branch=develop)](https://travis-ci.com/Jesse-efe/Politico)
[![Coverage Status](https://coveralls.io/repos/github/Jesse-efe/Politico/badge.svg?branch=ft-cant-create-duplicates-of-same-entity-163574839)](https://coveralls.io/github/Jesse-efe/Politico?branch=ft-cant-create-duplicates-of-same-entity-163574839)
[![Maintainability](https://api.codeclimate.com/v1/badges/384a8468321896f6ca64/maintainability)](https://codeclimate.com/github/Jesse-efe/Politico/maintainability)

# Politico

This is an electronic voting system that enables citizens give their mandate to politicians running for different government offices
while building trust in the process through transparency.

## Features
   - Users can sign up.
   - Users can login.
   - Admin (electoral body) can create political parties.
   - Admin (electoral body) can delete a political party.
   - Admin (electoral body) can create different political offices .
   - Users can vote for only one politician per political office .
   - Users can see the results of election.
   
## Getting Started
   - Pull this repository and cd into it
   - Run npm install to install all dependencies
   - Follow the steps under "Installing" below
   - Use Postman to visit any of the routes listed below
   
### Prerequisites
   - Ensure you have NodeJs installed
   - Ensure You have PostgreSQL installed or have access to a cloud instance
   
### Installing
   - Change the name of the sample.env file in project root to .env
   - Change the value of the testConnectionString variable to your test database connection string
   - Change the value of the devConnectionString variable to your development database connection string
   - Change the value of the testConnectionString variable to your test database connection string
   - run npm run createTables
   - run npm start
   
## Running the tests
   - Run npm test to run test

### Break down into end to end tests
   The various test for the app tests that the really performs its function and and handles bad user input appropriately
   
### And coding style tests
   This project uses ESLint and extends the airbnb style guide. Run npm run lint to test code style
   
## Pivotal Tracker Page
   https://www.pivotaltracker.com/n/projects/2239011

## Heroku API Link
   https://politico-jes.herokuapp.com/api/v1
   
## Github Pages Link
   https://jesse-efe.github.io/Politico/UI/
   
# API Routes
   - Create a political party (admin)
   
      ```
      POST /parties
      ```
   - Get all political parties
   
      ```
      GET /parties
      ```
   - Get a specific political party
   
      ```
      GET /parties/<partyId>
      ```
   - Edit a specific political party
   
      ```
      PATCH /parties/<partyId>/name
      ```
   - Delete a specific political party
   
      ```
      DELETE /parties/<partyId>
      ```
   -  Create a political office (admin)
   
      ```
      POST /offices
      ```
   -  Get all political offices
   
      ```
      GET /offices
      ```
   -  Get one political office
   
      ```
      GET /offices/<officeID>
      ```
      
## Built With
   - Javascript
   - Node.js
   - Express
   - ESLint
   - Babel
   - PostgreSQL
   - Mocha/Chai
   - HTML
   - CSS

## Version
   - This is version 1 of this App
   
## Author
   - Jesse Omoefe

## Acknowledgments
   - Andela
   - Akinwale Habibullah
   - Innocent Ngene
   

    

      
      
