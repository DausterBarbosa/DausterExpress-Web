import GlobalLayout from '../../components/GlobalLayout';

import MoreVertIcon from '@mui/icons-material/MoreVert';

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

const ProblemsPageContainer = styled('div')({
    width: '90vw',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '90px',
});

export default function ProblemsPage(){
    return (
        <GlobalLayout>
            <ProblemsPageContainer>
                <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '20px', marginBottom: '30px'}}>GERENCIAR PROBLEMAS</Typography>
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
            </ProblemsPageContainer>
        </GlobalLayout>
    );
}