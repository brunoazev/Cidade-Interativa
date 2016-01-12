var collection = db.collection('feeds');

var feedSchema = new Schema({
    feed_id : Number,
    title : String,
    text : String,
    date: { type: Date, default: Date.now },
    location : {
        street : String,
        barrow : String,
        city : String,
        state : String,
        country : String,
        coords : {
            acc : Number,
            lat : Number,
            long : Number
            }
        },
    category : String,
    author : String,
    authority : String,
    type : String,
    liked : Number,
    shared : Number
});

feedSchema.statics.getAll = function (cb) {
    collection.find({}).toArray(cb);
}

feedSchema.methods.save = function (cb) {
    collection.insert(this);
};

var Feed = mongoose.model('Feed', feedSchema);
Feed.get

module.exports = Feed;


