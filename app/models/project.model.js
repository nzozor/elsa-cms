module.exports = mongoose => {
  var schema = mongoose.Schema({
    projectId: {
      type: String,
      required: true
    },
    projectName: {
      type: String,
      required: true
    },
    projectDescription: {
      type: String,
      required: true
    },
    clientName: {
      type: String,
      required: true
    },
    clientUrl: {
      type: String,
      required: false
    },
    services: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    mainImgUrlSmall: {
      type: String,
      required: true
    },
    mainImgUrlLarge: {
      type: String,
      required: true
    },
    thumbnailUrlSmall: {
      type: String,
      required: true
    },
    thumbnailUrlLarge: {
      type: String,
      required: true
    },
    galleryImgs:  {
      type: [mongoose.Schema.Types.Mixed],
      required: true
    },
    imgAlt: {
      type: String,
      required: true
    }
  }, {
    timestamps: true
  });

  schema.method("toJSON", function () {
    const {
      __v,
      _id,
      ...object
    } = this.toObject();
    object.id = _id;
    return object;
  });

  const Project = mongoose.model("project", schema);
  return Project;
};