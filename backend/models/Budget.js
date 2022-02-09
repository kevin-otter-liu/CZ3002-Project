const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Budget = new mongoose.Schema({
    user_id:{
        type: String,
        required: true,
    },
	amount:{
        type: Schema.Types.Decimal128,
        required: true,
    },
	category:{
        type: String,
        required: true,
    },
	period_start_date:{
        type : Date,
        required: true,
        
    },
	period_end_date:{
        type : Date,
        required: true,
      
    }
})

module.exports = mongoose.model('Budget',Budget)
