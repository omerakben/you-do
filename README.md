# Webpack Intro

[See Live Demo of this Template](https://webpack-5-template.netlify.app)

Webpack is a task runner and a module bundler. It originally started as a module bundler. This means that it takes all of your separate Javascript modules and bundles them together into a single file. Webpack also automates some of the tasks that we have to run every time we change the code. It will automate these tasks so that we are not typing in the same commands every single time.

## Topics
- [Get Started](#get-started)
- [Starting the Project](#starting-the-project)
- [Other important tidbits](#other-important-tidbits)
    - [Console messages](#console-messages)
    - [Including images with webpack](#including-images-with-webpack)
    - [Importing CSS](#importing-cssscss)
    - [Using axios](#using-axios)
    - [Deploying on Netlify](#deploying-on-netlify)
___

## Get Started

### Use Template
#### 1. To get started, click the GREEN "Use this Template" button at the top of the repo
<img width="1015" alt="usetemplate" src="https://user-images.githubusercontent.com/29741570/190486165-7ca4abf5-2249-4d0d-9584-b68c82f19ba0.png">

#### 2. Make sure YOUR github account is selected in the dropdown and name your project
<img width="844" alt="createproject" src="https://user-images.githubusercontent.com/29741570/190486151-f8a5d3a9-f395-482c-ab51-016362505f57.png">

3. Clone your new repo to your local machine
4. Go to the **NEXT** section

## Starting the Project
1. Open the `package.json` file and change the `name` property to the name of your application, and `author` to  your name.
1. Rename the `.sample.env` file to `.env` file. The final file name should be `.env`
1. From your command line, be in the root directory and run `npm install` OR `npm i` for short.
1. To start your application, run `npm start`

### If you see this, you are set to go!
![lit-screen](https://user-images.githubusercontent.com/29741570/190486162-27e9032d-266f-4962-a85c-fc40c58f33db.png)

**NOTES:** 
- Changes you make to the project will make the browser reload on save...no more hard refresh unless something goes wrong.
- You will no longer be using the `hs -o` command. To start your server, you will run `npm start`

## Other Important Tidbits
### Console messages
From this time forward, you will be expected to have a clean console in order for your assignments to be approved. This means that the use of `console.log` is acceptable **_(debugger is WAY better though)_** while developing, but will throw an error in your console like the image below, but all `logs` will have to be removed. You may use `console.error` and `console.warn` in your code however for messages. These need to all be removed before pushing to production unless they contain vital info for the user/developer.

![notacceptable](https://user-images.githubusercontent.com/29741570/190486163-3dd8640f-5dda-4f73-9436-6020fc9e00c4.png)

### Including Images with Webpack
If you have a folder of local images that you want to load into your code things get a little strange with webpack.  Remember the only way webpack knows about assets is if they are imported into your javascript files.  Even our CSS is not added until those files are imported into our javascript files.  Below is some sample code for how to load a local image file into your project

```js
import cat from './assets/cat.jpg';

let domString = `<img src=${cat} alt="picture of a cat"/>`;

document.getElementById('cat').innerHTMl = domString;
```

### Importing CSS/SCSS
**NOTE:** We will be using SCSS files. They are used the same way your CSS files work, with some added benefits that we will discuss later.

Since Webpack is making the connection to the JS and CSS for us and we are no longer manually adding links or script tags to our HTML, we have to get our styles to the application some way...

Here is how we add our styles using webpack:

```js
import '../styles/main.scss';

const init = () => {
  document.querySelector('#app').innerHTML = '<h1>HELLO! You are up and running!</h1>');
  console.log('YOU ARE UP AND RUNNING!');
};

init();
```

### Deploying on Netlify

- Build Command: `npm run build`
- Publish directory: `dist`
- Add Environmental Variables (NOT REQUIRED for Apps that do not use API Keys, etc)
    - Any Enviromental variables you are using in your `.env` file should be added to Netlify. 
        - Go to Site settings > Build & deploy > Environment > Environment variables and the keys and values there.

- Update Firebase URL Settings
    - In Firebase under Authentication select sign in methods, scroll to Authorized domains. Add your Netlify URL.
        
## More Info and Resources on Webpack
- Visit the [Webpack documentation](https://webpack.js.org/concepts/) if you want to explore more.
- [Info on our Webpack Config](https://github.com/nss-nightclass-projects/Night-Class-Resources/blob/master/book-2-patterns-and-tools/chapters/webpack-configure.md)

## Requirements
- YOU-DO App
You will be creating an application that allows users to CRUD on TODOs. There will NOT be user authentication in this app as the purpose is a refresher on VanillaJS.
Get Started
use the webpack template (use this template button!!!!)
npm i
npm start
Below are the steps to get setup, which you should already be very familiar with:Create a firebase app named YOU-DO AppSetup a firebase database (NO AUTH)Add Sample Data to Your DatabaseAdd your firebase creds to the .env fileReview the MVP wireframeCODE!
MVP Acceptance Criteria
NOTE:  make style changes. Follow the wireframe as designed as it uses Bootstrap Components that will make your app development faster. If you are able to complete MVP, move on to the stretch goals.
As a user, I can add an item to my YOU-DO list by typing in the input and pressing submit
As a user, when I press submit, I should see the newly added YOU-DO on the DOM
As a user, I can complete a YOU-DO item by pressing a green button that reads "COMPLETE"
As a user, when I press complete, I should no longer see the item on the DOM and the done attribute should update in firebase to true
As a user, I can delete a YOU-DO by pressing a red button that reads "DELETE"
As a user, when I press delete, the YOU-DO should be deleted from firebase and I should no longer see it on the DOM
As an engineering hiring manager, I want to see a README that reflects the details of the project with the software engineers details and not THESE instructions.
STRETCH Acceptance Critieria
Review the STRETCH wireframe
As a user, I should see an affordance that allows me to switch views (See wireframe)
As a user, if I select "View Completed" I should only see the completed YOU-DOs and whatever is shown in the wireframe
As a user, I should be able to select from a pre-defined list of categories for the YOU-DOs I create.
As a user, when I complete the form to submit a YOU-DO, the newly created YOU-DO should be visible on the DOM under the specified category and the category should update in firebase to the category I selected.
As a user, I should be able to edit a YOU-DO using the same form used to create a YOU-DO.
As a user, when I edit a YOU-DO and submit it, I should see the updated YOU-DO on the DOM under the chosen category.
As an engineering hiring manager, I want to see a README that reflects the details of the project with the software engineers details and not THESE instructions.


## RoadMap : 
### Phase 1: Setup & Structure
- [ ] Create CRUD operations for todos in a new todoAPI.js file
- [ ] Implement todo components (TodoForm, TodoList, TodoCard)
- [ ] Update main.js to use ViewDirector
- [ ] Add navigation/navbar component
### Phase 2: Features
- [ ] Add todo creation form
- [ ] Implement todo listing with filtering options
- [ ] Add edit/delete functionality
- [ ] Implement priority sorting
- [ ] Add completion status toggle
### Phase 3: Enhancement
- [ ] Add data validation
- [ ] Implement error handling
- [ ] Add loading states
- [ ] Implement search functionality
- [ ] Add sorting by different fields
### Phase 4: UI/UX
- [ ] Improve styling with Bootstrap
- [ ] Add animations for actions
- [ ] Implement responsive design
- [ ] Add confirmation dialogs
- [ ] Implement toast notifications