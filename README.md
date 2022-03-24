# Node Challenge

Take home test for Node.js developers.

## The challenge

This challenge has been designed to measure your knowledge of Node.js, Express, Typescript and various technologies, like monorepos, databases and testing. For your exercise, you will be enhancing this API which serves as the backend for the Pleo app. Whenever a user of the app navigates to the expenses view, it calls this API to collect the list of expenses for that user.

Your objective is to write this new route to fetch the list of expenses for a given user. Right now that domain is empty, so you'll have to build everything from scratch- but you can look over at the user domain for inspiration. Please make sure that the endpoint scales adequately and supports paging, sorting and filtering. Additionally, we would also like you to write some tests for your route.

Finally, as a bonus objective, try to improve any aspect of this API. It could be to add more TS types, better security, tests, add features, graphql support, etc. 

## Instructions

Fork this repo with your solution. Ideally, we'd like to see your progression through commits, and don't forget to update the README.md to explain your thought process.

Please let us know how long the challenge takes you. We're not looking for how speedy or lengthy you are. It's just really to give us a clearer idea of what you've produced in the time you decided to take. Feel free to go as big or as small as you want.

## Install

Make sure that you have a modern version of `yarn` that supports workspaces (`>= 1.0`), then run:

```bash
yarn
```

You will also need to [install Postgres](https://www.postgresqltutorial.com/install-postgresql-macos/), create a `challenge` database and load the sql file `dump.sql`:

```bash
psql challenge < dump.sql
```

## Start

To enable logs, use the standard `NODE_DEBUG` flag with the value `DEBUG`

```bash
NODE_DEBUG=DEBUG yarn start
```

## Test

Make sure that you have a modern version of `yarn` that supports workspaces, then run:

```bash
yarn test
```

The command above will run the following test suites sequentially:

| Test suite | Run command | Description |
-------------|-------------|-------------|
| Unit | `yarn test:unit` | Simple unit tests. |
| Mid-level | `yarn test:mid-level` | Small integration tests that integration of small components together.  |
| Acceptances | `yarn test:acceptance` | Large integration tests, system tests, end-to-end tests. |


Happy hacking 😁!

## Proposed Solution

To tackle the problem I took an iterative approach for the implementation. As you may see, in the first commit, I implemented the expenses domain almost exactly like the user one. Then on the next iteration, I introduced the notion of ORM to manipulate the data, since not only it would allow the implementation of the sorting, filtering and pagination features but it would also turn the codebase more robust, easier to handle and more efficient with less hands-on management. Once the ORM was implemented, the rest was just a question of using the right function calls to provide the requested features. Not to mention, that in each iteration I was fully testing the API, and doing some small bug fixes when required. After completing, the tasks mentioned above, I decided to add some new routes that would be beneficial for later uses (getting all users, getting all expenses, getting an expense by the expense ID). Last but not least, came the tests to confirm that everything I implemented were in fact functionning as wished. Finally, the work that was done in this repo is not but the tip of the iceberg for such an API, since there are still a lot that can be done (however, I did not want to exceed the 6 hours that were mentioned in the first interview) such as continuing CRUD operations for both domain,providing various functions for the two models in order to process and manipulate the data, implement more tests, implemented some of expenses features to the user domain, change the whole structure of the code base so that it has more clean architecture and so on.

Looking forward to hearing your feedback!

In case you prefer to test directly from the browser, here are some endpoints to make things easier:
    1)user/v1/get-user-details?userId=e17825a6-ad80-41bb-a76b-c5ee17b2f29d
    2)user/v1/get-all-users

    3)expense/v1/get-all-expenses?page=1&sort=true&sort_amount_in_cents=DESC
    4)expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&status=ASC
    5)expense/v1/get-expense-byID?expenseId=f3f34c29-274a-414d-988f-711802eeac25
    6)expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&sort=true&sort_amount_in_cents=ASC&filter=true&filter_status=processed
    7)expense/v1/get-all-expenses?page=0&size=1