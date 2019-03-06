What is it?
-------------
A simple API made using the express.js framework to power a fake video service. The API returns all the videos in the database, gets the information for a specific video (including the views for the video within a specific date range), allows you to add new videos, and allows you to "view" a video (increment its view count)  

Files
-------
API.md - outlines the API usage
create.sql - database definitions to back the API
create.py - script to create statements to populate the database
video_api - folder which houses the API project

Setup & Usage
---------------

1. Run npm install in the video_api directory to install the necessary dependencies (express.js framework for a server and creating the endpoints for the API, mysql for the mysql database that this is backed by, nodemon to automatically reload the server after code changes, and body-parser to be able to read request bodies)
2. In your sql database, run the create.sql script to populate the database. If you want to create new/different insert statements, you can run python create.py script which has functions to create new insert statements
3. In video_api/DB_INFO.js, change the information according to the credentials of your database connection (keep the dataStrings field so dates will be displayed properly)
4. In the video_api directory, run node app.js to run the server
5. Use API.md for documentation regarding the API usage

Notes
------------

- Made a python script to print insert statements with random values to copy into sql script to populate the database (making the random titles was fun)
- Originally made random view counts for each individual video but realized that dates when a video was viewed was necessary, so a view table was created
- Future improvements : more sophisticated functionality, frontend to interact with the API, more helpful responses to edge cases (id doesn't exist returns a message saying that but something to check for example could be dates that don't exist. mySQL doesn't throw errors when you filter for dates that don't exist such as 2019-14-33)