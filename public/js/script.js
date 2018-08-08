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
        $('.plaid-accounts-button').removeClass('d-none')
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

//**CLICK EVENT MAKING AXIOS CALL TO GET ACCOUNT INFORMATION FROM /API/ACCOUNTS ROUTE */
$('.plaid-accounts-button').on('click', function () {
  axios.get('/api/accounts')
    .then(function (res) {
      console.log(res);
      res.data.accounts.forEach(function (elem) {
        console.log(elem)
        $('.plaid-accounts-button').after(`<h3>${elem.name}: ${elem.balances.available}</h3>`)
      })
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
        $('.plaid-transaction-history').after(`<div>${element.amount}</div><div>${element.date}</div>`)

        var categoryString = element.category.join(" - ")

        $('.plaid-transaction-history').after(`<div>${categoryString}</div>`);
      });
    }).catch(function (error) {
      console.error(error)
    });
});

