// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var friendArray = require("./app/data/friends.js");

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

console.log("Expressed");

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT||8080;

// // Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

// require("./data/routing/apiRoutes.js")(app);

app.get("/", function(req, res) {
    console.log("inside");
    res.sendFile( path.join(__dirname,"/app/public/home.html"));
  });

app.get("/survey", function(req, res) {
    console.log("inside");
    res.sendFile( path.join(__dirname,"/app/public/survey.html"));
  });

app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
    scoreArray=[];
    console.log(req.body);
    
    for (var a = 0; a < friendArray.length; a++){
        finalscore=0;
        for(var b = 0 ; b < friendArray[a].scores.length; b++){
            finalscore=finalscore+Math.pow(req.body.scores[b]-friendArray[a].scores[b],2);
        };
        scoreArray.push(finalscore);
        console.log(scoreArray);
    };

    selectedFriend = friendArray[scoreArray.indexOf(Math.min.apply(null, scoreArray))];
    res.json(selectedFriend);
    

  });


// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
