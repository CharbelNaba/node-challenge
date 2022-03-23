import User from "./data_objects/IUser";
import db from "@nc/utils/db";

export default class UserService{

    public static async delete(id: string): Promise<object> {
        try {
            const deletedId: number = await db.User.destroy({where: {id: id}});
            return deletedId > 0 ? {message: "success"} : {message: "error"};
        } catch (error) {
            return {message: "error"};
        }        
    }

    public static async findAll(): Promise<Array<User>> {
        try {
            const userData: Array<User> = await db.User.findAll();
            return userData;
        } catch (error) {
            return null;
        }        
    }

    public static async findById(id: string): Promise<User> {
        try {
            return await db.User.findOne({where: {id: id}});
        } catch (error) {
            return null;
        }       
    }
}