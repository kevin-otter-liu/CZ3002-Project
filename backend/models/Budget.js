const { interfaces } = require('mocha');
const mongoose = require('mongoose');
const Budget = new mongoose.Schema({
    user_id:{
        type: String,
        required: true,
    },
	amount:{
        type: String,
        required: true,
    },
	category:{
        type: String,
        required: true,
    },
	period_start_date:{
        type : String,
        required: true,
        
    },
	period_end_date:{
        type : String,
        required: true,
      
    }
})
module.exports = mongoose.model('Budget',Budget)