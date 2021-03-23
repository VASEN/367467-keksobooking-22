const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const getFileNames = (files) => {
  const filenames = [];
  for (let i = 0; i < files.length; i++) {
    filenames.push(files[i].name.toLowerCase());
  }
  return filenames;
};

const createReaders = (files) => {
  const readers = new Array(files.length);
  for (let i = 0; i < readers.length; i++) {
    let reader = new FileReader();
    readers[i] = reader;
  }
  return readers;
};

const readFiles = (files, readers) => {
  for (let i = 0; i < files.length; i++) {
    readers[i].readAsDataURL(files[i]);
  }
};

const getImage = (chooser, preview) => {
  const files = chooser.files;

  let filenames = getFileNames(files);

  let matches = filenames.every((el) => {
    return FILE_TYPES.some((item) => {
      return el.endsWith(item);
    })
  });
  if (matches) {
    let readers = createReaders(files);

    readers.forEach((item) => {
      item.addEventListener('load', () => {
        if (!preview.src) {
          let imgTag = document.createElement('img');
          imgTag.src = item.result;
          imgTag.width = 40;
          imgTag.height = 44;
          preview.append(imgTag);
        } else {
          preview.src = item.result;
        }
      })
    })
    readFiles(files, readers);
  }
};

export {getImage};
