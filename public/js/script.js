var handler = Plaid.create({
  apiVersion: 'v2',
  clientName: 'Plaid Walkthrough Demo',
  env: 'sandbox',
  product: ['transactions'],
  key: '2a1a0ffef5bb3823c5298bb2c665aa',
  onSuccess: function (public_token) {
    axios.post('/api/public-token', {
      publicToken: public_token
    })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  },
});

$('.plaid-link-button').on('click', function () {
  handler.open();
})