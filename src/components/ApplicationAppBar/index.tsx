import { NavLink } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function ApplicationAppBar(){
    return (
        <AppBar position='fixed' elevation={5} sx={{backgroundColor:'#4d148c', padding:'0 10px 0 20px', alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
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
                    <NavLink
                        to="/encomendas"
                        style={({isActive}) => ({
                            backgroundColor: isActive ? "rgba(255, 255, 255, 0.3)": "",
                            textDecoration: "none",
                            fontWeight: "bold",
                            fontSize: "15px",
                            color: "#FFF",
                            fontFamily: "arial",
                            padding: "10px",
                        })}
                    >
                        ENCOMENDAS
                    </NavLink>
                    <NavLink
                        to="/entregadores"
                        style={({isActive}) => ({
                            backgroundColor: isActive ? "rgba(255, 255, 255, 0.3)": "",
                            textDecoration: "none",
                            fontWeight: "bold",
                            fontSize: "15px",
                            color: "#FFF",
                            fontFamily: "arial",
                            padding: "10px",
                        })}
                    >
                            ENTREGADORES
                    </NavLink>
                    <NavLink
                        to="/destinatarios"
                        style={({isActive}) => ({
                            backgroundColor: isActive ? "rgba(255, 255, 255, 0.3)": "",
                            textDecoration: "none",
                            fontWeight: "bold",
                            fontSize: "15px",
                            color: "#FFF",
                            fontFamily: "arial",
                            padding: "10px",
                        })}
                    >
                        DESTINATÁRIOS
                    </NavLink>
                    <NavLink
                        to="/problemas"
                        style={({isActive}) => ({
                            backgroundColor: isActive ? "rgba(255, 255, 255, 0.3)": "",
                            textDecoration: "none",
                            fontWeight: "bold",
                            fontSize: "15px",
                            color: "#FFF",
                            fontFamily: "arial",
                            padding: "10px",
                        })}
                    >
                        PROBLEMAS
                    </NavLink>
                </Toolbar>
                <NavLink
                    to="/"
                    style={({isActive}) => ({
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "15px",
                        color: "#FFF",
                        fontFamily: "arial",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center"
                    })}
                >
                    SAIR
                    <ExitToAppIcon sx={{marginLeft:'5px', color:'red'}}/>
                </NavLink>
            </Box>
        </AppBar>
    );
}