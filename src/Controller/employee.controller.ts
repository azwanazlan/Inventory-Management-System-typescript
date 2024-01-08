import { Request, Response } from 'express';
import { Employee } from '../Model/Employee';
import { IResponseData } from '../Model/Interfaces';


export class EmployeeController {
  async getAllEmployee(_req: Request, res: Response): Promise<void> {
    try {
      const employees = await Employee.findAll();
      
      const response: IResponseData<Employee[]> = {
        data: employees
      }

      res.json(response);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch employees' });
    }
  }
  
  async getEmployeeById(req: Request, res: Response): Promise<void> {
    const employeeId: number = parseInt(req.params.id, 10);
  
    try {
      const employee = await Employee.findByPk(employeeId);
  
      if (!employee) {
        res.status(404).json({ message: 'Employee not found' });
        return;
      }
  
      res.status(200).json(employee);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
  async createAnEmployee(req: Request, res: Response): Promise<void> {
    const { firstName, lastName } = req.body;
  
    try {
      const employee = await Employee.create({
        firstName,
        lastName,
      });
  
      res.status(201).json(employee);
    } catch (err) {
      res.status(500).json({ message: `Failed to create employee: ${err}` });
    }
  }
  
  async updateAnEmployee(req: Request, res: Response): Promise<void> {
    const employeeId: number = parseInt(req.params.id, 10);
    const { firstName, lastName } = req.body;
  
    try {
      const employee = await Employee.findByPk(employeeId);
  
      if (!employee) {
        res.status(404).json({ message: 'Not found.' });
        return;
      }
  
      employee.firstName = firstName;
      employee.lastName = lastName;
  
      await employee.save();
      res.status(200).json(employee);
    } catch (err) {
      res.status(500).json({ message: `Failed to update an employee: ${err}` });
    }
  }
  
  async deleteAnEmployee(req: Request, res: Response): Promise<void> {
    const employeeId: number = parseInt(req.params.id, 10);
  
    try {
      const employee = await Employee.findByPk(employeeId);
  
      if (!employee) {
        res.status(404).json({ message: 'Not Found.' });
        return;
      }
  
      await employee.destroy();
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: `Failed to delete employee ${err}` });
    }
  }
}
  
export const employeeController = new EmployeeController();