const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    status: {
        type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true
    }
}, {
    timestamps: true
});


const Task = mongoose.model('Task', TaskSchema);


module.exports = { Task };