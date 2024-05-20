"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodoDto = void 0;
class UpdateTodoDto {
    constructor(id, text, completedAt) {
        this.id = id;
        this.text = text;
        this.completedAt = completedAt;
    }
    get values() {
        const objValues = {};
        if (this.text)
            objValues.text = this.text;
        if (this.completedAt)
            objValues.completedAt = this.completedAt;
        return objValues;
    }
    static update(props) {
        const { id, text, completedAt } = props;
        if (isNaN(id))
            return ['Id must be a valid number'];
        let newCompletedAt = completedAt;
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (newCompletedAt.toString() === "Invalid Date") {
                return ["CompletedAt must be a valid date", undefined];
            }
        }
        return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
    }
}
exports.UpdateTodoDto = UpdateTodoDto;
