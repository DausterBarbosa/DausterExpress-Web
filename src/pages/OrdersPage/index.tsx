import {useState, useEffect} from "react";

import GlobalLayout from '../../components/GlobalLayout';
import OrdersPageModal from '../../components/OrdersPageModal';

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

import { styled } from '@mui/system';

import {useGetOrders} from "../../controllers/orderController";

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

export default function OrdersPage(){
    const [orderPageModalCreate, setOrderPageModalCreate] = useState(false);

    const [totalRows, setTotalRows] = useState(0);
    const [page, setPage] = useState(0);

    const {isLoading, data, isSuccess, refetch} = useGetOrders(page + 1);

    useEffect(() => {
        if (isSuccess && data.total !== undefined) {
          setTotalRows(data.total);
        }
      }, [isSuccess, data]);

    function handleOnPageChange(event:unknown, newPage:number){
        setPage(newPage);
        refetch();
    }

    return (
        <GlobalLayout>
            <OrdersPageModal open={orderPageModalCreate} setOpen={setOrderPageModalCreate}/>
            <OrdersPageContainer>
                <StatusOrdersPageContainer>
                    <StatusContainer>
                        <CheckCircleIcon sx={{fontSize: '40px', color: '#3e973f'}}/>
                        <Box marginLeft={'5px'}>
                            <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>ENTREGUES HOJE</Typography>
                            <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>10</Typography>
                        </Box>
                    </StatusContainer>
                    <StatusContainer>
                        <WatchLaterIcon sx={{fontSize: '40px', color: '#613f7f'}}/>
                        <Box marginLeft={'5px'}>
                            <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>PENDENTES</Typography>
                            <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>10</Typography>
                        </Box>
                    </StatusContainer>
                    <StatusContainer>
                        <LocalShippingIcon sx={{fontSize: '40px', color: '#ff6200'}}/>
                        <Box marginLeft={'5px'}>
                            <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>RETIRADOS HOJE</Typography>
                            <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>10</Typography>
                        </Box>
                    </StatusContainer>
                    <StatusContainer>
                        <ErrorIcon sx={{fontSize: '40px', color: '#e21a47'}}/>
                        <Box marginLeft={'5px'}>
                            <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>PROBLEMAS</Typography>
                            <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>10</Typography>
                        </Box>
                    </StatusContainer>
                </StatusOrdersPageContainer>
                <OrdersPageToolBarContainer>
                    <TextField sx={{backgroundColor: '#FFF'}} size='small' placeholder='Pesquisar encomenda'/>
                    <Stack spacing={2} direction="row">
                        <div>
                            <Button variant="contained" sx={{backgroundColor: '#4d148c', fontWeight: 'bold'}}>FILTRAR</Button>
                            <Menu
                                open={false}
                            >
                                <MenuItem>Profile</MenuItem>
                                <MenuItem>My account</MenuItem>
                                <MenuItem>Logout</MenuItem>
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
                        <TableBody>
                            {isSuccess && (
                                data.data.map((item:any) => (
                                    <TableRow>
                                        <TableCell align="center">{item.destinatario.nome}</TableCell>
                                        <TableCell align="center">{item.entregador.nome + " " + item.entregador.sobrenome}</TableCell>
                                        <TableCell align="center">{item.destinatario.cidade}</TableCell>
                                        <TableCell align="center">{item.destinatario.estado}</TableCell>
                                        <TableCell align="center">{item.status}</TableCell>
                                        <TableCell align="center">
                                            <IconButton sx={{ padding: 0, margin: 0 }}>
                                                <MoreVertIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow> 
                                ))
                            )}  
                        </TableBody>
                    </Table>
                    <div style={{position:"relative"}}>
                        <TablePagination
                            count={totalRows}
                            onPageChange={handleOnPageChange}
                            page={page}
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
        </GlobalLayout>
    );
}