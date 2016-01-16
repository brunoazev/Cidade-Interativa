var collection = db.get('feeds');

module.exports = {
    get: function (req, res) {
        collection.find({}, function (err, result) {
            if (err) {
                res.send({ msg: err });
            } else {
                res.json(result);
            }
        })
    },
    
    put: function (req, res) {
        var feed = req.body;
        collection.insert(feed);
        res.json({ msg: 'Feed inserted succesfully!' });
    },
    
    delete: function (req, res) {
        console.log("deleting");
        return res.json({
            todo: 'Not implemented yet!'
        });
    }
}