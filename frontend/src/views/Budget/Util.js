// Get all dates in a month
export const getDates = (selectedMth, selectedYear) => {
  // selected mth is in long format. Hence, need to change it to number first.
  const months = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };
  const date = new Date(selectedYear, months[selectedMth], 1);
  const dates = [];

  while (date.getMonth() === months[selectedMth]) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

// Get budgets in a selected date

export const budgetsInDate = (data, date) => {
  let filteredData = data
    .filter(
      (elem) =>
        new Date(elem.date_of_budget).getFullYear() === date.getFullYear()
    )
    .filter(
      (elem) =>
        new Date(elem.date_of_budget).getMonth() === date.getMonth()
    )
    .filter(
      (elem) => new Date(elem.date_of_budget).getDate() === date.getDate()
    );
  return filteredData;
};

// Get Overall Income and Expense
export const getOverall = (data, type) => {

  let filteredData = data.filter(
    (elem) => elem.type === type 
  )
  var sum = 0;
  for (var i=0; i<filteredData.length; i++) {
      sum += parseFloat(filteredData[i].amount);
  }
  return sum;
};