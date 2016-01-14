var collection = db.get('feeds');

module.exports = {
    get: function (req, res) {        
        res.header("Access-Control-Allow-Origin", "*");          
        
        collection.find({}, function (err, result) {
            if (err) {
                res.send({ msg: err });
            } else {                
                res.json(result);
            }
        })
    },
    
    put: function (req, res) {         
        console.log("inserting");
        console.dir(req.param.id);
        //collection.insert(req.);
    },

    delete: function (req, res) {
        console.log("deleting");
        return res.json({
            todo: 'Not implemented yet!'
        });
    }
}