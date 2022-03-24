import { IOptions } from './../IOptions';
import ExpenseService from "../ExpenseService";

export async function readUserExpenses(userId,options:IOptions,userSpecific,idSpecific) {
  let result
  if (options?.sort && options?.filter){
    result = userSpecific ? await ExpenseService.findAllByUserIdSortAndFilter(userId,options):await ExpenseService.findAllSortAndFilter(options)
  }
  else if (options?.sort){
    result = userSpecific ? await ExpenseService.findAllByUserIdAndSort(userId,options):await ExpenseService.findAllAndSort(options)
  }
  else if (options?.filter){
      result = userSpecific ? await ExpenseService.findAllByUserIDAndFilter(userId,options) : await ExpenseService.findAllAndFilter(options)
  }
  else{
    if (idSpecific){
      result = await ExpenseService.findById(options.expenseId)
    }
    else{
      result = userSpecific ? await ExpenseService.findAllByUserID(userId,options) : await ExpenseService.findAll(options);
    }
  }
  return result 
}
