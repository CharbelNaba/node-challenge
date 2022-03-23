import { ApiError } from '@nc/utils/errors';
import { Router } from 'express';
import { to } from '@nc/utils/async';
import { getUserExpenses } from '../userExpensesModel';

export const router = Router();

router.get('/get-user-expenses', async (req, res, next) => {
  const columns = ["id","merchant_name","amount_in_cents","currency","user_id","date_created","status"]
  const column = columns.find(c=>req.query[c]!==undefined)
  const [expenseError, userExpenseDetails] = req.query[column] ? await to(getUserExpenses(req.query?.userId, column, req.query[column])) : await to(getUserExpenses(req.query?.userId)); 

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get user expenses: ${expenseError}`, expenseError.title, req));
  }

  if (!userExpenseDetails) {
    return res.json({});
  }
  return res.json(userExpenseDetails);
});
