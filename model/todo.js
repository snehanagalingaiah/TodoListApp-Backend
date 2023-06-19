const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ToDoSchema = new Schema ({

	data:
	{
		type: String,
		required : true,
		trim: true
	},
	done:
	{
		type:Boolean,
	    default: false
	},
	createdAt:
	{
		type:Date,
	    default: Date.now()
	}


})

const ToDoModel = mongoose.model("todos", ToDoSchema )

module.exports = ToDoModel;