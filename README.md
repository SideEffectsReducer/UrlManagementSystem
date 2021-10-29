# UrlManagementSystem   v1.0

The UrlManagement system is a web app which supports activities like:
- adding/editing url records
- searching url records in database
- checking periodically that stored url is still active
- generating a pdf of a page for a stored url

Future planned features:
- integrating system with WordPress
- support for not working links on Wordpress blog page.
- on a blog page once link is active url should stay, once inactive the link should be replaced with pdf url
## Usage
### Add Url
![Add url png](/example/add.png)
### Url list
![Url list png](/example/list.png)
### Stored generated page pdf
![Stored pdf document png](/example/stored_pdf_document.png)

## Set up
1. Clone the repo
2. Go to UrlManagementSystem folder
3. Run `npm install`
4. Go to server folder
5. Run `npm install`

## Steps to run app
1. Go to the UrlManagementSystem folder
2. Run `npm start` in console to run angular front-end
3. Go to server folder
4. Run `npm start` in console to run backend-server
5. By default app will be served on localhost:4200

## Running unit tests
1. Clone the repo
2. Go to UrlManagementSystem folder
3. Run `npm test`
4. Go to server folder
5. Run `ng test` (running server unit test will remove !!! database please select test_database in server.js file)


![Unit tests](/example/unit_test.png)