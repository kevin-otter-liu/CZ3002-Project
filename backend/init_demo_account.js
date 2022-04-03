const axios = require('axios');
const ax = axios.create({
  baseURL: 'http://localhost:5000/api/v1/',
  timeout: 1000000,
});

const CATEGORIES = [
  'food',
  'transport',
  'apparel',
  'social life',
  'household',
  'gift',
  'others',
];

// gets an array of dates from last year till now  (13 months)
const getArrayOfDates = () => {
  let date = new Date();
  let month_array = [];
  console.log(date.getFullYear());
  let curr_year = date.getFullYear();
  let pointer_year = date.getFullYear() - 1;
  let end_month = date.getMonth() + 12;
  let abs_month = date.getMonth();
  let pointer_month = date.getMonth();
  while (pointer_year <= curr_year && abs_month <= end_month) {
    specific_date = new Date(pointer_year, pointer_month, 15);
    month_array.push(specific_date);

    // if decemeber increase year
    if (abs_month === 11) {
      abs_month += 1;
      pointer_year = pointer_year + 1;
      pointer_month = pointer_month % 11;
    } else {
      abs_month += 1;
      pointer_month += 1;
    }
  }
  return month_array;
};

//const get random number beween 2 ranges
const randomNoBetween = (lowest_num, highest_num) => {
  return Math.floor(Math.random() * (highest_num - lowest_num) + lowest_num);
};
// create 3 transaction for each user for each category increasing in 100
// categories include ["food" "transport","apparel", "social life", "household","gift","others"]
const createDummyTransactionForUser = async (date, token, auth_response) => {
  return CATEGORIES.map(async (category) => {
    // add 3 different amounts for each category
    // generate random amount between 300-800

    let amounts = [
      randomNoBetween(300, 800),
      randomNoBetween(300, 800),
      randomNoBetween(300, 800),
    ];
    return amounts.map(async (amount) => {
      let transaction_res = await ax.post(
        '/transaction',
        {
          description: 'testing description',
          type: 'expense',
          category: category,
          amount: amount,
          payment_method: 'cash',
          currency: 'SGD',
          date_of_transaction: date,
        },
        {
          headers: { Authorization: `Bearer ` + token },
        }
      );
      if (transaction_res.status !== 200) {
        console.log('transaction addition failed');
        process.exit(1);
      }

      console.log(
        `created transaction for user: ${auth_response.data.email} in category ${category}`
      );
      return transaction_res;
    });
  });
};

const wrapper_func = async (token, auth_response) => {
  let date_array = getArrayOfDates();
  return date_array.map(async (date) => {
    console.log(`CURRENTLY CREATING FOR DATE: ${date}`);
    await createDummyTransactionForUser(date, token, auth_response);
  });
};

// for each user
const main_function = async () => {
  console.log('INJECTING DUMMY DATA INTO DB ...');

  // signup a user
  let auth_response = await ax.post('auth/sign-up', {
    email: `kevinliusingapore@gmail.com`,
    password: '12345678901234567890',
  });

  if (auth_response.status !== 200) {
    console.log(auth_response.message);
    process.exit(1);
  }
  console.log(`sign up successful as ${auth_response.data.email}`);

  let { user_key, token } = auth_response.data;

  //for each month from today
  let result = await wrapper_func(token, auth_response);
};

//loop for 100 users
main_function();
// console.log(getArrayOfDates());
