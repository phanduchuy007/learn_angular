export class Project{
    code: string;
    name: string;
    customerName: string;
    description: string;
    leader: string;

    constructor(code: string, name: string, customerName: string, description: string, leader: string){
        this.code = code;
        this.name = name;
        this.customerName = customerName;
        this.description = description;
        this.leader = leader;
    }
}
