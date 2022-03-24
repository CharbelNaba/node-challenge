import { format, formatAll } from './formatter';
import { readUser } from './data/db-user';
import { to } from '@nc/utils/async';
import  User  from './data_objects/User';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

export async function getUserDetails(userId,idSpecific): Promise<User | User[]>{
  if (!userId && idSpecific) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rawUser] = await to(readUser(userId,idSpecific));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawUser) {
    throw NotFound(`Could not find user with id ${userId}`);
  }
  if (idSpecific){
    return format(rawUser);
  }
  else if(!idSpecific){
    return formatAll(rawUser)
  }
}
