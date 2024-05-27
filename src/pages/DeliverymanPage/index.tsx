import GlobalLayout from '../../components/GlobalLayout';
import DeliverymanPageModal from '../../components/DeliverymanPageModal';

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

import { styled } from '@mui/system';

const DeliverymanPageContainer = styled('div')({
    width: '90vw',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '90px',
});


export default function DeliverymanPage(){
    return (
        <GlobalLayout>
            {/* <DeliverymanPageModal/> */}
            <DeliverymanPageContainer>
                <Stack direction="column">
                    <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '20px'}}>GERENCIAR ENTREGADORES</Typography>
                    <Stack direction="row" justifyContent='space-between' margin='30px 0'>
                        <TextField sx={{backgroundColor: '#FFF'}} size='small' placeholder='Pesquisar entregador'/>
                        <Button variant="contained" sx={{backgroundColor: '#4d148c', fontWeight: 'bold'}}>CADASTRAR</Button>
                    </Stack>
                </Stack>
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
                            <TableRow>
                                <TableCell align="center">asdfasdf</TableCell>
                                <TableCell align="center">asdfasdf</TableCell>
                                <TableCell align="center">asdfasdfasdf</TableCell>
                                <TableCell align="center">asdfasdf</TableCell>
                                <TableCell align="center">asdfasdfasdf</TableCell>
                                <TableCell align="center">
                                    <IconButton sx={{ padding: 0, margin: 0 }}>
                                        <MoreVertIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">asdfasdf</TableCell>
                                <TableCell align="center">asdfasdf</TableCell>
                                <TableCell align="center">asdfasdfasdf</TableCell>
                                <TableCell align="center">asdfasdf</TableCell>
                                <TableCell align="center">asdfasdfasdf</TableCell>
                                <TableCell align="center">
                                    <IconButton sx={{ padding: 0, margin: 0 }}>
                                        <MoreVertIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">asdfasdf</TableCell>
                                <TableCell align="center">asdfasdf</TableCell>
                                <TableCell align="center">asdfasdfasdf</TableCell>
                                <TableCell align="center">asdfasdf</TableCell>
                                <TableCell align="center">asdfasdfasdf</TableCell>
                                <TableCell align="center">
                                    <IconButton sx={{ padding: 0, margin: 0 }}>
                                        <MoreVertIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">asdfasdf</TableCell>
                                <TableCell align="center">asdfasdf</TableCell>
                                <TableCell align="center">asdfasdfasdf</TableCell>
                                <TableCell align="center">asdfasdf</TableCell>
                                <TableCell align="center">asdfasdfasdf</TableCell>
                                <TableCell align="center">
                                    <IconButton sx={{ padding: 0, margin: 0 }}>
                                        <MoreVertIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">asdfasdf</TableCell>
                                <TableCell align="center">asdfasdf</TableCell>
                                <TableCell align="center">asdfasdfasdf</TableCell>
                                <TableCell align="center">asdfasdf</TableCell>
                                <TableCell align="center">asdfasdfasdf</TableCell>
                                <TableCell align="center">
                                    <IconButton sx={{ padding: 0, margin: 0 }}>
                                        <MoreVertIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <TablePagination
                        count={10}
                        onPageChange={() => {}}
                        page={1}
                        rowsPerPage={-1}
                        rowsPerPageOptions={[]}
                    />
                </TableContainer>
            </DeliverymanPageContainer>
        </GlobalLayout>
    );
}