import { Model, Sequelize, STRING } from 'sequelize';


export class UserModel extends Model {
    public id: string;
    public first_name: string;
    public last_name: string;
    public company_name: string;
    public ssn: string;
}

export function UserModelInit(sequelize: Sequelize): void {
    UserModel.init(
        {
            id: {
                type: STRING,
                primaryKey: true
            },
            first_name: {
                type: STRING,
                allowNull: false
            },
            last_name: {
                type: STRING,
                allowNull: false
            },
            company_name: {
                type: STRING,
                allowNull: false
            },
            ssn: {
                type: STRING,
                allowNull: false
            }
        }, 
        {
            sequelize,
            modelName: 'user',
            timestamps: false   
        }
    );
}   