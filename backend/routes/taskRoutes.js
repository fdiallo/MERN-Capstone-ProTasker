const express = require("express")
const Project = require("../models/Project")
const Task = require("../models/Task")
const authMiddleware = require("../middleware/auth")

const route = express.Router()

route.use(express.json())

route.use(authMiddleware)


//app.post('/api/projects/:projectId/tasks', protect, async (req, res) => {
route.post('/:projectId/tasks', async (req, res) => {
    
    try {
        console.log("Creating Task with Post request...")
        const project = await Project.findOne({ _id: req.params.projectId });
        //const project = await Project.findOne({ _id: req.params.projectId});
        //console.log("Task creation in progress...")
        if (!project) return res.status(404).json({ message: 'Project not found or unauthorized' });
        console.log("Task creation in progress for: ", project._id)
        const { title, description, status } = req.body;

        console.log(`Title: ${title} description: ${description} status: ${status}`)
        //const task = await Task.create({ title, description, status, project: req.params.projectId });
        const task = await Task.create({ title, description, status, project: req.params.projectId });
        console.log("Task created successfully ...", task)
        return res.status(201).json(task);
        
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

    // const { title, description, status } = req.body;
    // try {
    //     const task = await Task.create({ title, description, status, project: req.params.projectId });
    //     res.status(201).json(task);
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
});

route.get('/:projectId/tasks', async (req, res) => {
    try {
        //const project = await Project.findOne({ _id: req.params.projectId, user: req.user.id  });
        const project = await Project.findOne({ _id: req.params.projectId });
        if (!project) return res.status(404).json({ message: 'Project not found or unauthorized' });

        const tasks = await Task.find({ project: req.params.projectId });
        console.log("Listing Tasks Data: ", tasks)
        return res.json(tasks);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

route.put('/:projectId/tasks/:taskId', async (req, res) => {
    try {
        const project = await Project.findOne({ _id: req.params.projectId, user: req.user.id });
        if (!project) return res.status(404).json({ message: 'Project not found or unauthorized' });

        const { title, description, status } = req.body;
        const task = await Task.findOneAndUpdate(
            { _id: req.params.taskId, project: req.params.projectId },
            { title, description, status },
            { new: true }
        );
        return res.json(task);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


route.delete('/:projectId/tasks/:taskId', async (req, res) => {
    try {
        const project = await Project.findOne({ _id: req.params.projectId, user: req.user.id });
        if (!project) return res.status(404).json({ message: 'Project not found or unauthorized' });

        await Task.findOneAndDelete({ _id: req.params.taskId, project: req.params.projectId });
        return res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = route