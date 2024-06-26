import {useState} from 'react';

import GlobalLayout from '../../components/GlobalLayout';
import DeliverymanPageModal from '../../components/DeliverymanPageModal';
import DialogModal from '../../components/DialogModal';
import DeliverymanInformationModal from '../../components/DeliverymanInformationModal';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
import Snackbar from '@mui/material/Snackbar';
import Alert, {AlertColor} from '@mui/material/Alert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useQueryClient } from '@tanstack/react-query';

import {useGetDeliverymans, useDeleteDeliveryman} from '../../controllers/deliverymanController';

import { styled } from '@mui/system';

const DeliverymanPageContainer = styled('div')({
    width: '90vw',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '90px',
});

interface DeliverymanProps{
    id: string;
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    estado: string;
    cidade: string;
    cep: string;
    endereco: string;
    numero: string;
}

export default function DeliverymanPage(){
    const queryClient = useQueryClient();

    const [dialogModal, setDialogModal] = useState(false);

    const [deliverymanModalRegister, setDeliverymanModalRegister] = useState(false);

    const [deliverymanData, setDeliverymanData] = useState<DeliverymanProps>();

    const [informationModal, setInformationModal] = useState(false);

    const [alertType, setAlertType] = useState<AlertColor>("success");
    const [alert, setAlert] = useState(false);

    const [searchDeliveryman, setSearchDeliveryman] = useState("");

    const [queryParams, setQueryParams] = useState({
        page: 0,
        take: 5,
        mode: "",
        entregador: "",
    });

    const [rowId, setRowId] = useState<null | string>(null);

    const [anchorElOptions, setAnchorElOptions] = useState<null | HTMLElement>(null);
    const openOptions = Boolean(anchorElOptions);

    const {isPending:isLoadingDeleteDeliverymans, mutateAsync} = useDeleteDeliveryman();

    const {data:dataDeliverymans, isLoading:isLoadingDeliverymans, isSuccess:isGetDeliverymansSuccess} = useGetDeliverymans(true, queryParams);

    function handleClickOptions(event: React.MouseEvent<HTMLButtonElement>, id:string){
        setRowId(id);
        setAnchorElOptions(event.currentTarget);
    }

    function handleCloseOptions(){
        setAnchorElOptions(null);
    }

    function handleDialogModal(deliveryman:any){
        setAnchorElOptions(null);
        setDeliverymanData(deliveryman);
        setDialogModal(true);
    }

    async function handleDeleteDeliveryman(){
        try {
            const data = await mutateAsync(deliverymanData!.id);

            setDialogModal(false);
            setAlertType("success");
            setAlert(true);
            queryClient.invalidateQueries({queryKey: ['getDeliverymans']});
        } catch (error) {
            setDialogModal(false);
            setAlertType("error");
            setAlert(true);
        }
    }

    function handleOnPageChange(event:unknown, newPage:number){
        setQueryParams({
            ...queryParams,
            page: newPage,
        });
    }

    function handleDeliverymanSearch(){
        if(searchDeliveryman.trim() === ""){
            setAlertType("warning");
            setAlert(true);
        }
        else{
            setQueryParams({
                page: 0,
                take: 5,
                mode: "",
                entregador: searchDeliveryman,
            });
        }
    }

    function handleDeliverymanSearchField(search:any){
        setSearchDeliveryman(search);

        if(search === ""){
            setQueryParams({
                page: 0,
                take: 5,
                mode: "",
                entregador: "",
            });
        }
    }

    function handleInformationModal(deliveryman:any){
        setAnchorElOptions(null);
        setDeliverymanData(deliveryman);
        setInformationModal(true);
    }

    return (
        <GlobalLayout>
            <DeliverymanPageModal open={deliverymanModalRegister} setOpen={setDeliverymanModalRegister}/>
            <DeliverymanInformationModal open={informationModal} setOpen={setInformationModal} data={deliverymanData}/>
            <DialogModal handleRequest={handleDeleteDeliveryman} open={dialogModal} setOpen={setDialogModal} loading={isLoadingDeleteDeliverymans} title="Deletar entregador?" description="Todas as encomendas ligadas a este entregador serão deletadas e essa ação não pode ser desfeita. Confirmar ação?"/>
            <DeliverymanPageContainer>
                <Stack direction="column">
                    <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '20px'}}>GERENCIAR ENTREGADORES</Typography>
                    <Stack direction="row" justifyContent='space-between' margin='30px 0'>
                    <Stack spacing={1} direction="row">
                        <TextField sx={{backgroundColor: '#FFF'}} size='small' placeholder='Pesquisar entregador' onChange={(e) => handleDeliverymanSearchField(e.target.value)}/>
                        <Button variant="contained" sx={{backgroundColor: '#4d148c', fontWeight: 'bold'}} onClick={handleDeliverymanSearch}>PESQUISAR</Button>
                    </Stack>
                        <Button variant="contained" sx={{backgroundColor: '#4d148c', fontWeight: 'bold'}} onClick={() => setDeliverymanModalRegister(true)}>CADASTRAR</Button>
                    </Stack>
                </Stack>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{backgroundColor: '#4d148c'}}>
                            <TableRow>
                                <TableCell align="center" sx={{fontWeight: 'bold', color: '#FFF', fontSize: '14px'}}>NOME</TableCell>
                                <TableCell align="center" sx={{fontWeight: 'bold', color: '#FFF', fontSize: '14px'}}>EMAIL</TableCell>
                                <TableCell align="center" sx={{fontWeight: 'bold', color: '#FFF', fontSize: '14px'}}>TELEFONE</TableCell>
                                <TableCell align="center" sx={{fontWeight: 'bold', color: '#FFF', fontSize: '14px'}}>CIDADE</TableCell>
                                <TableCell align="center" sx={{fontWeight: 'bold', color: '#FFF', fontSize: '14px'}}>ESTADO</TableCell>
                                <TableCell align="center" sx={{fontWeight: 'bold', color: '#FFF', fontSize: '14px'}}>AÇÕES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isGetDeliverymansSuccess && (
                                dataDeliverymans.data.map((item:any) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="center" sx={{fontSize: '15px'}}>{item.nome + " " + item.sobrenome}</TableCell>
                                        <TableCell align="center" sx={{fontSize: '15px'}}>{item.email}</TableCell>
                                        <TableCell align="center" sx={{fontSize: '15px'}}>{item.telefone}</TableCell>
                                        <TableCell align="center" sx={{fontSize: '15px'}}>{item.cidade}</TableCell>
                                        <TableCell align="center" sx={{fontSize: '15px'}}>{item.estado}</TableCell>
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
                                                    <MenuItem onClick={() => handleDialogModal(item)}>Excluir</MenuItem>
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
                            count={dataDeliverymans ? dataDeliverymans.total : 0}
                            onPageChange={handleOnPageChange}
                            page={queryParams.page}
                            rowsPerPage={5}
                            rowsPerPageOptions={[]}
                            sx={{
                                margin: 0,
                                padding: 0
                            }}
                        />
                        {isLoadingDeliverymans && (
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
            </DeliverymanPageContainer>
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