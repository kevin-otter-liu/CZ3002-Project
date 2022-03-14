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

// Get transactions in selected month-yr
export const transactionsMthYr = (data, selectedMth, selectedYear) => {
  let filteredData = data
    .filter(
      (elem) =>
        new Date(elem.date_of_transaction).getUTCFullYear().toString() ===
        selectedYear.toString()
    )
    .filter(
      (elem) =>
        new Date(elem.date_of_transaction).toLocaleString("default", {
          month: "long",
        }) === selectedMth
    );
  return filteredData;
};

// Get transactions in a selected date

export const transactionsInDate = (data, selectedDate) => {
  let filteredData = data.filter(
    (elem) =>
      new Date(elem.date_of_transaction).getDate() === selectedDate.getDate()
  );
  return filteredData;
};
