// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const friends = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body parsing middleware
        // console.log("post from friend");
        // console.log(req.body);
        friends.push(req.body);
        // console.log(friends);
        // res.json(true);

        var finalArr = []

        for (var i = 0; i < friends.length; i++) {
            yourScore = req.body.scores.map(Number);
            friendScore = friends[i].scores;
            friendName = friends[i].name;
            friendPhoto = friends[i].photo;

            var tempArr = [];


            for (var j = 0; j < yourScore.length; j++) {
                tempArr.push(Math.abs(yourScore[j] - friendScore[j]));
            }

            const finalScore = tempArr.reduce((accum, val) => {
                return accum + val;
            })

            finalArr.push(finalScore);
        }
        finalArr.pop();

        console.log(friends[finalArr.indexOf(Math.min(...finalArr))]);

        var resData = friends[finalArr.indexOf(Math.min(...finalArr))];

        res.send(resData);
    });

};
