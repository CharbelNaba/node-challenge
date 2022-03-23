import User from '../data_objects/User';
import UserService from '../UserService';

export async function readUser(userId) {
  const result: User = await UserService.findById((userId));
  return result
}
