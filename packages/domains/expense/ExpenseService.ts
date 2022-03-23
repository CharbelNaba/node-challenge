import { IOptions } from './IOptions';
import Expense from "./data_objects/Expense";
import db from "@nc/utils/db";

export default class ExpenseService{
    private static getPagingData(data, page, limit){
        const { count: totalItems, rows: tutorials } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, tutorials, totalPages, currentPage };
    }

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

    public static async findAllByUserID(id:string, options:IOptions): Promise<Array<Expense>> {
        try {
            const expenseData: Array<Expense> = await db.Expense.findAll({where: {user_id:id}});
            return expenseData;
        } catch (error) {
            return null;
        }        
    }

    public static async findAllByUserIDAndFilter(id:string, options:IOptions): Promise<Array<Expense>> {
        try {
            const expenseData: Array<Expense> = await db.Expense.findAll({where: {user_id:id,[options.filterColumnName]:options.filterValue}});
            return expenseData;
        } catch (error) {
            return null;
        }        
    }

    public static async findAllAndFilter(options:IOptions): Promise<Array<Expense>> {
        try {
            const expenseData: Array<Expense> = await db.Expense.findAll({where: {[options.filterColumnName]:options.filterValue}});
            return expenseData;
        } catch (error) {
            return null;
        }        
    }

    public static async findAllByUserIdAndSort(id:string ,options:IOptions): Promise<Array<Expense>> {
        try {
            const expenseData: Array<Expense> = await db.Expense.findAll({
                where:{user_id:id},
                order: [[options.sortColumnName,options.direction]]
            });
            return expenseData;
        } catch (error) {
            return null;
        }        
    }

    public static async findAllAndSort(options:IOptions): Promise<Array<Expense>> {
        try {
            const expenseData: Array<Expense> = await db.Expense.findAll({
                order: [[options.sortColumnName,options.direction]]
            });
            return expenseData;
        } catch (error) {
            return null;
        }        
    }

    public static async findAllByUserIdSortAndFilter(id:string, options:IOptions): Promise<Array<Expense>> {
        try {
            const expenseData: Array<Expense> = await db.Expense.findAll({
                where:{user_id:id,[options.filterColumnName]:options.filterValue},
                order: [[options.sortColumnName,options.direction]]
            });
            return expenseData;
        } catch (error) {
            return null;
        }        
    }

    public static async findAllSortAndFilter(options:IOptions): Promise<Array<Expense>> {
        try {
            const expenseData: Array<Expense> = await db.Expense.findAll({
                where:{[options.filterColumnName]:options.filterValue},
                order: [[options.sortColumnName,options.direction]]
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