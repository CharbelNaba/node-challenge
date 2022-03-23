import { IOptions } from './IOptions';
import { format } from './formatter';
import { readUserExpenses } from './data/db-user-expenses';
import { to } from '@nc/utils/async';
import Expense from '@nc/domain-expense/data_objects/Expense';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

export async function getUserExpenses(userId,options:IOptions): Promise<Expense> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rawExpense] = await to(readUserExpenses(userId,options));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpense) {
    throw NotFound(`Could not find expenses for user_id ${userId}`);
  }
  
  return format(rawExpense);
}
