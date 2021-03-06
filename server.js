const express = require("express");
const https = require("https");

const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');

const compression = require('compression');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a'});

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
// // app.use(express.static('public'));
app.use('/api/v1/', express.static('public'));

// // parse requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream}) ); // logging in file
app.use(morgan('combined')); // logging in console
require("./app/routes/project.routes")(app);


const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Nick restful Api." });
});

// const privateKey = fs.readFileSync('server.key');
// const certificate = fs.readFileSync('server.cert');
// set port, listen for requests
const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Http Server is running on port ${PORT}.`);
// });
// https.createServer({key: privateKey, cert:certificate}).listen(PORT, () => {
//   console.log(`Https Server is running on port ${PORT}.`);
// });

// app.use((req, res) => {
//   res.writeHead(200);
//   res.end("hello world\n");
// });


const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options,app).listen(PORT, () => {
  console.log(`Https Server is running on port ${PORT}.`);
});