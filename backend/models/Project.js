const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    }
}, {
    timestamps: true
});


const Project = mongoose.model('Project', ProjectSchema);

module.exports = { Project };