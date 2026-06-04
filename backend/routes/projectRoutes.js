const express = require("express")
const Project = require("../models/Project")
const authMiddleware = require("../middleware/auth")

const route = express.Router()

route.use(express.json())

route.use(authMiddleware)


route.get("/user/", async (req, res) => {
    try {
        const allProjects = await Project.find({ user: req.user._id });
        res.json({ projects: allProjects });
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }

});

route.delete("/:id", async (req, res) => {
    try {
        const deleted = await Project.findByIdAndDelete(req.params.id);
        res.json({project: deleted})
    } catch (error) {
        console.error(error)
        res.status(500).send("There was an issue Deleting the project...")
    }
});

route.put("/:id", async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after"
            }
        );
        res.json({ project: updatedProject })
    } catch (error) {
        console.error(error);
        res.status(500).send("Unable to update this project...")
    }
});

route.post('/', (req, res) => {

    Project.create(req.body)
        .then(createdProject => {
            console.log('Project has successfuly been created!')
            res.send({ project: createdProject })
        }).catch(error => {
            console.error('Error Creating Project!')
            res.status(500).send("There an error creating the project")
        })

});

route.get("/:id", async (req, res) => {
    try {
        const foundProject = await Project.findById(req.params.id)
        res.json({project: foundProject});
    } catch (error) {
        res.status(500).send("Unable to retrieved this project")
    }
});

module.exports = route