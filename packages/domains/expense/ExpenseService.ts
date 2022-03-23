import Expense from "./data_objects/Expense";
import db from "@nc/utils/db";

export default class ExpenseService{

    public static async delete(id: string): Promise<object> {
        try {
            const deletedId: number = await db.Expense.destroy({where: {id: id}});
            return deletedId > 0 ? {message: "success"} : {message: "error"};
        } catch (error) {
            return {message: "error"};
        }        
    }

    public static async findAll(): Promise<Array<Expense>> {
        try {
            const expenseData: Array<Expense> = await db.Expense.findAll();
            return expenseData;
        } catch (error) {
            return null;
        }        
    }

    public static async findAllByUserID(field: string, id:string): Promise<Array<Expense>> {
        try {
            const expenseData: Array<Expense> = await db.Expense.findAll({where: {[field]:id}});
            return expenseData;
        } catch (error) {
            return null;
        }        
    }

    public static async findAllByUserIDAndFilter(field: string, id:string, filterColumn:string,filterValue:string): Promise<Array<Expense>> {
        try {
            const expenseData: Array<Expense> = await db.Expense.findAll({where: {[field]:id,[filterColumn]:filterValue}});
            return expenseData;
        } catch (error) {
            return null;
        }        
    }

    public static async findAllAndSort(column:string, direction:string, id:string): Promise<Array<Expense>> {
        try {
            const expenseData: Array<Expense> = await db.Expense.findAll({
                where:{user_id:id},
                order: [[column,direction]]
            });
            return expenseData;
        } catch (error) {
            return null;
        }        
    }

    public static async findAllSortAndFilter(sortColumn:string, direction:string, id:string, filterColumn:string,filterValue:string): Promise<Array<Expense>> {
        try {
            const expenseData: Array<Expense> = await db.Expense.findAll({
                where:{user_id:id,[filterColumn]:filterValue},
                order: [[sortColumn,direction]]
            });
            return expenseData;
        } catch (error) {
            return null;
        }        
    }

    public static async findById(id: string): Promise<Expense> {
        try {
            return await db.Expense.findOne({where: {id: id}});
        } catch (error) {
            return null;
        }       
    }
}