require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
// const YAML = require('yamljs');
// const swaggerDocument = YAML.load('./swagger.yaml');

const authRouter = require('./routes/authRoutes');
const taskRouter = require('./routes/taskRoutes');

const app = express();

app.use(cors());
const PORT = Number(process.env.PORT);
const mongoUrl = process.env.MONGO_URL;

async function startServer() {
  try{            
    await mongoose.connect(mongoUrl);
    console.log('Connected to the Database!');
  } catch (error) {
    console.error('Error Connecting to the database!', error);
    process.exit(1);
  }
};

app.use(express.json());

app.use('/api', authRouter);
app.use('/api/tasks', taskRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, ()=> { 
  startServer();
  console.log("Server started at PORT number 3000!");
});
