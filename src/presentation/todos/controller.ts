import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos"
import { TodoRepository } from "../../domain"

export class TodosController {
    // *DI
    constructor(
        private readonly todoRepository: TodoRepository,
    ){}

    public getTodos = async(req:Request,res:Response) => {
        const todos = await this.todoRepository.getAll()
        res.json(todos)
    }

    public getTodoById = async (req:Request,res:Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: "Id argument is not a number"})
        
        try {
            const todo = await this.todoRepository.findById(id)
            res.json(todo)
        } catch (error) {
            res.status(404).json({error})     
        }
       
        
    }

    public createTodo = async(req:Request,res:Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if(error) return res.status(400).json({error});
        
        const newTodo = await this.todoRepository.saveTodo(createTodoDto!)
        res.json(newTodo)
    
    
    }

    public updateTodo =async (req: Request,res: Response) => {
        const id = +req.params.id;

        const [error,updateTodoDto] = UpdateTodoDto.update({
            ...req.body,
            id
        })
        if(error) return res.status(400).json({error});

        try {
            const updatedTodo = await this.todoRepository.updateById(updateTodoDto!)
            res.json(updatedTodo)
        } catch (error) {
            res.status(404).json({error})
        }
        
    }

    public deleteTodo =async (req: Request,res:Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: "Id argument is not a number"});
        
        try {
            const todo = await this.todoRepository.deleteById(id)
            res.json(todo)
        } catch (error) {
            res.status(404).json({error})
        }
    }

}