module.exports = app => {
  const projects = require("../controllers/projects.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", projects.create);

  // Retrieve all projects
  router.get("/", projects.findAll);
  router.get("/thumbnails/homepage", projects.projectsOverview);
  router.get("/thumbnails/workpage", projects.projectsThumbnails);
  router.get("/projectDetails/:id", projects.getProjectDetails);
  router.get("/projectDetails/next/:id", projects.getNextProjectDetails);
  router.get("/projectDetails/prev/:id", projects.getPrevProjectDetails);

  // Retrieve a single Tutorial with id

  // Update a Tutorial with id
  // router.put("/:id", projects.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", projects.delete);

  // // Create a new Tutorial
  // router.delete("/", projects.deleteAll);

  app.use("/api/v1", router);
};
