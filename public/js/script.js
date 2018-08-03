var handler = Plaid.create({
  apiVersion: 'v2',
  clientName: 'Plaid Walkthrough Demo',
  env: 'sandbox',
  product: ['transactions'],
  key: '2a1a0ffef5bb3823c5298bb2c665aa',
  onSuccess: function (public_token) {
    $('.plaid-link-button').after(`<div class="p-2 my-2 border">${public_token}</div>`);
  },
});

$('.plaid-link-button').on('click', function () {
  handler.open();
})