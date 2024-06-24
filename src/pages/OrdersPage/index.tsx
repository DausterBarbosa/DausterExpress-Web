import {useState} from "react";

import GlobalLayout from '../../components/GlobalLayout';
import OrdersPageModal from '../../components/OrdersPageModal';
import OrderInformationModal from '../../components/OrderInformationModal';
import DialogModal from '../../components/DialogModal';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ErrorIcon from '@mui/icons-material/Error';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Snackbar from '@mui/material/Snackbar';
import Alert, {AlertColor} from '@mui/material/Alert';

import { useQueryClient } from '@tanstack/react-query';

import { styled } from '@mui/system';

import {useGetOrders, useChangeStatusOrder, useGetStatus} from "../../controllers/orderController";

const OrdersPageContainer = styled('div')({
    width: '90vw',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '90px',
});

const StatusOrdersPageContainer = styled('div')({
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
});

const StatusContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '5px 5px 5px #DDD',

    '& + &': {
        marginLeft: '20px',
    }
});

const OrdersPageToolBarContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '30px 0'
});

interface OrderProps{
    id: string;
    encomenda: string;
    imagem_url: string | null;
    data_retirada: string | null;
    data_entrega: string | null;
    status: string;
    destinatario: {
        nome: string;
        telefone: string;
        email: string;
    };
    entregador: {
        nome: string;
        sobrenome: string;
        telefone: string;
        email: string;
    };
}

export default function OrdersPage(){
    const queryClient = useQueryClient();

    const [rowId, setRowId] = useState<null | string>(null);

    const [orderPageModalCreate, setOrderPageModalCreate] = useState(false);

    const [informationModal, setInformationModal] = useState(false);

    const [orderData, setOrderData] = useState<OrderProps>();

    const [searchOrder, setSearchOrder] = useState("");

    const [dialogModal, setDialogModal] = useState(false);

    const [queryParams, setQueryParams] = useState({
        page: 0,
        status: "todos",
        encomenda: "",
    });

    const [alertType, setAlertType] = useState<AlertColor>("success");
    const [alert, setAlert] = useState(false);

    const [anchorElStatus, setAnchorElStatus] = useState<null | HTMLElement>(null);
    const openStatus = Boolean(anchorElStatus);

    const [anchorElOptions, setAnchorElOptions] = useState<null | HTMLElement>(null);
    const openOptions = Boolean(anchorElOptions);

    const {isLoading, data, isSuccess} = useGetOrders(queryParams);

    const {isPending, mutateAsync} = useChangeStatusOrder();

    const {data:statusData} = useGetStatus();

    function handleClickStatus(event: React.MouseEvent<HTMLButtonElement>){
        setAnchorElStatus(event.currentTarget);
    }

    function handleCloseStatus(){
        setAnchorElStatus(null);
    }

    function handleClickOptions(event: React.MouseEvent<HTMLButtonElement>, id:string){
        setRowId(id);
        setAnchorElOptions(event.currentTarget);
    }

    function handleCloseOptions(){
        setAnchorElOptions(null);
    }

    function handleStatus(status:string){
        setAnchorElStatus(null);
        if(status !== queryParams.status){
            setQueryParams({
                page: 0,
                status,
                encomenda: ""
            });
        }
    }

    function handleOrderSearchField(search:any){
        setSearchOrder(search);

        if(search === ""){
            setQueryParams({
                status: "todos",
                page: 0,
                encomenda: "",
            });
        }
    }

    function handleOnPageChange(event:unknown, newPage:number){
        setQueryParams({
            ...queryParams,
            page: newPage,
        });
    }

    function handleInformationModal(order:any){
        setAnchorElOptions(null);
        setOrderData(order);
        setInformationModal(true);
    }

    function handleDialogModal(order:any){
        setAnchorElOptions(null);
        setOrderData(order);
        setDialogModal(true);
    }

    async function handleChangeStatus(){
        try {
            const data = await mutateAsync({
                id: orderData!.id,
                status: "retirado"
            });

            setDialogModal(false);
            setAlertType("success");
            setAlert(true);
            queryClient.invalidateQueries({queryKey: ['getOrders']});
            queryClient.invalidateQueries({queryKey: ['getStatus']});
        } catch (error) {
            setDialogModal(false);
            setAlertType("error");
            setAlert(true);
        }
    }

    function handleOrderSearch(){
        if(searchOrder.trim() === ""){
            setAlertType("warning");
            setAlert(true);
        }
        else {
            setQueryParams({
                status: "todos",
                page: 0,
                encomenda: searchOrder,
            });
        }
    }

    function getColorByType(type:string){
        switch (type) {
            case 'pendente':
                return '#613f7f';
            case 'retirado':
                return '#ff6200';
            case 'entregue':
                return '#3e973f';
            case 'problema':
                return '#e21a47';
            case 'cancelado':
                return 'red'
            default:
                return 'black';
        }
      }

    return (
        <GlobalLayout>
            <OrdersPageModal open={orderPageModalCreate} setOpen={setOrderPageModalCreate}/>
            <OrderInformationModal open={informationModal} setOpen={setInformationModal} data={orderData}/>
            <DialogModal handleRequest={handleChangeStatus} open={dialogModal} setOpen={setDialogModal} loading={isPending} title="Marcar item como retirado?" description="Tenha certeza de ter escolhido o item correto. Confirmar ação?"/>
            <OrdersPageContainer>
                <StatusOrdersPageContainer>
                    <StatusContainer>
                        <CheckCircleIcon sx={{fontSize: '40px', color: '#3e973f'}}/>
                        <Box marginLeft={'5px'}>
                            <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>ENTREGUES HOJE</Typography>
                            <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>{!statusData ? 0 : statusData.data.entregues_hoje}</Typography>
                        </Box>
                    </StatusContainer>
                    <StatusContainer>
                        <WatchLaterIcon sx={{fontSize: '40px', color: '#613f7f'}}/>
                        <Box marginLeft={'5px'}>
                            <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>PENDENTES</Typography>
                            <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>{!statusData ? 0 : statusData.data.pendentes}</Typography>
                        </Box>
                    </StatusContainer>
                    <StatusContainer>
                        <LocalShippingIcon sx={{fontSize: '40px', color: '#ff6200'}}/>
                        <Box marginLeft={'5px'}>
                            <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>RETIRADOS HOJE</Typography>
                            <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>{!statusData ? 0 : statusData.data.retirados_hoje}</Typography>
                        </Box>
                    </StatusContainer>
                    <StatusContainer>
                        <ErrorIcon sx={{fontSize: '40px', color: '#e21a47'}}/>
                        <Box marginLeft={'5px'}>
                            <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>PROBLEMAS</Typography>
                            <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>{!statusData ? 0 : statusData.data.problemas}</Typography>
                        </Box>
                    </StatusContainer>
                </StatusOrdersPageContainer>
                <OrdersPageToolBarContainer>
                    <Stack spacing={1} direction="row">
                        <TextField sx={{backgroundColor: '#FFF'}} size='small' placeholder='Pesquisar encomenda' onChange={(e) => handleOrderSearchField(e.target.value)} value={searchOrder}/>
                        <Button variant="contained" sx={{backgroundColor: '#4d148c', fontWeight: 'bold'}} onClick={handleOrderSearch}>PESQUISAR</Button>
                    </Stack>
                    <Stack spacing={2} direction="row">
                        <div>
                            <Button
                                id="teste"
                                variant="contained" 
                                endIcon={<KeyboardArrowDownIcon />}
                                sx={{backgroundColor: '#4d148c', fontWeight: 'bold'}}
                                aria-controls={openStatus ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openStatus ? 'true' : undefined}
                                onClick={handleClickStatus}
                            >
                                {queryParams.status === "todos" && "TODOS"}
                                {queryParams.status === "pendente" && "PENDENTES"}
                                {queryParams.status === "retirado" && "RETIRADOS"}
                                {queryParams.status === "entregue" && "ENTREGUES"}
                                {queryParams.status === "problema" && "PROBLEMAS"}
                                {queryParams.status === "cancelado" && "CANCELADOS"}
                            </Button>
                            <Menu
                                id="teste"
                                anchorEl={anchorElStatus}
                                open={openStatus}
                                onClose={handleCloseStatus}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={() => handleStatus("todos")}>Todos</MenuItem>
                                <MenuItem onClick={() => handleStatus("pendente")}>Pendentes</MenuItem>
                                <MenuItem onClick={() => handleStatus("retirado")}>Retirados</MenuItem>
                                <MenuItem onClick={() => handleStatus("entregue")}>Entregues</MenuItem>
                                <MenuItem onClick={() => handleStatus("problema")}>Problemas</MenuItem>
                                <MenuItem onClick={() => handleStatus("cancelado")}>Cancelados</MenuItem>
                            </Menu>
                        </div>
                        <Button variant="contained" sx={{backgroundColor: '#4d148c', fontWeight: 'bold'}} onClick={() => setOrderPageModalCreate(true)}>ADICIONAR</Button>
                    </Stack>
                </OrdersPageToolBarContainer>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{backgroundColor: '#4d148c'}}>
                            <TableRow>
                                <TableCell align="center" sx={{fontWeight: 'bold', color: '#FFF', fontSize: '14px'}}>DESTINATÁRIO</TableCell>
                                <TableCell align="center" sx={{fontWeight: 'bold', color: '#FFF', fontSize: '14px'}}>ENTREGADOR</TableCell>
                                <TableCell align="center" sx={{fontWeight: 'bold', color: '#FFF', fontSize: '14px'}}>CIDADE</TableCell>
                                <TableCell align="center" sx={{fontWeight: 'bold', color: '#FFF', fontSize: '14px'}}>ESTADO</TableCell>
                                <TableCell align="center" sx={{fontWeight: 'bold', color: '#FFF', fontSize: '14px'}}>STATUS</TableCell>
                                <TableCell align="center" sx={{fontWeight: 'bold', color: '#FFF', fontSize: '14px'}}>AÇÕES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{position:"relative"}}>
                            {isSuccess && (
                                data.data.map((item:any) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="center" sx={{fontSize: '15px'}}>{item.destinatario.nome}</TableCell>
                                        <TableCell align="center" sx={{fontSize: '15px'}}>{item.entregador.nome + " " + item.entregador.sobrenome}</TableCell>
                                        <TableCell align="center" sx={{fontSize: '15px'}}>{item.destinatario.cidade}</TableCell>
                                        <TableCell align="center" sx={{fontSize: '15px'}}>{item.destinatario.estado}</TableCell>
                                        <TableCell align="center" sx={{fontSize: '14px', fontWeight: "bold", color: getColorByType(item.status)}}>{item.status.toUpperCase()}</TableCell>
                                        <TableCell align="center">
                                            <div>
                                                <IconButton
                                                    id="teste1"
                                                    onClick={(e) => handleClickOptions(e, item.id)}
                                                    sx={{ padding: 0, margin: 0 }}
                                                    aria-controls={openOptions ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={openOptions ? 'true' : undefined}
                                                >
                                                    <MoreVertIcon/>
                                                </IconButton>
                                                <Menu
                                                    id="teste1"
                                                    anchorEl={anchorElOptions}
                                                    open={openOptions && rowId === item.id}
                                                    onClose={handleCloseOptions}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                >
                                                    <MenuItem onClick={() => handleInformationModal(item)}>Visualizar</MenuItem>
                                                    <MenuItem disabled={item.status !== "pendente"} onClick={() => handleDialogModal(item)}>Retirado</MenuItem>
                                                </Menu>
                                            </div>
                                        </TableCell>
                                    </TableRow> 
                                ))
                            )}  
                        </TableBody>
                    </Table>
                    <div style={{position:"relative"}}>
                        <TablePagination
                            count={data ? data.total : 0}
                            onPageChange={handleOnPageChange} 
                            page={queryParams.page}
                            rowsPerPage={5}
                            rowsPerPageOptions={[]}
                            sx={{
                                margin: 0,
                                padding: 0
                            }}
                        />
                        {isLoading && (
                            <CircularProgress style={{
                                position: 'absolute',
                                top: '10px',
                                left: '190px',
                                transform: 'translate(-50%, -50%)',
                                color:'#4d148c'}}
                                size={30}
                            />
                        )}
                    </div>
                </TableContainer>
            </OrdersPageContainer>
            <Snackbar open={alert} autoHideDuration={6000} anchorOrigin={{vertical: "top", horizontal: "right"}} onClose={() => setAlert(false)}>
                    <Alert
                    onClose={() => setAlert(false)}
                    severity={alertType}
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    {alertType === 'success' && 'Operação realizada com sucesso!'}
                    {alertType === 'error' && 'Ocorreu um erro ao realizar a operação!'}
                    {alertType === 'warning' && 'Preencha o campo de busca!'}
                    </Alert>
                </Snackbar>
        </GlobalLayout>
    );
}