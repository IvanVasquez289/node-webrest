import { CreateTodoDto, TodoDatasource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {

    constructor(
        private readonly todoDatasource: TodoDatasource
    ){}

    saveTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.todoDatasource.saveTodo(createTodoDto)
    }
    getAll(): Promise<TodoEntity[]> {
        return this.todoDatasource.getAll()
    }
    findById(id: number): Promise<TodoEntity> {
        return this.todoDatasource.findById(id)
    }
    updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.todoDatasource.updateById(updateTodoDto)
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.todoDatasource.deleteById(id)
    }

}