var handler = Plaid.create({
  apiVersion: 'v2',
  clientName: 'Plaid Walkthrough Demo',
  env: 'sandbox',
  product: ['transactions'],
  key: "27a73558666b246bae92220f4cd360",
  onSuccess: function (public_token) {
    axios.post('/api/public-token', {
      publicToken: public_token
    })
      .then(function (res) {
        console.log(res);
        $('.plaid-accounts').removeClass('d-none')
        $('.plaid-transaction-history').removeClass('d-none')
      })
      .catch(function (err) {
        console.log(err);
      });
  },
});

$('.plaid-link-button').on('click', function () {
  $('.plaid-link-button').remove();
  handler.open();
})

//account button click to get account balances
$('.plaid-accounts').on('click', function () {
  //remove button
  $(this).remove();
  //show loading
  $('.plaid-info').prepend('<h5 class="loading">Loading...</h5>')
  //axios get to plaid api route
  axios.get('/api/accounts')
    .then(function (res) {
      //add each account to table
      res.data.accounts.forEach(function (elem, index) {
        var tableRow = $('<tr></tr>');
        $('.accounts-table-body').append(tableRow);
        tableRow.append(`<th>${index + 1}</th>`);
        tableRow.append(`<td>${elem.name}</td>`);
        tableRow.append(`<td class="text-right">${accounting.formatMoney(Number(elem.balances.available))}</td>`);
      })
      //remove loading button
      $('.loading').remove();
      //show the table
      $('.accounts-table-header').removeClass('d-none');
      $('.accounts-table').removeClass('d-none');

    })
    .catch(function (error) {
      console.log(error);
    });
})

//**CLICK EVENT MAKING AXIOS CALL TO GET PAST TRANSACTION DATA FROM /API/TRANSACTIONS ROUTE*/
$('.plaid-transaction-history').on('click', function () {
  axios.get("/api/transactions/")
    .then(function (resp) {
      resp.data.transactions.forEach(function (element) {
        // $('.plaid-transaction-history').after(`<div>${element.amount}</div><div>${element.date}</div>`)
console.log(element)
        var categoryString = element.category.join(" - ")
        var transTableRow = $('<tr></tr>')
        $('.transaction-table-body').append(transTableRow);
        transTableRow.append(`<td>${element.date}</td>`);
        transTableRow.append(`<td>${element.amount}</td>`);
        transTableRow.append(`<td>${categoryString}</td>`);
        // tableRow.append(`<td class="text-right">${accounting.formatMoney(Number(elem.balances.available))}</td>`);
      })
      $('.transaction-table-header').removeClass('d-none');
      $('.transaction-table').removeClass('d-none');
        // $('.plaid-transaction-history').after(`<div>${categoryString}</div>`);
     
    }).catch(function (error) {
      console.error(error)
    });
});

$(".plaid-income-button").on("click", function () {
  axios.get("/api/transactions/")
    .then(function (resp) {
      console.log(resp);
      var totalIncome = 0;
      var totalExpense = 0;
      var netIncome = 0;
      //Create a for loop to add together the total expenses
      for (var i = 0; i < resp.data.transactions.length; i++) {
        console.log(resp.data.transactions[i].amount);
        if (Number(resp.data.transactions[i].amount) < 0) {
          totalExpense += Number(resp.data.transactions[i].amount);
        } else {
          totalIncome += Number(resp.data.transactions[i].amount);
        }
      }

      netIncome = totalIncome + totalExpense;

      $(".plaid-income-button").after(`<h3>Your net income: $${netIncome}</h3>`)

    }).catch(function (err) {
      console.error(err)
    })
})

