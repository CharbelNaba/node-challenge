import User from '@nc/domain-user/data_objects/User';

const publicFields = ['first_name', 'last_name', 'company_name'];

export function capitalize(word) {
  const str = `${word}`;
  return str[0].toUpperCase() + str.slice(1);
}

export function secureTrim(user:User|User[]): string {
  const trimmedUser =  JSON.stringify(user, publicFields);
  return JSON.parse(trimmedUser)
}

export function format(rawUser): User {
  return {
    id: rawUser.id,
    first_name: capitalize(rawUser.first_name),
    last_name: capitalize(rawUser.last_name),
    company_name: rawUser.company_name,
    ssn: rawUser.ssn,
  };
}

export function formatAll(rawUser): User[] {
  let users=[]
  rawUser.forEach(u=>{
    users.push({
      id: u.id,
      first_name: capitalize(u.first_name),
      last_name: capitalize(u.last_name),
      company_name: u.company_name,
      ssn: u.ssn
    })
  })
  return users
}
