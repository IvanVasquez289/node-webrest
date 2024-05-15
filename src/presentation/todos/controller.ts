import { Request, Response } from "express"

const TODOS = [
    {id: 1, text: 'Buy bread', completedAt: new Date()},
    {id: 2, text: 'Buy eggs', completedAt: null},
    {id: 3, text: 'Buy brebutterad', completedAt: new Date()},
]

export class TodosController {
    // *DI
    constructor(){}

    public getTodos = (req:Request,res:Response) => {
        res.json(TODOS)
    }

    public getTodoById = (req:Request,res:Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: "Id argument is not a number"})
        const todo = TODOS.find(todo => todo.id == id);

        (todo)
            ?   res.json({todo})
            :   res.status(404).json({error: `TODO with id:${id} not found`})
        
    }

    public createTodo = (req:Request,res:Response) => {
        const {text} = req.body
        if(!text) return res.status(400).json({error: 'Text property is required'})
        
        const newTodo = {
            id: TODOS.length + 1,
            text: text,
            completedAt: new Date()
        }
        TODOS.push(newTodo)
        res.json(newTodo)
    }

    public updateTodo = (req: Request,res: Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: "Id argument is not a number"});

        const todo = TODOS.find(todo => todo.id == id);
        if(!todo) return res.status(404).json({error: `TODO with id:${id} not found`});

        const {text,completedAt} = req.body;
        
        todo.text = text || todo.text;

        (completedAt == 'null')
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt || todo.completedAt);
        
        // ! OJO, REFERENCIA, esto actualiza nuestro arreglo por que los objs en js pasan por referencia
        res.json(todo)
    }

    public deleteTodo = (req: Request,res:Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: "Id argument is not a number"});
        
        const todo = TODOS.find(todo => todo.id == id);
        if(!todo) return res.status(404).json({error: `TODO with id:${id} not found`});
        
        TODOS.splice(TODOS.indexOf(todo),1)

        res.json(TODOS)
    }

}