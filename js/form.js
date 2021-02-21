const advertisementForm = document.querySelector('.ad-form');
const advertisementFormType = advertisementForm.querySelector('#type');
const advertisementFormPrice = advertisementForm.querySelector('#price');
const advertisementFormCheckin = advertisementForm.querySelector('#timein');
const advertisementFormCheckout = advertisementForm.querySelector('#timeout');

const typeConvertToPrice = {
  flat: 5000,
  bungalow: 10000,
  house: 15000,
  palace: 100000,
};

advertisementFormType.addEventListener('change', () => {
  advertisementFormPrice.placeholder = typeConvertToPrice[advertisementFormType.value];
});

advertisementFormCheckin.addEventListener('change', () => {
  advertisementFormCheckout.value = advertisementFormCheckin.value;
});

advertisementFormCheckout.addEventListener('change', () => {
  advertisementFormCheckin.value = advertisementFormCheckout.value;
});
