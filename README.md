# Getting Started with Create React App

## It is important to read through this README and follow the steps outlined below to get this application running locally.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This is a code challenge for Vinted. It displays an infinite scroll of images gotten from Flickr. These images can be added to favorite and saves in local storage.
The images are gotten from one gallery, with the galleryId. If you would like to render a different gallery, browse galleries on https://www.flickr.com/photos/flickr/galleries/
and replace the value of GALLERY_ID on the constants.ts file with your galleryID.

## How to run this application

In order to get this app running, please follow these steps:

Get your API key to make request here: `https://www.flickr.com/services/apps/create/`. You are given a key and secret when you register on Flickr, https://www.flickr.com
Copy your created key to constants.ts and replace the value of the variable APIKEY with your newly created key, you can find this file in src/repository/constants.ts

In the project directory, you can run:

### `npm install`

Installs node_modules with the dependencies and devDependencies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
