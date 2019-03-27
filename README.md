# mongoScraper
* Portfolio : https://yoonheekim.github.io/YoonPortfolio/
* Heroku : https://mongoscraper-yh.herokuapp.com/

## Overviews
1. a web app that lets users view and leave comments on the latest news. 
2. flex Mongoose and Cheerio muscles to scrape news from `New York Times`.


## Technolohy
> Node.js, Github, Heroku, npm packages(mongoose, cheerio, axios, express, express-handlebars), html, javascript, Jquery, Bootstrap

## Screenshot
1. 
![index](https://user-images.githubusercontent.com/44251380/55101711-1db40200-509b-11e9-9a8b-9924fa7c7f47.jpg)
```
* Whenever a user visits the site, the app should scrape stories from a news 
  outlet of user's choice and display them for the user. 
* Users can click on the title to take them to the corresponding NYT article
```

2. 
![clear](https://user-images.githubusercontent.com/44251380/55103363-a6806d00-509e-11e9-9516-83bf49ebb5ca.jpg)
```
* When user clicked `Clear Article`, the article database was removed all 
  and app displays that "Try Scraping New Articles or Go to Saved Articles"  
```

3. 
![savedArticle](https://user-images.githubusercontent.com/44251380/55103686-535aea00-509f-11e9-9320-5e82d9527125.jpg)
```
* Each scraped article should be saved to your application database.
* When users go to `Saved Article`, they can see added articles.
* Each article has Delete, Add comment buttons.
* Delete button allows users to remove the article from saved articles.
```

4. 
![comment](https://user-images.githubusercontent.com/44251380/55104633-214a8780-50a1-11e9-9bb5-bfb8b4e2b828.jpg)
```
* Users can type comment, and save comment specific to that article
* The user can also delete comment by clicking on the 'X'
```

## Data Collections
1. Article model
```
title : String
summary : String
url : String
img : String
saved : Boolean
comment : Array
```
 * If a comment was created successfully, find one article (there's only one) and push the new comment's _id to the article's `comment` array

2. Comment model
```
content : String
```
