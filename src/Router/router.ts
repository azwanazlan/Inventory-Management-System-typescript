import express from "express";
import { employeeController } from "../Controller/employee.controller";
import { itemController } from "../Controller/item.controller";
import { agentController } from "../Controller/agent.controller";

export const router = express.Router();

router.get('/', (_req, res) => {
  const welcomeMessage: string = 'Welcome';
  const environmentVariables: NodeJS.ProcessEnv = process.env;

  res.json({
    message: welcomeMessage,
    environmentVariables: environmentVariables,
  });
});


router.get('/items', itemController.getAllItem);
router.get('/items/:id', itemController.getItemById);
router.post('/items', itemController.createAnItem);
router.patch('/items/:id', itemController.updateAnItem);
router.delete('/items/:id', itemController.deleteAnItem);

// EMPLOYEE
router.get('/employee', employeeController.getAllEmployee);
router.get('/employee/:id', employeeController.getEmployeeById);
router.post('/employee', employeeController.createAnEmployee);
router.patch('/employee/:id', employeeController.updateAnEmployee);
router.delete('/employee/:id', employeeController.deleteAnEmployee);

// AGENT
router.get('/agent', agentController.getAllAgent);
router.get('/agent/:id', agentController.getAgentById);
router.post('/agent', agentController.createAnAgent);
router.patch('/agent/:id', agentController.updateAnAgent);
router.delete('/agent/:id', agentController.deleteAnAgent);
