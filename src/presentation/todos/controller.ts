import { Request, Response } from "express"

export class TodosController {
    // *DI
    constructor(){}

    public getTodos = (req:Request,res:Response) => {
        res.json([
            {id: 1, text: 'Buy bread', createdAt: new Date()},
            {id: 2, text: 'Buy eggs', createdAt: null},
            {id: 3, text: 'Buy brebutterad', createdAt: new Date()},
        ])
    }
}