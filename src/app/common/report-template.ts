export class ReportTemplate{
    id: number;
    name: string;
    createDate: string;
    createBy: string;
    description: string;
    fields: string[];

    constructor(id: number, name: string, createDate: string, createBy: string, description: string, fields: string[]){
        this.id = id;
        this.name = name;
        this.createDate = createDate;
        this.createBy = createBy;
        this.description = description;
        this.fields = fields;
    }
}
