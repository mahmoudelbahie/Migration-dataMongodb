const mongodb = require('mongodb')
const url = 'mongodb://localhost:27017'

module.exports = function(docs, batchStart, batchEnd, callback) {
    mongodb.MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err)
            callback(err, null)
        let db = client.db('edx-course-db')
        db.collection('customers').insertMany(docs, function(err, res) {
        	client.close()
            if (err)
                callback(err, null)
            console.log(`Database: Processed Records from ${batchStart} to ${batchEnd-1}`)
        })
    })
}