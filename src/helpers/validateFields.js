const validateFields = (state) => {
  const {
    editName,
    editEmail,
    editImage,
    editDescription,
  } = state;

  const errors = [
    (!editName.length > 0),
    (!editEmail.length > 0),
    (!editImage.length > 0),
    (!editDescription.length > 0),
    (!editEmail.match(/^\S+@\S+$/i)),
  ];

  return errors.every((validation) => validation === false);
};

export default validateFields;
