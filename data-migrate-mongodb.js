const async = require('async')
const arguments = require('./functions/args.js')
const insertIntoDB = require('./functions/insertTodb.js')

const dataPeople = require('./data/m3-customer-data.json')
const dataAddress = require('./data/m3-customer-address-data.json')

// Counting keys to see how large the array is.
let arrayLength = Object.keys(dataPeople).length

// Check if cli arguments gives an errormessage or it is possible to devide arraylength by second arg.
let err = arguments.check(process.argv, arrayLength)
// If function returns text it will be an error, so display err and exit
if (err !== "")
{
	console.log(err)
	process.exit(1)
}

// As process.argv[2] has been checked above, this should be fine.
let batchSize = parseInt(process.argv[2])
let asyncTasks = []

// Number of queries that has to be done to get all rows added to DB
let numberOfTasks = arrayLength / batchSize
for (let i = 0; i < numberOfTasks; i++)
{
	let batchStart = i * batchSize
	let batchEnd = batchStart+batchSize
	console.log(`Processing Task no: ${i}`)
	asyncTasks.push(function (callback) {
		let dataToTask = []
		console.log(`Execute Task: Processing Records from ${batchStart} to ${batchEnd-1}`)
		for(let j = batchStart; j < batchEnd; j++)
		{
			let dataRow = {}
			Object.assign(dataRow, dataPeople[j], dataAddress[j])
			dataToTask.push(dataRow)
		}
		// Writing dataToTask to DB.
		insertIntoDB(dataToTask, batchStart, batchEnd, callback)
	})
}

async.parallel(asyncTasks, function(err, res) {
	console.log(res)
})