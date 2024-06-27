import {useState} from 'react';

import GlobalLayout from '../../components/GlobalLayout';
import RecipientsPageModal from '../../components/RecipientsPageModal';
import DialogModal from '../../components/DialogModal';
import RecipientInformationModal from '../../components/RecipientInformationModal';

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

import {useGetRecipients, useDeleteRecipient} from '../../controllers/recipientController';

import { styled } from '@mui/system';

const DeliverymanPageContainer = styled('div')({
    width: '90vw',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '90px',
});

interface RecipientProps{
    id: string;
    nome: string;
    cnpj: string;
    email: string;
    telefone: string;
    estado: string;
    cidade: string;
    cep: string;
    endereco: string;
    numero: string;
    complemento: string;
}

export default function RecipientsPage(){
    const queryClient = useQueryClient();

    const [dialogModal, setDialogModal] = useState(false);

    const [recipientModalRegister, setRecipientModalRegister] = useState(false);

    const [recipientData, setRecipientData] = useState<RecipientProps>();

    const [informationModal, setInformationModal] = useState(false);

    const [alertType, setAlertType] = useState<AlertColor>("success");
    const [alert, setAlert] = useState(false);

    const [searchRecipient, setSearchRecipient] = useState("");

    const [queryParams, setQueryParams] = useState({
        page: 0,
        take: 5,
        mode: "",
        destinatario: "",
    });

    const [rowId, setRowId] = useState<null | string>(null);

    const [anchorElOptions, setAnchorElOptions] = useState<null | HTMLElement>(null);
    const openOptions = Boolean(anchorElOptions);

    const {isPending:isLoadingDeleteRecipients, mutateAsync} = useDeleteRecipient();

    const {data:dataRecipients, isLoading:isLoadingRecipients, isSuccess:isGetRecipientsSuccess} = useGetRecipients(true, queryParams);

    function handleClickOptions(event: React.MouseEvent<HTMLButtonElement>, id:string){
        setRowId(id);
        setAnchorElOptions(event.currentTarget);
    }

    function handleCloseOptions(){
        setAnchorElOptions(null);
    }

    function handleDialogModal(recipient:any){
        setAnchorElOptions(null);
        setRecipientData(recipient);
        setDialogModal(true);
    }

    async function handleDeleteRecipient(){
        try {
            const data = await mutateAsync(recipientData!.id);

            setDialogModal(false);
            setAlertType("success");
            setAlert(true);
            queryClient.invalidateQueries({queryKey: ['getRecipients']});
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

    function handleRecipientSearch(){
        if(searchRecipient.trim() === ""){
            setAlertType("warning");
            setAlert(true);
        }
        else{
            setQueryParams({
                page: 0,
                take: 5,
                mode: "",
                destinatario: searchRecipient,
            });
        }
    }

    function handleRecipientSearchField(search:any){
        setSearchRecipient(search);

        if(search === ""){
            setQueryParams({
                page: 0,
                take: 5,
                mode: "",
                destinatario: "",
            });
        }
    }

    function handleInformationModal(recipient:any){
        setAnchorElOptions(null);
        setRecipientData(recipient);
        setInformationModal(true);
    }

    return (
        <GlobalLayout>
            <RecipientsPageModal open={recipientModalRegister} setOpen={setRecipientModalRegister}/>
            <RecipientInformationModal open={informationModal} setOpen={setInformationModal} data={recipientData}/>
            <DialogModal handleRequest={handleDeleteRecipient} open={dialogModal} setOpen={setDialogModal} loading={isLoadingDeleteRecipients} title="Deletar destinatário?" description="Todas as encomendas ligadas a este destinatário serão deletadas e essa ação não pode ser desfeita. Confirmar ação?"/>
            <DeliverymanPageContainer>
                <Stack direction="column">
                    <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '20px'}}>GERENCIAR DESTINATÁRIOS</Typography>
                    <Stack direction="row" justifyContent='space-between' margin='30px 0'>
                    <Stack spacing={1} direction="row">
                        <TextField sx={{backgroundColor: '#FFF'}} size='small' placeholder='Pesquisar destinatários' onChange={(e) => handleRecipientSearchField(e.target.value)}/>
                        <Button variant="contained" sx={{backgroundColor: '#4d148c', fontWeight: 'bold'}} onClick={handleRecipientSearch}>PESQUISAR</Button>
                    </Stack>    
                        <Button variant="contained" sx={{backgroundColor: '#4d148c', fontWeight: 'bold'}} onClick={() => setRecipientModalRegister(true)}>CADASTRAR</Button>
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
                        {isGetRecipientsSuccess && (
                                dataRecipients.data.map((item:any) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="center" sx={{fontSize: '15px'}}>{item.nome}</TableCell>
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
                            count={dataRecipients ? dataRecipients.total : 0}
                            onPageChange={handleOnPageChange}
                            page={queryParams.page}
                            rowsPerPage={5}
                            rowsPerPageOptions={[]}
                            sx={{
                                margin: 0,
                                padding: 0
                            }}
                        />
                        {isLoadingRecipients && (
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
            </DeliverymanPageContainer>
        </GlobalLayout>
    );
}