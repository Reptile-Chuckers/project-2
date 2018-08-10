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
        $('.plaid-accounts-button').removeClass('d-none');
        $('.plaid-transaction-history').removeClass('d-none');
        $('.plaid-income-button').removeClass('d-none');
        $('.test-button').removeClass('d-none');
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

$('.plaid-transaction-history').on('click', function(){
  axios.get("/api/transactions/")
  .then(function(resp){
    console.log(resp.data);
    resp.data.accounts.forEach(function(elem){
      console.log(elem) 
    })
  }).catch(function(error){
    console.error(error)
  })
})

$(".plaid-income-button").on("click", function() {
  axios.get("/api/transactions/")
  .then(function(resp) {
    console.log(resp);
    var totalIncome = 0;
    var totalExpense = 0;
    var netIncome = 0;
    //Create a for loop to add together the total expenses
    for (var i = 0; i < resp.data.transactions.length; i ++) {
      console.log(resp.data.transactions[i].amount);
        if (Number(resp.data.transactions[i].amount) < 0) {
          totalExpense += Number(resp.data.transactions[i].amount);
        } else {
          totalIncome += Number(resp.data.transactions[i].amount);
        }
    }

    netIncome = totalIncome + totalExpense;

    $(".plaid-income-button").after(`<h3>Your net income: $${netIncome}</h3>`)

  }).catch(function(err) {
    console.error(err)
  })
})

