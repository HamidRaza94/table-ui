import { useState } from 'react';
import TextField from '@material-ui/core/TextField';

import DialogBox from '../DialogBox';

const AddUserDialogBox = ({ open, handleClose, primaryAction }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(null);
  const [email, setEmail] = useState('');

  const clearFields = () => {
    setName('');
    setAge(null);
    setEmail(null);
  }

  const getAddedFields = () => {
    const updatedFields = {};

    if (name) updatedFields.name = name;
    if (age) updatedFields.age = Number(age);
    if (email) updatedFields.email = email;

    return updatedFields;
  }

  const handlePrimaryAction = () => {
    const data = getAddedFields();
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
      title="Add User"
      action={{
        primary: {
          label: 'Add',
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

export default AddUserDialogBox;
