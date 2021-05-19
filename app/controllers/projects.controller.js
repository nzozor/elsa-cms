const db = require("../models");
const Project = db.projects;

// Create and Save a new Project
exports.create = (req, res) => {
  // Validate request
  if (!req.body.projectId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Project
  const project = new Project({
    projectId: req.body.projectId,
    projectName: req.body.projectName,
    projectDescription: req.body.projectDescription,
    clientName: req.body.clientName,
    clientUrl: req.body.clientUrl,
    services: req.body.services,
    country: req.body.country,
    mainImgUrlSmall:req.body.mainImgUrlSmall,
    mainImgUrlLarge:req.body.mainImgUrlLarge,
    thumbnailUrlSmall: req.body.thumbnailUrlSmall,
    thumbnailUrlLarge: req.body.thumbnailUrlLarge,
    imgAlt: req.body.imgAlt
  });

  // Save Tutorial in the database
  project
    .save(project)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the project."
      });
    });
};

// Retrieve all Projects from the database.
exports.findAll = (req, res) => {

  Project.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects."
      });
    });
};

exports.projectsOverview = (req, res) => {
  Project.find().limit(9)
    .then(projects => {
      const thumbnails = projects.map((project) => ({
        thumbnailUrlLarge: project.thumbnailUrlLarge,
        thumbnailUrlSmall: project.thumbnailUrlSmall,
        imgAlt: project.imgAlt,
        projectId: project.projectId,
        projectName: project.projectName,
        id: project.id
      }));
      res.send(thumbnails);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects."
      });
    });
};
exports.projectsThumbnails = (req, res) => {
  Project.find()
    .then(projects => {
      const thumbnails = projects.map((project) => ({
        thumbnailUrlLarge: project.thumbnailUrlLarge,
        thumbnailUrlSmall: project.thumbnailUrlSmall,
        imgAlt: project.imgAlt,
        projectId: project.projectId,
        projectName: project.projectName,
        id: project.id
      }));
      res.send(thumbnails);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects."
      });
    });
};

exports.getNextProjectDetails = (req, res) => {
  Project.find()
    .then(projects => {
      const currentProjectId = req.params.id;
      const projectIndex = projects.findIndex(project => project.projectId === currentProjectId);
      let nextProject;
      if (projectIndex + 1 > projects.length - 1) {
        nextProject = projects[0];
      } else {
        nextProject = projects[projectIndex + 1];
      }
      res.send(nextProject);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects."
      });
    });
};
exports.getPrevProjectDetails = (req, res) => {
  Project.find()
    .then(projects => {
      const currentProjectId = req.params.id;
      const projectIndex = projects.findIndex(project => project.projectId === currentProjectId);
      let prevProject;
      if (projectIndex - 1 < 0) {
        prevProject = projects[projects.length - 1];
      } else {
        prevProject = projects[projectIndex - 1];
      }
      res.send(prevProject);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects."
      });
    });
};
// Find a single Project with an id
exports.getProjectDetails = (req, res) => {
  const constProjId = req.params.id;

  Project.find({"projectId": constProjId})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Project with id " + id });
      else res.send(data[0]);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Project.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found!`
        });
      } else res.send({ message: "Project was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Project with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Project.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
        });
      } else {
        res.send({
          message: "Project was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Project with id=" + id
      });
    });
};

// Delete all Projects from the database.
exports.deleteAll = (req, res) => {
  Project.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Projects were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Projects."
      });
    });
};

// Find all published Project
exports.findAllPublished = (req, res) => {
  Project.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Projects."
      });
    });
};
