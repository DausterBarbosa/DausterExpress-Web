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

export default function DeliverymanPageModal(){
    return (
        <Modal open={true} onClose={() => {}} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <OrdersPageModalContainer>
                <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>CADASTRAR ENTREGADOR</Typography>
                <Stack spacing={2} margin={'20px 0'}>
                    <Stack spacing={2} direction="row">
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
                        }} label="NOME" variant="outlined" />
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
                        }} label="SOBRENOME" variant="outlined" />
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
                        }} label="EMAIL" variant="outlined" />
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
                    }} label="TELEFONE" variant="outlined" />
                    <Stack spacing={2} direction="row">
                        <Autocomplete  sx={{
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
                            width: '50%'
                        }} options={[]} renderInput={(params) => <TextField {...params} label="ESTADO" />}/>
                        <Autocomplete sx={{
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
                            width: '50%'
                        }} options={[]} renderInput={(params) => <TextField {...params} label="CIDADE" />}/>
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
                            }} label="CEP" variant="outlined" />
                    </Stack>
                    <Stack spacing={2} direction="row">
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
                                width: '70%'
                            }} label="ENDEREÇO" variant="outlined" />
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
                                width: '30%'
                            }} label="NÚMERO" variant="outlined" />
                    </Stack>
                </Stack>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" sx={{backgroundColor: '#4d148c', fontWeight: 'bold'}}>CADASTRAR</Button>
                </Box>
                <IconButton sx={{ padding: 0, margin: 0, color:'#4d148c', position: 'absolute', top: 5, right: 5}}>
                    <CancelIcon fontSize="large"/>
                </IconButton>
            </OrdersPageModalContainer>
        </Modal>
    );
}