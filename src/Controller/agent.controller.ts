import { Request, Response } from 'express';
import { Agent } from "../Model/Agent";
import { IResponseData } from '../Model/Interfaces';

export class AgentController {
    async getAllAgent(_req: Request, res: Response): Promise<void> {
        try {
            const agents = await Agent.findAll();

            const response: IResponseData<Agent[]> = {
                data: agents
            }

            res.json(response);
        } catch (err) {
            res.status(500).json({ message: 'Failed to fetch agents' });
        }
    }

    async getAgentById(req: Request, res: Response): Promise<void> {
        const agentId: number = parseInt(req.params.id, 10);

        try {
            const agent = await Agent.findByPk(agentId);

            if (!agent) {
                res.status(404).json({ message: 'Agent not found' });
                return;
            }

            res.status(200).json(agent);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async createAnAgent(req: Request, res: Response): Promise<void> {
        const { firstName, lastName } = req.body;

        try {
            const agent = await Agent.create({
                firstName,
                lastName,
            });

            res.status(201).json(agent);
        } catch (err) {
            res.status(500).json({ message: `Failed to create agent: ${err}` });
        }
    }

    async updateAnAgent(req: Request, res: Response): Promise<void> {
        const agentId: number = parseInt(req.params.id, 10);
        const { firstName, lastName } = req.body;

        try {
            const agent = await Agent.findByPk(agentId);

            if (!agent) {
                res.status(404).json({ message: 'Not found.' });
                return;
            }

            agent.firstName = firstName;
            agent.lastName = lastName;

            await agent.save();
            res.status(200).json(agent);
        } catch (err) {
            res.status(500).json({ message: `Failed to update an agent: ${err}` });
        }
    }

    async deleteAnAgent(req: Request, res: Response): Promise<void> {
        const agentId: number = parseInt(req.params.id, 10);

        try {
            const agent = await Agent.findByPk(agentId);

            if (!agent) {
                res.status(404).json({ message: 'Not Found.' });
                return;
            }

            await agent.destroy();
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ message: `Failed to delete agent ${err}` });
        }
    }
}

export const agentController = new AgentController();