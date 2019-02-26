const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }
});

module.exports = mongoose.model('Task', taskSchema);