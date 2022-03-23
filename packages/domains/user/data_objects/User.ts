import IUser from "./IUser"
export default class User implements IUser{
    constructor(public id:string, public first_name: string, public last_name: string, public company_name: string, public ssn: string) {}
}