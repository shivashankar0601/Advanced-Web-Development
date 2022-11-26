# Assignment 3

* *Date Created*: 15-07-2022
* *Last Modification Date*: 15-07-2022
* *Project Heroku URL*: <https://shareit-csci5709-test.herokuapp.com/>
* *GitLab Back-end Repository URL*: <https://peaceful-brushlands-56321.herokuapp.com/>
* *GitLab Individual Branch URL in Front-end Repository*: <https://git.cs.dal.ca/ampatel/csci5709-advweb/-/tree/shiva>
* *GitLab Individual Branch URL in Back-end Repository*: <https://git.cs.dal.ca/golani/csci-5709-group8-backend/-/tree/development/grmvishnu>

## project name
* ShareIT

## Author
* [Shiva Shankar Pandillapalli](sh300856@dal.ca) - (owner)
* [B00880049]()

## Getting Started
To run the front-end project, in the project directory, you can run:

### `npm run dev` 

Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.
The page will reload when you make changes.

To run the back-end project, in the project directory, you can run:

### `npm start`

You can open postman and hit the API URL's for testing.

## Prerequisites

* [ReactJS](https://reactjs.org/)
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/en/starter/installing.html)


## Features Developed
As a part of this assignment (project), I developed the following modules 
* Create Post
* View Post
* Update Post
* Delete Post

### Tasks Description
* In create post when the user clicks on any of the fields name, the field should be highlighted
* once the data is filled, the fields must be validated
* On clicking the upload image area, a file selector must be opened
* On clicking of create, the images must be converted to base64 and along with the form data, this information should be saved in the database
* Update post follows the same as above, but the user will be able to edit the existing content
* Delete post task deletes the data from the back-end database (mongodb) and refreshes the content in the profiles page
* View post page shows the currently selected post with all the available images that were uploaded during the creation of the post
* written API's to create, update, retrieve and delete the content from the database in Express.js



## Files Created/Updated in front-end

To connect both the front-end and the back-end, i have created/update the following files:
* [CreatePost.jsx](/src/Posts/CreatePost.jsx)
* [UpdatePost.jsx](/src/Posts/UpdatePost.jsx)
* [ViewPost.jsx](/src/Posts/ViewPost.jsx)

To write the API's in the back-end, i have created/updated the following files:

* [app.js] (/)
* [currentDateTime.js] (/api/routes/Posts/currentDateTime.js)
* [posts.js] (/api/routes/Posts/posts.js)
* [createPostModel.js] (/api/models/createPostModel.js)

## contributed to
* [UserProfile.js] (/src/UserProfile/UserProfile.tsx)


## Built With
* [ReactJS](https://reactjs.org/) - JavaScript Library for building frontend
* [Node.js](https://nodejs.org/en/) - JavaScript Library for building backend
* [Express.js](https://expressjs.com/en/starter/installing.html) backend supporting framework on top of Node.js
* [Heroku](https://dashboard.heroku.com/apps) - Deployment server
* [React Materil UI](https://mui.com/) - Components Framework

## Acknowledgments
* [Nodejs Intro](https://www.w3schools.com/nodejs/nodejs_intro.asp) for introduction to Node.js
* [Nodejs Mongodb](https://www.w3schools.com/nodejs/nodejs_mongodb.asp) for introduction to Mongodb use in Node
* [BootStrap](https://getbootstrap.com/) for providing CSS implementations for creating enhanced UI