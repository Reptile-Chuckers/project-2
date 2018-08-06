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