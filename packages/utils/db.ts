import { ExpenseModel, ExpenseModelInit } from '@nc/domain-expense/ExpenseModel';
import config from 'config';
import { Sequelize } from 'sequelize';
import { UserModel, UserModelInit } from '@nc/domain-user/UserModel';

export let sequelize;
sequelize = new Sequelize(`postgres://${config.db.user}@${config.db.host}:${config.db.port}/${config.db.database}`);

UserModelInit(sequelize);
ExpenseModelInit(sequelize)

const db = {
  sequelize,
  Sequelize,
  User: UserModel,
  Expense: ExpenseModel
}

export default db;
