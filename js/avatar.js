const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imageChooser = document.querySelector('#avatar');
const imagePreview = document.querySelector('.ad-form-header__preview img');

imageChooser.addEventListener('change', () => {
  const file = imageChooser.files[0];
  const filename = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => {
    return filename.endsWith(item);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imagePreview.src = reader.result;
    })

    reader.readAsDataURL(file);
  }
})
