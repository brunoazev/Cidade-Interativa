var Feed = require('../models/Feed');

module.exports = {
    get: function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");          
        Feed.getAll(function (err, data) { 
             if (err) {
                console.log(err);
                return res(err);
            } else {                
                return res.json(data);
            }
        });
    },
    
    put: function (req, res) {
        console.log("inserting");
        conn.collection('feeds').insert(new Feed(res.params.feed));
    },

    delete: function (req, res) {
        console.log("deleting");
        return res.json({
            todo: 'Not implemented yet!'
        });
    }
}