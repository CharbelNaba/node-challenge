import { IOptions } from './IOptions';
import { format } from './formatter';
import { readUserExpenses } from './data/db-user-expenses';
import { to } from '@nc/utils/async';
import Expense from '@nc/domain-expense/data_objects/Expense';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

export async function getUserExpenses(userId, options:IOptions, userSpecific:boolean, idSpecific): Promise<Expense> {
  if (!userId && userSpecific) {
    throw BadRequest('userId property is missing.');
  }
  if (idSpecific && !options.expenseId){
    throw BadRequest('expense property is missing.');
  }

  if (options.filter && (options.filterColumnName === "")){
    throw BadRequest('filter_${column_name} property is missing.');
  }
  if (options.sort && (options.sortColumnName=== "")){
    throw BadRequest('sort_${column_name} property is missing.')
  }
  const [dbError, rawExpense] = await to(readUserExpenses(userId,options,userSpecific,idSpecific));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpense) {
    throw NotFound(`Could not find expenses for user_id ${userId}`);
  }
  
  return format(rawExpense);
}
