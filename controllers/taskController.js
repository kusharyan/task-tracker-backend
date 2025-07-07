const Task = require('../models/Task');
const logger = require('../logger');

const getTasks = async(req, res)=> {
  try{
    const tasks = await Task.find({userId: req.userId});
    logger.info(`Tasks fetched!`);
    res.status(200).send(tasks);
  } catch(error){
    logger.error(`Error Fetching tasks ${error.message}`);
    return res.status(500).send({error: "Error Fetching Tasks!"});
  }
}

const createTask = async(req, res)=> {
  const { name, description, completed } = req.body;
  try{ 
    const task = await Task.create({name, description, completed, userId: req.userId});
    logger.info(`Task Created Succesfully`);
    return res.status(201).send(task);
  } catch(error){
    logger.error(`Error Creating Task! ${error.message}`);
    return res.status(500).send({error: 'Error Creating Task!'})
  }
};

const updateTask = async(req, res)=> { 
  const { name, description, completed, userId } = req.body;
  try{
    const task = await Task.findByIdAndUpdate(
      {_id: req.params.id},
      {name, description, completed, userId: req.userId}
    );
    if (!task) return res.status(404).send({message: 'Task Not found!'});
    logger.info(`Task Updated Succesfully`);
    return res.status(200).send(task);
  } catch(error) {
    logger.error(`Error Updating Task! ${error.message}`);
    return res.status(500).send({error: "Error Updating Task"});
  }
};

const deleteTask = async(req, res) => {
  try{
    const task = await Task.deleteOne(
      {_id: req.params.id},
    );
    if(!task) return res.status(404).send({message: 'Task not found!'});
    logger.info(`Task Deleted Succesfully`);
    return res.status(200).send(task);
  } catch (error){
    logger.error(`Error Delelting Task! ${error.message}`);
    return res.status(500).send({error: "Error Delelting Task"});
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTasks
}