import { Router } from "express";
import { TodosController } from "./controller";
import { TodoRepositoryImpl } from '../../infraestructure/repositories/todo.repository.impl';
import { TodoDatasourceImpl } from "../../infraestructure/datasources/todo.datasource.impl";


export class TodoRoutes{

    static get routes() : Router {
        const router = Router();
        const todoRepository = new TodoRepositoryImpl(
            new TodoDatasourceImpl
        )
        const todoController = new TodosController(todoRepository)
        
        router.get('/',todoController.getTodos)
        router.get('/:id',todoController.getTodoById)

        router.post('/',todoController.createTodo)
        router.put('/:id',todoController.updateTodo)
        router.delete('/:id',todoController.deleteTodo)

        return router;
    }
}