import { IOptions } from './../IOptions';
import Expense from "../data_objects/Expense";
import ExpenseService from "../ExpenseService";

export async function readUserExpenses(userId,options:IOptions) {
  let result: Expense[]
  if (options?.sort && options?.filter){
    result = await ExpenseService.findAllSortAndFilter(options.sortColumnName,options.direction,userId,options.filterColumnName,options.filterValue)
  }
  else if (options?.sort){
    result = await ExpenseService.findAllAndSort(options.sortColumnName, options.direction, userId)
  }
  else if (options?.filter){
      result = await ExpenseService.findAllByUserIDAndFilter("user_id",userId,options.filterColumnName,options.filterValue)
  }
  else{
    result = await ExpenseService.findAllByUserID("user_id",userId);
  }
  return result 
}
