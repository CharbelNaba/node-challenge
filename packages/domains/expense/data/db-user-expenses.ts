import { IOptions } from './../IOptions';
import ExpenseService from "../ExpenseService";

export async function readUserExpenses(userId,options:IOptions,userSpecific,idSpecific) {
  let result
  if (options?.sort && options?.filter){
    result = readUserSortedAndFiltered(userSpecific, userId, options)
  }
  else if (options?.sort){
    result = readUserSorted(userSpecific, userId, options)
  }
  else if (options?.filter){
    result = readUserFiltered(userSpecific, userId, options)
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

async function readUserSortedAndFiltered(userSpecific, userId, options){
  const res= userSpecific ? await ExpenseService.findAllByUserIdSortAndFilter(userId,options):await ExpenseService.findAllSortAndFilter(options)
  return res
}
async function readUserSorted(userSpecific, userId, options){
  const res= userSpecific ? await ExpenseService.findAllByUserIdAndSort(userId,options):await ExpenseService.findAllAndSort(options)
  return res
}
async function readUserFiltered(userSpecific, userId, options){
  const res= userSpecific ? await ExpenseService.findAllByUserIDAndFilter(userId,options) : await ExpenseService.findAllAndFilter(options)
  return res
}