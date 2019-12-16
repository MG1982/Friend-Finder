let friendData = require("../app/data/friends");

// Your apiRoutes.js file should contain two routes:

// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
module.exports = (app) => {
    app.get('/api/friends', function (req, res) {
        res.json(friendData);
    });

    // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    app.post("/api/friends", (req, res) => {
        // find a friend and return results
        findFriend(req.body, friendData, res)
    });
};

function findFriend(newFriend, friendList, res) {
    // new friend is the the one that entered on the form

    // loop through each name on current list
    let minscore = 1000
    let bestMatchFriend = {}  // matching form starts empty
    bestMatchFriend['result'] = false

    // loop through each name on current list
    newFriendScoreList = newFriend['scores']
    for (let i = 0; i < friendList.length; i++) {

        // potential best 
        potentialScorelist = friendList[i]['scores']

        // calculate total scores 
        totalscore = 0
        for (let j = 0; j < potentialScorelist.length; j++) {
            totalscore += Math.abs(newFriendScoreList[j] - potentialScorelist[j])
        }

        // if this is better than correct score
        // then replace
        if (totalscore < minscore) {
            bestMatchFriend = friendList[i]
            bestMatchFriend['result'] = true
            minscore = totalscore
        }
    }

    // log results
    console.log(minscore)
    console.log(bestMatchFriend)

    // new friend added into the list
    friendData.push(newFriend)

    // return results
    res.json(bestMatchFriend)
}