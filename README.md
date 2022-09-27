# Google Books Search

## Table of contents
​
- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)
​
​
## Overview
​
### The challenge
​
The Google Book search is a basic react app for searching books in Google's book API.  The user can save books to their account and easily find the link for the book in Google's book store.
​
### User Story
​
```md
AS AN avid reader
I WANT to search for new books to read
SO THAT I can keep a list of books to purchas
```
​
### Acceptance Criteria

```md
GIVEN a book search engine
WHEN I load the search engine
THEN I am presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button
WHEN I click on the Search for Books menu option
THEN I am presented with an input field to search for books and a submit button
WHEN I am not logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site
WHEN I click on the Login/Signup menu option
THEN a modal appears on the screen with a toggle between the option to log in or sign up
WHEN the toggle is set to Signup
THEN I am presented with three inputs for a username, an email address, and a password, and a signup button
WHEN the toggle is set to Login
THEN I am presented with two inputs for an email address and a password and login button
WHEN I enter a valid email address and create a password and click on the signup button
THEN my user account is created and I am logged in to the site
WHEN I enter my account’s email address and password and click on the login button
THEN I the modal closes and I am logged in to the site
WHEN I am logged in to the site
THEN the menu options change to Search for Books, an option to see my saved books, and Logout
WHEN I am logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site and a button to save a book to my account
WHEN I click on the Save button on a book
THEN that book’s information is saved to my account
WHEN I click on the option to see my saved books
THEN I am presented with all of the books I have saved to my account, each featuring the book’s title, author, description, image, and a link to that book on the Google Books site and a button to remove a book from my account
WHEN I click on the Remove button on a book
THEN that book is deleted from my saved books list
WHEN I click on the Logout button
THEN I am logged out of the site and presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button 
```

### Screenshot

<br>

![My Website](./public/assets/images/techBlog.png)
​
### Links

- Live Website: [https://nolans-tech-blog.herokuapp.com/](https://nolans-tech-blog.herokuapp.com/)
<br>

## My process
​
### Built with

- JavaScript
- NodeJS
- NPM express-handlebars
- NPM express
- NPM sequelize
- NPM mysql2
- NPM bcryptjs
- NPM express-sessions
- NPM connect-session-sequelize
​
### What I learned
​
In this challenge, I leanred about the challenges when truly devloping a fullstack application.  One challenge that occurred was how to conditionally display a edit button on comments that belonged to the logged in user.  This required me to handle creating a boolean for all comments fetch from the database in my backend routes code.  Below is a code snippet of how I handled creating this boolean:

```js
if (req.session.isLoggedIn) {
    // create boolean if user is viewing their post
    req.session.user.id === blogPost.userId ? blogPost.edit = true : blogPost.edit = false;
    // create a boolean in each comment for editing comments permission
    blogPost.comments.forEach(comment => {
        if (comment.userId === req.session.user.id) return comment.commentEdit = true;
        else return comment.commentEdit = false;
    });
};
```

Here, the `blogPost` is a data structure received from the database utilizing a sequelize query.  The blog post query included `comments` which were the associated comments for that post.  In my code, I first checked that the user was logged in currently.  Then, if they were, I used a `forEach()` array method on the comments to add a `commentEdit` boolean to the data structure for each element in comments; if true, it meant that the comment belonged to the logged in user.  Now, I could send this data when rendering the handlebars page and use it as a conditional.  Below is where I used it in the markup language:

```handlebars
{{#if data.commentEdit}}
<div class="card-footer">
    <button data-commentid="{{data.id}}" type="button" class="editComment-btn btn btn-danger" data-bs-target="#editComment-modal"
        data-bs-toggle="modal">Edit</button>
</div>
{{/if}}
```
​
As seen above, now I could conditionally add an edit button on the dynamically displayed comments only for the comments that belong to the logged in user.

### Continued development
​
In the future, I want to utilize this project as a template to implement a blog feature in other applications that I build.  While this is a fairly raw skeleton for a blog, it provides a great starting point to refine into a well developed blog.  Other features I would like to add include: edited labels for edited comments, more personalized dashboard, improved styling and UI/UX, and private messaging.
​
### Useful resources
​
- [Sequelize DOCS associations](https://sequelize.org/docs/v6/core-concepts/assocs/) - The seqeulize docs were great at breaking down how to use their association methods.

- [Handlebars Docs](https://handlebarsjs.com/) - While handlebars is simple to use, I found referencing their docs was very helpful and gave insight to cool features I would've overlooked.

​
## Author
​
Nolan Spence
- Website - [Nolan Spence](https://unicorn-barf.github.io/Portfolio_Website_HTML_CSS/)
- Github - [https://github.com/Unicorn-Barf](https://github.com/Unicorn-Barf)
​
## Acknowledgments

Thank you to Luigi TA for my bootcamp discussing standard practices when passing data to handlebars markup with backend rendering.