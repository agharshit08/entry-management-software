This project is live on this link
https://entry-management-softwar-c46e5.firebaseapp.com/?

Tech Stack Used:
1) HTML
2) CSS
3) Bootstrap 4
4) JavaScript
5) Node.js
6) Express.js
7) MongoDB with Mongoose
8) Sendgrid API for Emails
9) Heroku for REST API deployment
10) Firebase for serving the Front-End.

Approach

Building the API

1) This project uses Node and Express setup to build the REST API.
2) Hosts and Visitors have two different endpoints which can handle the requests coming from front-end about adding new host    or adding new visitors.
3) This is done by using MongoDB as a database and npm Mongoose package.
4) MVC Pattern is used here.
5) For models, there is different models for both Host and Visitor.
6) We need to add the host at first before adding the visitors.
7) After host is setup everytime a new visitor is added, an email is sent to host with details of visitor.
8) After visitor checkout, an email is sent to visitor with details of his visit.
9) The REST API is deployed on Heroku.

Building the Front-End.

1) Designing the homepage with HTML/CSS/Bootstrap 4.
2) JavaScript is used to Manipulate the DOM according to Host is present or not.
3) Form validation is added for Host Form and Visitor Form.
4) At start-up first check is done whether Host is already there or not.
5) If host is not there add the host.
6) Add the new visitor via form.
7) An email is sent to Host with visitor details by Back-End.
8) An email is sent to visitor with details of visit after the checkout.
9) Deployed on Firebase to serve the content.


If Link Doesn't work follow these steps to run the project

1) Clone the project.
2) Go to the client folder and open "index.html".