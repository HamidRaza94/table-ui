import { useState } from 'react';
import TextField from '@material-ui/core/TextField';

import DialogBox from '../DialogBox';

const UpdateUserDialogBox = ({ open, handleClose, primaryAction }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(null);
  const [email, setEmail] = useState('');

  const clearFields = () => {
    setName('');
    setAge(null);
    setEmail(null);
  }

  const getUpdatedFields = () => {
    const updatedFields = {};

    if (name) updatedFields.name = name;
    if (age) updatedFields.age = Number(age);
    if (email) updatedFields.email = email;

    return updatedFields;
  }

  const handlePrimaryAction = () => {
    const data = getUpdatedFields();
    primaryAction(data);
    clearFields();
  }

  const onClose = () => {
    clearFields();
    handleClose();
  }

  return (
    <DialogBox
      open={open}
      handleClose={onClose}
      title="Update User Detail"
      action={{
        primary: {
          label: 'Update',
          onClick: handlePrimaryAction,
        },
        secondary: {
          label: 'Cancel',
        }
      }}
    >
      <TextField
        autoFocus
        id="name"
        label="Name"
        value={name}
        onChange={({ target }) => setName(target.value)}
        fullWidth
      />
      <TextField
        id="age"
        label="Age"
        value={age}
        onChange={({ target }) => setAge(target.value)}
        fullWidth
      />
      <TextField
        id="email"
        label="Email Address"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        type="email"
        fullWidth
      />
    </DialogBox>
  )
}

export default UpdateUserDialogBox;
