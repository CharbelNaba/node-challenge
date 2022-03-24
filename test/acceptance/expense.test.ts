import { Api } from './utils/api';

describe('Expenses Acceptance Tests', () => {
  describe('get-all-expenses endpoint', () => {
    test('/expense/v1/get-all-expenses should return query with pages', async () => {
      const response = await Api.get(
        '/expense/v1/get-all-expenses'
      );

      const { totalPages, expenses } = response.body;
      expect(response.status).toBe(200);
      expect(expenses).toBeDefined();
      expect(totalPages).toBeDefined();
      expect(Array.isArray(expenses)).toBe(true);
    });
    test('/expense/v1/get-all-expenses with sort DESC should return a valid response', async () => {
        const response = await Api.get(
          '/expense/v1/get-all-expenses?sort=true&sort_amount_in_cents=DESC'
        );
        let sorted = true;
        const {expenses} = response.body
        const expensesArr: Array<any> = [expenses][0]
        for (var i=0; i<expensesArr.length-1;++i){
            if (expensesArr[i][`amount_in_cents`] < expensesArr[i+1][`amount_in_cents`]){
                sorted=false;
                break;
            }
        }
        expect(response.status).toBe(200);
        expect(sorted).toBe(true);
      });
      test('/expense/v1/get-all-expenses with sort ASC should return a valid response', async () => {
        const response = await Api.get(
          '/expense/v1/get-all-expenses?sort=true&sort_amount_in_cents=ASC'
        );
        let sorted = true;
        const {expenses} = response.body
        const expensesArr: Array<any> = [expenses][0]
        for (var i=0; i<expensesArr.length-1;++i){
            if (expensesArr[i][`amount_in_cents`] > expensesArr[i+1][`amount_in_cents`]){
                sorted=false;
                break;
            }
        }
        expect(response.status).toBe(200);
        expect(sorted).toBe(true);
      });
      test('/expense/v1/get-all-expenses with filtering should return a valid response', async () => {
        const response = await Api.get(
          '/expense/v1/get-all-expenses?filter=true&filter_status=processed'
        );
        let filtered = true;
        const {expenses} = response.body
        const expensesArr: Array<any> = [expenses][0]
        for (let exp of expensesArr){
            if (exp['status']==='pending'){
                filtered = false
                break
            }
        }
        expect(response.status).toBe(200);
        expect(filtered).toBe(true);
      });
      test('/expense/v1/get-all-expenses with filtering should return a valid response', async () => {
        const response = await Api.get(
          '/expense/v1/get-all-expenses?filter=true&filter_status=processed&sort=true&sort_amount_in_cents=ASC'
        );
        let sorted = true
        let filtered = true;
        const {expenses} = response.body
        const expensesArr: Array<any> = [expenses][0]
        console.log(expensesArr)

        for (var i=0; i<expensesArr.length-1;++i){
          if (expensesArr[i][`amount_in_cents`] > expensesArr[i+1][`amount_in_cents`]){
              sorted=false;
              break;
          }
          if (expensesArr[i]['status']==="pending"){
              filtered = false
              break
          }
        }
        if (expensesArr[expensesArr.length-1]['status']==="pending"){
          filtered=false
        }

        expect(response.status).toBe(200);
        expect(filtered).toBe(true);
        expect(sorted).toBe(true);
      });
  });

  describe('get-user-expenses endpoint', () => {
    test('/expense/v1/get-user-expenses should return a valid response', async () => {
        const id = 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474'
        let idMatches = true
        const response = await Api.get(
          '/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474'
        );
        const {expenses} = response.body
        const expensesArr: Array<any> = [expenses][0]
        for (let exp of expensesArr){
            if (exp['user_id']!==id){
                idMatches=false
                break
            }
        }
        expect(response.status).toBe(200);
        expect(idMatches).toBe(true);
      });
  });

  describe('get-expense-byID endpoint', () => {
    test('/expense/v1/get-expense-byID should return a valid response', async () => {
        const response = await Api.get(
          '/expense/v1/get-all-expenses'
        );
        const {expenses} = response.body
        const expense = [expenses][0][0]
        const expenseID= expense["id"]
        const newResponse=await Api.get(
            `/expense/v1/get-expense-byID?expenseId=${expenseID}`
          );
        const {id} = newResponse.body
        expect(newResponse.status).toBe(200);
        expect(id).toBe(expenseID);
      });
  });
});