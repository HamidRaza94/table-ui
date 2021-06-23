import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const DialogBox = ({ open, handleClose, title, children, action }) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={action.secondary.onClick || handleClose} color="primary">
          {action.secondary.label}
        </Button>
        <Button onClick={action.primary.onClick} color="primary">
          {action.primary.label}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogBox;
