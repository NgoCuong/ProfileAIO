# Heroku-MEAN-Stack-Example

This project is a Mongo, Express, Angular, Node application build on the Heroku platform. With this stack you are able to build a simple application with create/read/update/delete (CRUD) functionality, the basic functions of persistent storage. This functionality allows us to build a rest API server and with Angular, display a single page application.

## View live demo

View sample app on Heroku here: 


### Prerequisities

This application requires Heroku if you want to run it locally.

* [Heroku](https://devcenter.heroku.com/) - View this to get started.


### Installing

Go to the directory and create a heroku project:
```
heroku create <PROJECT-NAME>
```
You also need to provision the database:
```
heroku addons:create mongolab
```
Install npm packages:
```
npm install
```
You also need to setup .env file. (more instructions soon)

## Running the tests

Test documentation here.

## Deployment

Add additional notes about how to deploy this on a live system
Local deployment:
```
sudo mongod
heroku local web
```
Then go to: http://localhost:5000/

Heroku deployment:
```
git push heroku master
```

## Built With

* [Angular](https://v5.angular.io/) - The front-end framework used
* [Mongo](https://docs.mongodb.com/manual/) - Mongo DB database
* [NODE](https://nodejs.org/en/) - JavaScript runtime for server and has a package manager (NPM)  
* [Express](https://expressjs.com/) - Web Framework for Node.js
* [Bootstrap4](https://getbootstrap.com/docs/4.0/getting-started/introduction/) - The front-end framework for designing

Aside from the basic CRUD stack, this app also uses:

## Acknowledgments

Original starter project from [this tutorial](https://devcenter.heroku.com/articles/mean-apps-restful-api)
