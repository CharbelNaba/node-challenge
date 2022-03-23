import Expense from "../data_objects/Expense";
import ExpenseService from "../ExpenseService";

export async function readUserExpenses(userId,columnName?,direction?) {
  const result: Expense[] = columnName ? await ExpenseService.findAllAndSort(columnName, direction, userId): await ExpenseService.findAllByUserID("user_id",userId);
  return result 
}
