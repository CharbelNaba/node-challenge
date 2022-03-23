import { ApiError } from '@nc/utils/errors';
import { Router } from 'express';
import { to } from '@nc/utils/async';
import { getUserExpenses } from '../userExpensesModel';
import { IOptions } from '../IOptions';

export const router = Router();

router.get('/get-user-expenses', async (req, res, next) => {
  let options:IOptions = {}
  let expenseError
  let userExpenseDetails
  const columns = ["id","merchant_name","amount_in_cents","currency","user_id","date_created","status"]
  const filterColumns:string[] = columns.map(col=> `filter_${col}`)
  const sortColumns = columns.map(col=> `sort_${col}`)
  
  if (req.query?.filter && req.query?.sort){
    const filterColumn = filterColumns.find(c=>req.query[c]!==undefined)
    const sortColumn = sortColumns.find(c=>req.query[c]!==undefined)
    options.filter = true
    options.sort = true
    options.filterColumnName = filterColumn.substring(filterColumn.indexOf("_")+1)
    options.sortColumnName = sortColumn.substring(sortColumn.indexOf("_")+1)
    options.direction = req.query[sortColumn] as string
    options.filterValue = req.query[filterColumn] as string
  }
  else if (req.query?.filter){
    const filterColumn = filterColumns.find(c=>req.query[c]!==undefined)
    options.filter = true
    options.sort = false
    options.filterColumnName = filterColumn.substring(filterColumn.indexOf("_")+1)
    options.filterValue=req.query[filterColumn] as string
  }
  else if (req.query?.sort){
    const sortColumn = sortColumns.find(c=>req.query[c]!==undefined)
    options.filter = false
    options.sort = true
    options.sortColumnName = sortColumn.substring(sortColumn.indexOf("_")+1)
    options.direction = req.query[sortColumn] as string
  }
  
  [expenseError, userExpenseDetails] = await to(getUserExpenses(req.query?.userId, options)); 

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get user expenses: ${expenseError}`, expenseError.title, req));
  }

  if (!userExpenseDetails) {
    return res.json({});
  }
  return res.json(userExpenseDetails);
});
