import { format } from './formatter';
import { readUserExpenses } from './data/db-user-expenses';
import { to } from '@nc/utils/async';
import Expense from '@nc/domain-expense/data_objects/Expense';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

export async function getUserExpenses(userId,columnName?,direction?): Promise<Expense> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rawExpense] = columnName ? await to(readUserExpenses(userId,columnName,direction)) : await to(readUserExpenses(userId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpense) {
    throw NotFound(`Could not find expenses for user_id ${userId}`);
  }
  
  return format(rawExpense);
}
