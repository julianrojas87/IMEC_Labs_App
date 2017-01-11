# IMEC_Labs_App
This application was built to comply with a technical test set by IMEC labs.

## Requirements:
To deploy and correctly execute this application is necessary to previously install the following:
  - [NodeJS](http://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/)
  - [MongoDB](http://www.tutorialspoint.com/articles/how-to-install-mongodb-on-ubuntu-16-04)

## Installation and Deployment:
First make sure your MongoDB instance is up and running using the following command:
```bash
$ sudo service mongod start
```
Also confirm you have Node and NPM installed by running:
```bash
$ node -v
$ npm -v
```
Now to install the application clone this repository in your local machine like this:
```bash
$ git clone https://github.com/julianrojas87/IMEC_Labs_App.git <your_folder_of_choice>
```

Once the cloning is completed you can start the application as follows:
```bash
$ cd <your_folder_of_choice>
$ npm start
```
Finally open a browser and type in the follwing URL:
```bash
http://localhost:3000
```
