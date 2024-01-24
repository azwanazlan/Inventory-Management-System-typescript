import { Request, Response } from 'express';
import { Item } from '../Model/Item';
import { IResponseData } from '../Model/Interfaces';


export class ItemController {
    async getAllItem(_req: Request, res: Response): Promise<void> {
        try {
            const items = await Item.findAll();

            const response: IResponseData<Item[]> = {
                data: items
            }

            res.json(response);
        } catch (err) {
            res.status(500).json({ message: 'Failed to fetch items' });
        }
    }

    async getItemById(req: Request, res: Response): Promise<void> {
        const itemId: number = parseInt(req.params.id, 10);

        try {
            const item = await Item.findByPk(itemId);

            if (!item) {
                res.status(404).json({ message: 'Item not found' });
                return;
            }

            res.status(200).json(item);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async createAnItem(req: Request, res: Response): Promise<void> {
        const { name, price, quantity, description, category } = req.body;

        try {
            const item = await Item.create({
                name,
                price,
                quantity,
                description,
                category,
            });

            res.status(201).json(item);
        } catch (err) {
            res.status(500).json({ message: `Failed to create item: ${err}` });
        }
    }

    async updateAnItem(req: Request, res: Response): Promise<void> {
        const itemId: number = parseInt(req.params.id, 10);
        const { name, price, quantity, description, category } = req.body;

        try {
            const item = await Item.findByPk(itemId);

            if (!item) {
                res.status(404).json({ message: 'Not found.' });
                return;
            }

            item.name = name;
            item.price = price;
            item.quantity = quantity;
            item.description = description;
            item.category = category;
            item.price = price;

            await item.save();
            res.status(200).json(item);
        } catch (err) {
            res.status(500).json({ message: `Failed to update an item: ${err}` });
        }
    }

    async deleteAnItem(req: Request, res: Response): Promise<void> {
        const itemId: number = parseInt(req.params.id, 10);

        try {
            const item = await Item.findByPk(itemId);

            if (!item) {
                res.status(404).json({ message: 'Not Found.' });
                return;
            }

            await item.destroy();
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ message: `Failed to delete item ${err}` });
        }
    }
}

export const itemController = new ItemController();