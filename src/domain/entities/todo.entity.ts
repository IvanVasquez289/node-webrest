export class TodoEntity{
    constructor(
        public id: number,
        public text: string,
        public completedAt?: Date| null,
    ){}

    get isCompleted() {
        return !!this.completedAt;
    }

    public static fromObject(object: {[key:string]:any}): TodoEntity{
        const {id,text,completedAt} = object;
        if(!id) throw new Error("Id is required");
        if(!text) throw new Error("Text is required");

        let newCompletedAt = completedAt;
        if(completedAt){
            newCompletedAt = new Date(completedAt)
            if(newCompletedAt.toString() === "Invalid Date"){
                throw new Error("Invalid Date")
            }
        }
        const todo = new TodoEntity(id,text,newCompletedAt)
        return todo
    }
}