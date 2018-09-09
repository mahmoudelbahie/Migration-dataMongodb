//Check if 2nd record in req is a number that can evenly devide max_numbers. Returns "" if ok and errormessage if not.
module.exports.check = function(req, max_numbers)
{

	let err = ""
	if (isNaN(req[2]))
	{
		err = `Error: command line argument number 2 (batchsize) must be a number that can be evenly devided by total number of records (${max_numbers})`
	}
	else {
		if (max_numbers % req[2] !== 0) {
			err = `Error: batchsize must evenly devide total number of records (${max_numbers})`
		}
	}
	return err

}