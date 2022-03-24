import { IOptions } from './IOptions';
import Expense from "./data_objects/Expense";
import db from "@nc/utils/db";

export default class ExpenseService{
    private static getPagingData(data, page, limit){
        const { count: totalItems, rows: expenses } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, expenses, totalPages, currentPage };
    }

    public static async delete(id: string): Promise<object> {
        try {
            const deletedId: number = await db.Expense.destroy({where: {id: id}});
            return deletedId > 0 ? {message: "success"} : {message: "error"};
        } catch (error) {
            return {message: "error"};
        }        
    }

    public static async findAll(options:IOptions) {
        try {
            const limit = options.limit
            const offset = options.offset
            const page = options.page
            const expenseData = await db.Expense.findAndCountAll({limit,offset}).then(data=>{
                return this.getPagingData(data,page,limit)
            });
            return expenseData;
        } catch (error) {
            return null;
        }        
    }

    public static async findAllByUserID(id:string, options:IOptions) {
        try {
            const limit = options.limit
            const offset = options.offset
            const page = options.page
            const expenseData= await db.Expense.findAndCountAll({limit, offset, where: {user_id:id}}).then(data=>{
                return this.getPagingData(data,page,limit)
            });
            return expenseData;
        } catch (error) {
            return null;
        }        
    }

    public static async findAllByUserIDAndFilter(id:string, options:IOptions) {
        try {
            const limit = options.limit
            const offset = options.offset
            const page = options.page
            const expenseData = await db.Expense.findAndCountAll({limit, offset, where: {user_id:id,[options.filterColumnName]:options.filterValue}}).then(data=>{
                return this.getPagingData(data,page,limit)
            });
            return expenseData;
        } catch (error) {
            return null;
        }        
    }

    public static async findAllAndFilter(options:IOptions) {
        try {
            const limit = options.limit
            const offset = options.offset
            const page = options.page
            const expenseData= await db.Expense.findAndCountAll({limit, offset, where: {[options.filterColumnName]:options.filterValue}}).then(data=>{
                return this.getPagingData(data,page,limit)
            });
            return expenseData;
        } catch (error) {
            return null;
        }        
    }

    public static async findAllByUserIdAndSort(id:string ,options:IOptions) {
        try {
            const limit = options.limit
            const offset = options.offset
            const page = options.page
            const expenseData = await db.Expense.findAndCountAll({
                limit,
                offset,
                where:{user_id:id},
                order: [[options.sortColumnName,options.direction]]
            }).then(data=>{
                return this.getPagingData(data,page,limit)
            });
            return expenseData;
        } catch (error) {
            return null;
        }        
    }

    public static async findAllAndSort(options:IOptions) {
        try {
            const limit = options.limit
            const offset = options.offset
            const page = options.page
            const expenseData = await db.Expense.findAndCountAll({
                limit,
                offset,
                order: [[options.sortColumnName,options.direction]]
            }).then(data=>{
                return this.getPagingData(data,page,limit)
            });
            return expenseData;
        } catch (error) {
            return null;
        }        
    }

    public static async findAllByUserIdSortAndFilter(id:string, options:IOptions) {
        try {
            const limit = options.limit
            const offset = options.offset
            const page = options.page
            const expenseData = await db.Expense.findAndCountAll({
                limit,
                offset,
                where:{user_id:id,[options.filterColumnName]:options.filterValue},
                order: [[options.sortColumnName,options.direction]]
            }).then(data=>{
                return this.getPagingData(data,page,limit)
            });
            return expenseData;
        } catch (error) {
            return null;
        }        
    }

    public static async findAllSortAndFilter(options:IOptions) {
        try {
            const limit = options.limit
            const offset = options.offset
            const page = options.page
            const expenseData = await db.Expense.findAndCountAll({
                limit,
                offset,
                where:{[options.filterColumnName]:options.filterValue},
                order: [[options.sortColumnName,options.direction]]
            }).then(data=>{
                return this.getPagingData(data,page,limit)
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