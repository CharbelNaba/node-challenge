import { Model, Sequelize, STRING, INTEGER, DATE } from 'sequelize';

export class ExpenseModel extends Model {
    id: string
    merchant_name: string
    amount_in_cents: number
    currency: string
    user_id: string
    date_created: Date
    status: string
}

export function ExpenseModelInit(sequelize: Sequelize): void {
    ExpenseModel.init(
        {
            id: {
                type: STRING,
                primaryKey: true
            },
            merchant_name: {
                type: STRING,
                allowNull: false
            },
            amount_in_cents: {
                type: INTEGER,
                allowNull: false
            },
            currency: {
                type: STRING,
                allowNull: false
            },
            user_id: {
                type: STRING,
                allowNull: false
            },
            date_created: {
                type: DATE,
                allowNull: false
            },
            status: {
                type: STRING,
                allowNull: false
            }
        }, 
        {
            sequelize,
            modelName: 'expense',
            timestamps: false   
        }
    );
} 