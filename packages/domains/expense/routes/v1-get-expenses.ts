import { ApiError } from '@nc/utils/errors';
import { Router } from 'express';
import { to } from '@nc/utils/async';
import { getUserExpenses } from '../userExpensesModel';
import { IOptions } from '../IOptions';

export const router = Router();

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

function populateOptions(req):IOptions{
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  let options : IOptions = {
    limit:limit,
    offset: offset
  }
  const columns = ["id","merchant_name","amount_in_cents","currency","user_id","date_created","status"]
  const filterColumns:string[] = columns.map(col=> `filter_${col}`)
  const sortColumns = columns.map(col=> `sort_${col}`)
  
  if (req.query?.filter==="true" && req.query?.sort==="true"){
    const filterColumn = filterColumns.find(c=>req.query[c]!==undefined)
    const sortColumn = sortColumns.find(c=>req.query[c]!==undefined)
    options.filter = true
    options.sort = true
    options.filterColumnName = filterColumn ? filterColumn.substring(filterColumn.indexOf("_")+1) : ""
    options.sortColumnName = sortColumn ? sortColumn.substring(sortColumn.indexOf("_")+1) : ""
    options.direction = req.query[sortColumn] as string
    options.filterValue = req.query[filterColumn] as string
  }
  else if (req.query?.filter==="true"){
    const filterColumn = filterColumns.find(c=>req.query[c]!==undefined)
    options.filter = true
    options.sort = false
    options.filterColumnName = filterColumn ? filterColumn.substring(filterColumn.indexOf("_")+1) : ""
    options.filterValue=req.query[filterColumn] as string
  }
  else if (req.query?.sort==="true"){
    const sortColumn = sortColumns.find(c=>req.query[c]!==undefined)
    options.filter = false
    options.sort = true
    options.sortColumnName = sortColumn ? sortColumn.substring(sortColumn.indexOf("_")+1) : ""
    options.direction = req.query[sortColumn] as string
  }
  return options
}

router.get('/get-user-expenses', async (req, res, next) => {
  let options:IOptions = populateOptions(req)
  let expenseError
  let userExpenseDetails
  
  [expenseError, userExpenseDetails] = await to(getUserExpenses(req.query?.userId, options,true)); 

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get user expenses: ${expenseError}`, expenseError.title, req));
  }

  if (!userExpenseDetails) {
    return res.json({});
  }
  return res.json(userExpenseDetails);
});

router.get('/get-all-expenses', async (req, res, next) => {
  let options:IOptions = populateOptions(req)
  let expenseError
  let userExpenseDetails
  
  [expenseError, userExpenseDetails] = await to(getUserExpenses(req.query?.userId, options,false)); 

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get user expenses: ${expenseError}`, expenseError.title, req));
  }

  if (!userExpenseDetails) {
    return res.json({});
  }
  return res.json(userExpenseDetails);
});

