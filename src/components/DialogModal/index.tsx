import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';

interface DialodModalProps {
    open: boolean;
    setOpen: (state:boolean) => void;
    title: string;
    description: string;
    loading: boolean;
    handleRequest: () => void;
}

const DialogModal:React.FC<DialodModalProps> = ({open, setOpen, title, description, loading, handleRequest}) => {
    return (
        <Dialog
        open={open}
        keepMounted
        onClose={() => setOpen(false)}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            {loading && (
                <CircularProgress style={{
                    transform: 'translate(-50%, -50%)',
                    color:'#4d148c',
                }}
                    size={25}
                />
            )}
          <Button disabled={loading} sx={{color:"#e21a47", fontWeight:"bold"}} onClick={() => setOpen(false)}>CANCELAR</Button>
          <Button disabled={loading} sx={{color:"#613f7f", fontWeight:"bold"}} onClick={handleRequest}>CONFIRMAR</Button>
        </DialogActions>
      </Dialog>
    );
}

export default DialogModal;