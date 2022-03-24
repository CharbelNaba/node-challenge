import User from '../data_objects/User';
import UserService from '../UserService';

export async function readUser(userId,idSpecific) {
  if (idSpecific){
    const result: User = await UserService.findById((userId));
    return result
  }
  else{
    const result: User[] = await UserService.findAll();
    console.log(`result is ${JSON.stringify(result)}`)
    return result
  }
}
