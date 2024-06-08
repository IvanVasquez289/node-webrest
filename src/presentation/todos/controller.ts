import { Request, Response } from "express"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos"
import { CreateTodo, DeleteTodo, GetTodo, TodoRepository, UpdateTodo } from "../../domain"
import { GetTodos } from "../../domain/use-cases/todo/get-todos"

export class TodosController {
    // *DI
    constructor(
        private readonly todoRepository: TodoRepository,
    ){}

    public getTodos = (req:Request,res:Response) => {
        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => {res.json(todos)})
            .catch(error => res.status(404).json({error}))
    }

    public getTodoById = async (req:Request,res:Response) => {
        const id = +req.params.id;
        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(404).json({error}))
    }

    public createTodo = async(req:Request,res:Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if(error) return res.status(400).json({error});
        
        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => res.status(201).json(todo))
            .catch(error => res.status(400).json({error}))

    }

    public updateTodo =async (req: Request,res: Response) => {
        const id = +req.params.id;

        const [error,updateTodoDto] = UpdateTodoDto.update({
            ...req.body,
            id
        })
        if(error) return res.status(400).json({error});

        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(404).json({error}))
    }

    public deleteTodo =async (req: Request,res:Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: "Id argument is not a number"});
        
        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({error}))
    }

}