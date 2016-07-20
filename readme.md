## Basic Node App for a mini DAM with a very specific purpose
Built for large-scale image viewing.
Assets added to the public/assets directory are gitignored.

Creates a list of all files in the public/assets folder then searches for jpgs and creates JSON objects based on jpg name of the psd. Writes to an output.json used as a local database. 

Index loops through output.json and creates a line item for each jpg thumbnail and sets the .psd pairing to download on click. 


Check out the live [demo](https://den-madness.herokuapp.com/) on Heroku.

#### Getting Started
Assuming you've got node installed, you'll need to run `npm install` and `grunt` to startup the node server, and generate the appropriate files.

To add your assets, for each psd, you'll want to add a thumbnail equivelant with the same exact name and location, which will determine the pairing.

#### App Structure
+ App.js   - this is our main application javascript, it starts the party
+ Procfile - this is what tells heroku what to run
+ src/     - our client side source sass & js
+ views/   - jade files & template that generates our HTML and integrates data
+ routes/  - since we're a single page, our main route file, passes data into templates
+ public/  - all of our generated css/js and static files
+ modules/ - functions/modules used in the node app.
