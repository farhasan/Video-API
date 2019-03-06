const db = require('./DB_INFO'); // change db information for your db instance

const bp = require('body-parser');

const express = require('express');
const app = express();

const mysql = require('mysql');

app.use(bp.urlencoded({ extended:true }));

// endpoint to get all video results
app.get("/all", (req, res) => {
    const connection = mysql.createConnection(db.connection);
    const query = "SELECT * FROM VIDEOS";
    connection.query(query, (err, rows, fields) => {
        if (err) {
            res.sendStatus(500);
            throw err;
        }

        const videos = rows.map((row) => {
            return {
                video_id : row.video_id,
                name : row.video_name,
                brand : row.brand_name,
                Published : row.published_date,
                count: row.view_count
            }
        });

        res.json(videos);
    })
});

// endpoint to get report for a specific video
app.get("/:video_id", (req, res) => {
    const connection = mysql.createConnection(db.connection);
    const query1 = "SELECT COUNT(video_id) FROM VIEWS WHERE video_id = ?;";
    const query2 = "SELECT VIDEOS.video_id, VIDEOS.video_name, VIDEOS.brand_name, VIDEOS.published_date, COUNT(VIEWS.view_date) AS view_count FROM VIDEOS, VIEWS WHERE VIDEOS.video_id = VIEWS.video_id AND VIDEOS.video_id = ?;";
    const query3 = "SELECT * FROM VIDEOS WHERE video_id = ?";
    connection.query(query1, [req.params.video_id], (err, rows, fields) => {
        if (err) {
            res.sendStatus(500);
            throw err;
        }

        if (rows[0]['COUNT(video_id)'] == 0) { // if the view count is 0, all the other fields will return null
            connection.query(query3, [req.params.video_id], (err, rows, fields) => {
                if (rows.length == 0) {
                    res.json({"message" : "there is no existing video with that id"});
                } else {
                    const video = rows.map((row) => { // return all the video information, but include the view count of 0
                        return {
                            video_id : row.video_id,
                            name : row.video_name,
                            brand : row.brand_name,
                            Published : row.published_date,
                            count : 0
                        }
                    });

                    res.json(video);
                }
            })
        }

        else {
            connection.query(query2, [req.params.video_id], (err, rows, fields) => {
                const video = rows.map((row) => { // return the video information with a calculated view count
                    return {
                        video_id : row.video_id,
                        name : row.video_name,
                        brand : row.brand_name,
                        Published : row.published_date,
                        count : row.view_count
                    }
                });

                res.json(video);
            })
        }
    })
});

// endpoint to get the views of a video after a specific date format is YYYY-MM-DD
app.get("/:video_id/:date", (req, res) => {
    const connection = mysql.createConnection(db.connection);
    const query1 = "SELECT COUNT(video_id) FROM VIEWS WHERE video_id = ? AND view_date >= ?";
    const query2 = "SELECT VIDEOS.video_id, VIDEOS.video_name, VIDEOS.brand_name, VIDEOS.published_date, COUNT(VIEWS.view_date) AS view_count FROM VIDEOS, VIEWS WHERE VIDEOS.video_id = VIEWS.video_id AND VIDEOS.video_id = ? AND VIEWS.view_date >= ?;";
    const query3 = "SELECT * FROM VIDEOS WHERE video_id = ?";
    connection.query(query1, [req.params.video_id, req.params.date], (err, rows, fields) => {
        if (err) {
            res.sendStatus(500);
            throw err;
        }

        if (rows[0]['COUNT(video_id)'] == 0) { // if the view count is 0, all the other fields will return null
            connection.query(query3, [req.params.video_id, req.params.date], (err, rows, fields) => {
                if (rows.length == 0) {
                    res.json({"message" : "there is no existing video with that id"});
                } else {
                    const video = rows.map((row) => { // return all the video information, but include the view count of 0
                        return {
                            video_id : row.video_id,
                            name : row.video_name,
                            brand : row.brand_name,
                            Published : row.published_date,
                            count : 0
                        }
                    });

                    res.json(video);
                }
            })
        }

        else {
            connection.query(query2, [req.params.video_id, req.params.date], (err, rows, fields) => {
                const video = rows.map((row) => { // return the video information with a calculated view count
                    return {
                        video_id : row.video_id,
                        name : row.video_name,
                        brand : row.brand_name,
                        Published : row.published_date,
                        count : row.view_count
                    }
                });

                res.json(video);
            })
        }
    })
});


// endpoint to create a video
app.post("/create", (req, res) => {
    const connection = mysql.createConnection(db.connection);
    const query = "INSERT INTO VIDEOS (video_name, brand_name, published_date) VALUES (?, ?, CURDATE());";
    connection.query(query, [req.body.video_name, req.body.brand_name], (err, rows, fields) => {
        if (err) {
            res.sendStatus(500);
            throw err;
        }

        res.json({
            message : "Video successfully created"
        });
    })
});


// endpoint to "view" a video
app.post("/track", (req, res) => {
    const connection = mysql.createConnection(db.connection);
    const query = "INSERT INTO VIEWS (video_id, view_date) VALUES (?, CURDATE());";
    connection.query(query, [req.body.video_id], (err, rows, fields) => {
        if (err) {
            res.sendStatus(500);
            throw err;
        }

        res.json({
            message : "Video view has been added"
        });
    })
});


app.listen(3000, () => {
    console.log("listening");
});