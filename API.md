API USAGE
==================================
There are four endpoints that can be hit to this API

1. "/all" -> a GET request to this endpoint will return all the videos in the database with their names, brands, published dates, and video IDs (the video IDs are listed so that way someone using the API knows how to interact with a specific video)

ex: GET to "localhost:3000/all" returns all videos

2. "/:video_id" -> a GET request to this endpoint will return the information for the video whose id is listed as a parameter in the endpoint. Additionally the total viewcount for that video is listed as well. If a video_id is given that doesn't exist, it will return a message saying that

ex: GET to "localhost:3000/7" returns video information for the video with id 7

3. "/:video_id/:date -> a GET request to this endpoint will return the information for the video whose id is listed as a parameter in the endpoint and the view count listed will be the views to that video after the date given as a parameter. If a video_id is given that doesn't exist, it will return a message saying that

ex: GET to "localhost:3000/7/2010-04-21 returns video information for the video with id 7, including the count of all views for that video after the date 2010-04-21, or April 21st, 2010 (date format is YYYY-MM-DD)

4. "/create" -> a POST request to this endpoint will create a video with a title and brand that are passed in the request body. The published date will be set to the date that the endpoint is being hit and the view count will start at 0 by default.

ex: POST to "localhost:3000/create" with key-value pairs in the request body such as {video_name:Some type of name, brand_name: McDonalds} will successfully create a video with those fields, a publish date of today's date, and a view count of 0

5. "/track" -> a POST request to this endpoint with a video_id passed in the body will create a "view" for the corresponding video (so its view count will increment)

ex: POST to "localhost:3000/track" with a key-value pair in the request body such as {video_id:51} will increment the view count for the video with id 51, counting as a "view" for that video

If an error is hit, then a 500 error is thrown.