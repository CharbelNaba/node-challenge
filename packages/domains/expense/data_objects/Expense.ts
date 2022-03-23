import IExpense from "./IExpense"
export default class Expense implements IExpense{
    constructor(public id:string, public merchant_name: string, public amount_in_cents: number, public currency: string, public user_id: string, public date_created: Date, public status: string) {}
}