from datetime import date
from random import randint

videos = []
views = []

def create_random_title():
    beginning = ["What a ", "Look at that ", "that is a ", "WOW! Its a ", "another ", "remember that ", "How about that? a ", "I cant find my "]
    adjectives = ["marvelous ", "spectacular ", "gross ", "disgusting ", "fascinating ", "cute ", "pretty ", "smart "]
    nouns = ["animal", "person", "cat", "dog", "puppy", "kitten", "house", "TV", "phone", "computer", "sword", "pencil", "pen"]
    
    return beginning[randint(0, len(beginning)-1)] + adjectives[randint(0, len(adjectives)-1)] + nouns[randint(0, len(nouns)-1)]

def create_random_brand():
    brands = ["Coca-Cola", "Facebook", "Disney", "DC", "Food Network", "Doritos", "NBA", "Hostess", "Samsung", "MTA", "Uniqlo", "Charmin"]
    return brands[randint(0, len(brands)-1)]

def create_random_date():
    year = randint(2000, 2018)
    month = randint(1, 12)
    day = randint(1, 28) # don't want to check for which month has how many days so choosing a number that works for every month
    random_date = date(year, month, day)

    return random_date

def make_create_video_statement(video_id):
    create = {
        "video_name" : create_random_title(),
        "brand_name" : create_random_brand(),
        "published_date" : create_random_date(),
        "video_id" : video_id
    }
    
    videos.append(create)
    return "INSERT INTO VIDEOS (video_name, brand_name, published_date, video_id) VALUES ('{}', '{}', '{}', '{}');".format(create['video_name'], create['brand_name'], create['published_date'], video_id)

def make_create_view_statement(video_id):
    vid_num = randint(1, video_id-1)
    vid_date = create_random_date()

    if (vid_date < videos[vid_num-1]['published_date']):
        while (vid_date < videos[vid_num-1]['published_date']):
            vid_date = create_random_date()

    create = {
        "video_id" : vid_num,
        "vid_date" : vid_date
    }
    
    views.append(create)

    return "INSERT INTO VIEWS (video_id, view_date) VALUES ('{}', '{}');".format(vid_num, vid_date)

def make_create_statements():
    video_id = 1
    while(video_id != 51):
        print(make_create_video_statement(video_id))
        video_id = video_id + 1
    for i in range (1, 100):
        print(make_create_view_statement(video_id))
        


make_create_statements()