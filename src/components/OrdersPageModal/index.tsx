import CancelIcon from '@mui/icons-material/Cancel';

import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { styled } from '@mui/system';

const OrdersPageModalContainer = styled('div')({
    backgroundColor: '#FFF',
    padding: '20px',
    position: 'relative',
});

export default function OrdersPageModal(){
    return (
        <Modal open={true} onClose={() => {}} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <OrdersPageModalContainer>
                <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>ADICIONAR ENCOMENDA</Typography>
                <Stack spacing={2} margin={'20px 0'}>
                    <Stack spacing={2} direction="row">
                        <Autocomplete  sx={{
                            width: '300px',
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#4d148c !important',
                                },
                            },
                            '& .MuiInputLabel-shrink': {
                                color: '#4d148c !important',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root': {
                                color: '#4d148c !important',
                            },
                        }} options={[]} renderInput={(params) => <TextField {...params} label="ENTREGADOR" />}/>
                        <Autocomplete sx={{
                            width: '300px',
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#4d148c !important',
                                },
                            },
                            '& .MuiInputLabel-shrink': {
                                color: '#4d148c !important',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root': {
                                color: '#4d148c !important',
                            },
                        }} options={[]} renderInput={(params) => <TextField {...params} label="DESTINATÁRIO" />}/>
                    </Stack>
                    <TextField sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#4d148c !important',
                                },
                            },
                            '& .MuiInputLabel-shrink': {
                                color: '#4d148c !important',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root': {
                                color: '#4d148c !important',
                            },
                        }} label="ENCOMENDA" variant="outlined" />
                </Stack>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" sx={{backgroundColor: '#4d148c', fontWeight: 'bold'}}>ADICIONAR</Button>
                </Box>
                <IconButton sx={{ padding: 0, margin: 0, color:'#4d148c', position: 'absolute', top: 5, right: 5}}>
                    <CancelIcon fontSize="large"/>
                </IconButton>
            </OrdersPageModalContainer>
        </Modal>
    );
}