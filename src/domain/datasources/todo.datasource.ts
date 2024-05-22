import { CreateTodoDto, UpdateTodoDto } from "../dtos"
import { TodoEntity } from "../entities/todo.entity";

export interface TodoDatasource {
    saveTodo(createTodoDto:CreateTodoDto):Promise<TodoEntity>;
    
    // todo: paginacion
    getAll():Promise<TodoEntity[]>;

    findById(id:number):Promise<TodoEntity>;
    updateById(updateTodoDto:UpdateTodoDto):Promise<TodoEntity>;
    deleteById(id:number):Promise<TodoEntity>;
}
