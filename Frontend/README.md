# Project Proposal
### `We have added the LIVE HEROKU SERVER to the CI/CD pipeline. This will automatically show the latest pushed changed from the main branch to the below given link.`


Heroku Link: https://shareit-csci5709.herokuapp.com/

GitLab Link: https://git.cs.dal.ca/ampatel/csci5709-advweb 


## Getting Started

In the project directory, you can run:
### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000/](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# CSCI 5709 - Proposal
The goal of this Project was to demonstrate a functional prototype of the ShareIt application Modules, a user will get an idea of how the final website will look. 

I have created a functional semi working star and feedback module as well as user profile module.

* *Date Created*: 10-June-2022
* *Last Modification Date*: 16-June-2022
* *Assignment URL*: [Gitlab link of Project]( https://git.cs.dal.ca/ampatel/csci5709-advweb )
* *Heroku Deployment Link* : [Application deployment on heroku]( https://shareit-csci5709.herokuapp.com/)

## Authors
* [Amankumar Patel](am501483@dal.ca) - *(Developer)*
* [Chirag Jayeshkumar Pancholi](ch882653@dal.ca) - *(Developer)*
* [Dhruvkumar Patel](am501483@dal.ca) - *(Developer)*
* [Fenil Milankumar Parmar](fn902491@dal.ca) - *(Developer)*
* [Sahil Prafulkumar Parekh](sh883193@dal.ca) - *(Developer)*
* [Shiva Shankar Pandillapalli](am501483@dal.ca) - *(Developer)*

### Built With
* [React](https://reactjs.org/) - Frontend framework
* [Node](https://nodejs.org/) - Backend JavaScript runtime built on [Chrome's V8 JavaScript engine](https://v8.dev/)
* [NPM](https://www.npmjs.com/) - The package manager for  [Node](https://nodejs.org/)
* [Visual Studio Code](https://code.visualstudio.com/download) - Code editor.
* [Material UI](https://mui.com/material-ui/getting-started/installation/) - UI tools
* [Heroku](https://dashboard.heroku.com/) - The cloud platform used for application deployment
* [Gitlab](https://git.cs.dal.ca/) - The version control tool
* [Google chrome Browser](https://www.google.com/intl/en_ca/chrome/) - Browser used to visualize the changes
* [Bootstrap](https://react-bootstrap.github.io/) - The most popular front-end framework Rebuilt for React.

### External Dependencies Used
* [@react-simple-star-rating](https://www.npmjs.com/package/react-simple-star-rating) - react simple star rating improved the feedback expreience and with so many changable modifications.
    
* [@favicon/icons](https://reactgo.com/react-change-favicon/) - favicons are provided by react itself, the icons are been used at different places.
* [@fonts/google](https://fonts.google.com/) - google fonts are refined verson of the fonts provided by the google itself. the package consists of many premade fonts

## Justifications

* **Front-End Frameworks** - To create the front-end of the application, We have utilised ReactJS and Bootstrap. We have used premaid bootstrap buttons to make the website look uniformed. Mostly the pages use the MaterialUI for the designing of the pages. Some default tags like Grid and Cards are been used for the number of times into the code.
* **Colour Scheme** - We have used default color scheme provided by React, We made noticable big changes to make the UI look more personalized and improve readability. 
* **Typography** - We have utilised Google fonts, which includes two different types of fonts with different sizes for header and plain text.

### Deployment

ShareIt module is deployed using Heroku. For more details regarding deployment using Heroku, please visit: (https://dashboard.heroku.com/)

## Sources Used

### "<"Rating>

This code was adapted from [react simple star rating](https://www.npmjs.com/package/react-simple-star-rating) 

*Lines 35 - 42 in StarFeedback.tsx*
```
  <Rating className='Ratings' transition
                  showTooltip
                  tooltipArray={['Terrible', 'Bad', 'Average', 'Great', 'Prefect']}
                  ratingValue={ratingValue}
                  fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345' '#f1d045']}
                  fullIcon={<MdFavorite size={50} />}
                  emptyIcon={<MdFavoriteBorder size={50} />}
                /></div>
```
### Other Modules

for the other modules, all the components used are from the material UI and Bootstrap. The documentation can be found as shown below.
```
 https://getbootstrap.com/docs/4.1/getting-started/introduction/

 https://mui.com/

 https://mui.com/material-ui/getting-started/templates/ 

 App Bar: https://mui.com/material-ui/react-app-bar/ 
 https://openbase.com/js/react-image-picker

https://www.youtube.com/watch?v=hO85tWDctIk&ab_channel=MoodyCodes

https://npm.io/package/@hawk-ui/file-upload

https://sweetalert2.github.io/recipe-gallery/colored-toasts.html

https://www.buybags.de/henkeltaschen/chloe-bowling-bag-daria-shoulder-bag-small-brown-fuer-damen-e241dbb5/

https://mironmahmud.com/classicads/assets/ltr/ad-details-left.html

https://react-icons.github.io/react-icons/icons?name=md
```


## Navigations in the application

* **Refer The Documentation** - By default the code is landing on the login page and there are number of pages described in the documentation.

### Coding style tests
- W3 Compliance check - Passed (Tested on this [site](https://validator.w3.org/))