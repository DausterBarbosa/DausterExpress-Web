import {useState} from 'react';

import ProblemInformationModal from '../../components/ProblemInformationModal';
import DialogModal from '../../components/DialogModal';

import GlobalLayout from '../../components/GlobalLayout';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import CircularProgress from '@mui/material/CircularProgress';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert, {AlertColor} from '@mui/material/Alert';

import { useQueryClient } from '@tanstack/react-query';

import {useChangeStatusOrder} from "../../controllers/orderController";

import {useGetProblems} from '../../controllers/problemController';

import { styled } from '@mui/system';

const ProblemsPageContainer = styled('div')({
    width: '90vw',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '90px',
});

interface OrderProps{
    id: string;
    encomenda: string;
    imagem_url: string | null;
    data_retirada: string | null;
    data_entrega: string | null;
    description_problem: string;
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
    problemas: any[];
}

export default function ProblemsPage(){
    const queryClient = useQueryClient();

    const [anchorElOptions, setAnchorElOptions] = useState<null | HTMLElement>(null);
    const openOptions = Boolean(anchorElOptions);

    const [rowId, setRowId] = useState<null | string>(null);

    const [dialogModal, setDialogModal] = useState(false);

    const [orderData, setOrderData] = useState<OrderProps>();

    const [problemInformationModal, setProblemInformationModal] = useState(false);

    const [queryParams, setQueryParams] = useState({
        page: 0,
    });

    const [alertType, setAlertType] = useState<AlertColor>("success");
    const [alert, setAlert] = useState(false);

    const {isLoading, data, isSuccess} = useGetProblems(queryParams);

    const {isPending, mutateAsync} = useChangeStatusOrder();

    function handleOnPageChange(event:unknown, newPage:number){
        setQueryParams({
            ...queryParams,
            page: newPage,
        });
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
                status: "cancelado"
            });

            setDialogModal(false);
            setAlertType("success");
            setAlert(true);
            queryClient.invalidateQueries({queryKey: ['getOrders']});
            queryClient.invalidateQueries({queryKey: ['getStatus']});
            queryClient.invalidateQueries({queryKey: ['getProblems']});
        } catch (error) {
            setDialogModal(false);
            setAlertType("error");
            setAlert(true);
        }
    }

    function handleClickOptions(event: React.MouseEvent<HTMLButtonElement>, id:string){
        setRowId(id);
        setAnchorElOptions(event.currentTarget);
    }

    function handleCloseOptions(){
        setAnchorElOptions(null);
    }

    function handleInformationModal(order:any){
        setAnchorElOptions(null);
        setOrderData(order);
        setProblemInformationModal(true);
    }

    return (
        <GlobalLayout>
            <ProblemInformationModal open={problemInformationModal} setOpen={setProblemInformationModal} data={orderData}/>
            <DialogModal handleRequest={handleChangeStatus} open={dialogModal} setOpen={setDialogModal} loading={isPending} title="Cancelar entrega do item?" description="Tenha certeza de ter escolhido o item correto. Confirmar ação?"/>
            <ProblemsPageContainer>
                <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '20px', marginBottom: '30px'}}>GERENCIAR PROBLEMAS</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{backgroundColor: '#4d148c'}}>
                            <TableRow>
                                <TableCell align="center" sx={{fontWeight: 'bold', color: '#FFF', fontSize: '14px'}}>DESTINATÁRIO</TableCell>
                                <TableCell align="center" sx={{fontWeight: 'bold', color: '#FFF', fontSize: '14px'}}>ENTREGADOR</TableCell>
                                <TableCell align="center" sx={{fontWeight: 'bold', color: '#FFF', fontSize: '14px'}}>ITEM</TableCell>
                                <TableCell align="center" sx={{fontWeight: 'bold', color: '#FFF', fontSize: '14px'}}>AÇÕES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isSuccess && (
                                data.data.map((item:any) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="center">{item.destinatario.nome}</TableCell>
                                        <TableCell align="center">{item.entregador.nome + " " + item.entregador.sobrenome}</TableCell>
                                        <TableCell align="center">{item.encomenda}</TableCell>
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
                                                    <MenuItem onClick={() => handleDialogModal(item)}>Cancelar</MenuItem>
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
            </ProblemsPageContainer>
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