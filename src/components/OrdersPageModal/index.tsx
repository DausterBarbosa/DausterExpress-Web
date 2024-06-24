import {useState} from "react";

import { useQueryClient } from '@tanstack/react-query';

import CancelIcon from '@mui/icons-material/Cancel';

import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert, {AlertColor} from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import { styled } from '@mui/system';

import {useCreateOrders, useGetOrders} from "../../controllers/orderController";
import {useGetRecipients} from "../../controllers/recipientController";
import {useGetDeliverymans} from '../../controllers/deliverymanController';

const OrdersPageModalContainer = styled('div')({
    backgroundColor: '#FFF',
    padding: '20px',
    position: 'relative',
});

interface OrdersPageModalProps {
    open: boolean;
    setOpen: (state:boolean) => void;
}

interface RecipientProp {
    id: string;
    nome: string;
}

interface DeliverymanProp {
    id: string;
    nome: string;
    sobrenome: string;
}

const OrdersPageModal:React.FC<OrdersPageModalProps> = ({open, setOpen}) => {
    const queryClient = useQueryClient();

    const [deliveryman, setDeliveryman] = useState("");
    const [recipient, setRecipient] = useState("");
    const [order, setOrder] = useState("");

    const [alertType, setAlertType] = useState<AlertColor>("success");
    const [alert, setAlert] = useState(false);


    const {data:dataRecipients, isLoading:isLoadingRecipients, refetch:refetchRecipients} = useGetRecipients(false);
    const {data:dataDeliverymans, isLoading:isLoadingDeliverymans, refetch:refetchDeliverymans} = useGetDeliverymans(false);
    const {mutateAsync, isPending} = useCreateOrders();

    async function handleCreateOrder(){
        if(deliveryman === "" || recipient === "" || order.trim() === ""){
            setAlertType("warning");
            setAlert(true);
        }
        else {
            try {
                const data = await mutateAsync({
                    deliveryman,
                    recipient,
                    order
                });
    
                setAlertType("success");
                setAlert(true);
                queryClient.invalidateQueries({queryKey: ['getOrders']});
                queryClient.invalidateQueries({queryKey: ['getStatus']});
            } catch (error) {
                setAlertType("error");
                setAlert(true);
            }
        }
    }

    function handleCloseModal(){
        setDeliveryman("");
        setRecipient("");
        setOrder("");
        setOpen(false);
    }

    return (
        <Modal open={open} onClose={handleCloseModal} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
                        }}
                        onChange={(event, newValue) => newValue ? setDeliveryman(newValue!.id) : setDeliveryman("")}
                        loading={isLoadingDeliverymans}
                        onOpen={() => refetchDeliverymans()}
                        options={dataDeliverymans ? dataDeliverymans.data : []}
                        getOptionLabel={(option:DeliverymanProp) => option.nome + " " + option.sobrenome}
                        isOptionEqualToValue={(option:DeliverymanProp, value:DeliverymanProp) => option.nome === value.nome || option.sobrenome === value.sobrenome}
                        renderInput={(params) => <TextField {...params} label="ENTREGADOR" />}/>
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
                        }}
                        onChange={(event, newValue) => newValue ? setRecipient(newValue!.id) : setRecipient("")}
                        loading={isLoadingRecipients}
                        onOpen={() => refetchRecipients()}
                        options={dataRecipients ? dataRecipients.data : []}
                        getOptionLabel={(option:RecipientProp) => option.nome}
                        isOptionEqualToValue={(option:RecipientProp, value:RecipientProp) => option.nome === value.nome}
                        renderInput={(params) => <TextField {...params} label="DESTINATÁRIO" />}/>
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
                        }}
                        onChange={(event) => setOrder(event.target.value)}
                        label="ENCOMENDA"
                        variant="outlined" />
                </Stack>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center" }}>
                    {isPending && <CircularProgress style={{
                        transform: 'translate(-50%, -50%)',
                        color:'#4d148c',
                        marginRight: "15px"
                    }}
                        size={30}
                    />}
                    <Button variant="contained" disabled={isPending} sx={{backgroundColor: '#4d148c', fontWeight: 'bold'}} onClick={handleCreateOrder}>ADICIONAR</Button>
                </Box>
                <IconButton sx={{ padding: 0, margin: 0, color:'#4d148c', position: 'absolute', top: 5, right: 5}} onClick={handleCloseModal}>
                    <CancelIcon fontSize="large"/>
                </IconButton>
                <Snackbar open={alert} autoHideDuration={6000} anchorOrigin={{vertical: "top", horizontal: "right"}} onClose={() => setAlert(false)}>
                    <Alert
                    onClose={() => setAlert(false)}
                    severity={alertType}
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    {alertType === 'success' && 'Operação realizada com sucesso!'}
                    {alertType === 'error' && 'Ocorreu um erro ao realizar a operação!'}
                    {alertType === 'warning' && 'Preencha todos os campos!'}
                    </Alert>
                </Snackbar>
            </OrdersPageModalContainer>
        </Modal>
    );
}

export default OrdersPageModal;