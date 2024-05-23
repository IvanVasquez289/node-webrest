import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";
import { UpdateTodoDto } from '../../dtos/todos/update-todo.dto';

interface UpdateTodoUseCase {
    execute: (dto: UpdateTodoDto) => Promise<TodoEntity> 
}

export class UpdateTodo implements UpdateTodoUseCase {
    constructor(private readonly todoRepository: TodoRepository) {}
    execute (dto: UpdateTodoDto):Promise<TodoEntity>  {
        return this.todoRepository.updateById(dto)
    };

}