import { ApiError } from '@nc/utils/errors';
import { Router } from 'express';
import { to } from '@nc/utils/async';
import { getUserExpenses } from '../model';

export const router = Router();

router.get('/get-user-expenses', async (req, res, next) => {
  const [expenseError, userExpenseDetails] = await to(getUserExpenses(req.query?.userId));

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get user expenses: ${expenseError}`, expenseError.title, req));
  }

  if (!userExpenseDetails) {
    return res.json({});
  }
  return res.json(userExpenseDetails);
});
