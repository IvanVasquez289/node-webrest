export class UpdateTodoDto{

    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ){}

    get values(){
        const objValues: {[key:string]:any} = {}
        if(this.text) objValues.text = this.text;
        if(this.completedAt) objValues.completedAt = this.completedAt;
        return objValues;
    }
    static update(props: {[key:string]:any}): [string?, UpdateTodoDto?] {
        const {id,text,completedAt} = props;
        if(isNaN(id)) return ['Id must be a valid number']
        
        let newCompletedAt = completedAt;
        if(completedAt){
            newCompletedAt = new Date(completedAt);
            if(newCompletedAt.toString() === "Invalid Date"){
                return ["CompletedAt must be a valid date", undefined]
            }
        }
       
        return [undefined, new UpdateTodoDto(id,text,newCompletedAt)]
    }
}