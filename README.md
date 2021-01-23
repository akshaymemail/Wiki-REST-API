# Wiki-REST-API

# Usage ->


Get all articles use GET request
 https://yourhost/articles

To add a new article use POST request (x-www-form-urlencoded)
 https://yourhost/articles

To delete all articles use DELETE request
 https://yourhost/articles

To get a specific article use GET request
 https://yourhost/articles/articleTitle

To update a specific article use PUT request (x-www-form-urlencoded)
 https://yourhost/articles/articleTitle

To update a field of article use PATCH request (x-www-form-urlencoded)
 https://yourhost/articles/articleTitle

To delete a specific article use DELETE request
 https://yourhost/articles/articleTitle

# Note->

Article collection has two fields
1. title ( required ) // Specify the name of the article
2. content ( required ) // Specify the content of the article
