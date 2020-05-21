const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var options = 
{
    origin : 'http://localhost:8080'
};

app.use(cors(options));

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const dbConfig = require('./app/config/db.cnf');
const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=>
  {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err =>
  {
    console.error("Connection error", err);
    process.exit();
  });

function initial() 
{
    Role.estimatedDocumentCount((err, count) => 
    {
      if (!err && count === 0) 
      {
        new Role(
        {
            name: "user"
        })
        .save(err => 
            {    
                if (err) 
                {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            }
        );
  
        new Role(
        {
            name: "moderator"
        })
        .save(err => 
            {
                if (err) {
                console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            }
        );
  
        new Role(
        {
            name: "admin"
        })
        .save(err => 
            {
                if (err) {
                console.log("error", err);
                }
  
                console.log("added 'admin' to roles collection");
            }
        );
    }
    });
}

// simple route
require('./app/routes/auth.route')(app);
require('./app/routes/user.route')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

