import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function ApplicationAppBar(){
    return (
        <AppBar elevation={5} sx={{backgroundColor:'#4d148c', padding:'0 10px 0 20px', alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
            <Typography>
                <Box component="span" sx={{color: '#FFF', fontWeight: 'bold', fontSize: '25px'}}>
                    Dauster
                </Box>
                <Box component="span" sx={{color: '#ff6200', fontWeight: 'bold', fontSize: '25px'}}>
                    Express
                </Box>
            </Typography>
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <Toolbar>
                    <MenuItem>
                        <Typography sx={{fontWeight: 'bold', fontSize:'15px'}}>ENCOMENDAS</Typography>
                    </MenuItem>
                    <MenuItem>
                        <Typography sx={{fontWeight: 'bold', fontSize:'15px'}}>ENTREGADORES</Typography>
                    </MenuItem>
                    <MenuItem>
                        <Typography sx={{fontWeight: 'bold', fontSize:'15px'}}>DESTINATÁRIOS</Typography>
                    </MenuItem>
                    <MenuItem>
                        <Typography sx={{fontWeight: 'bold', fontSize:'15px'}}>PROBLEMAS</Typography>
                    </MenuItem>
                </Toolbar>
                <MenuItem>
                    <Typography sx={{fontWeight: 'bold', fontSize:'15px', color:'red'}}>SAIR</Typography>
                    <ExitToAppIcon sx={{marginLeft:'5px', color:'red'}}/>
                </MenuItem>
            </Box>
        </AppBar>
    );
}