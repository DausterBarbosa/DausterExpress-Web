import {useState, useContext} from "react";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import Alert, {AlertColor} from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import AuthContext from "../../contexts/auth";

import { styled } from '@mui/system';

const LoginPageContainer = styled('div')({
    width: '100vw',
    height: '100vh',
    background: "#4d148c",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const LoginPagePanelContainer = styled('form')({
    background: '#FFF',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    alignItems: 'center',
})

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [alertType, setAlertType] = useState<AlertColor>("success");
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState("");

    const {signIn, isChecked, handleChecked, isPending} = useContext(AuthContext);

    async function handleLogin(){
        if(email.trim() === "" || password.trim() === ""){
            setAlertType("warning");
            setMessageAlert("Preencha todos os campos!");
            setAlert(true);
        }
        else {
            try {
                await signIn(email, password);   
            } catch (error) {
                setAlertType("error");
                setMessageAlert("Credenciais inválidas!");
                setAlert(true);
            }
        }
    }

    return (
        <LoginPageContainer>
            <LoginPagePanelContainer>
                <Typography>
                <Box component="span" sx={{color: '#4d148c', fontWeight: 'bold', fontSize: '40px'}}>
                    Dauster
                </Box>
                <Box component="span" sx={{color: '#ff6200', fontWeight: 'bold', fontSize: '40px'}}>
                    Express
                </Box>
                </Typography>
                <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                placeholder='Email'
                sx={
                    {
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#ff6200',
                            },
                          },
                    }
                }/>
                <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                placeholder='Senha'
                type='password'
                sx={
                    {
                        margin: '10px 0 10px 0',
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#ff6200',
                            },
                          },
                    }
                }/>
                <FormControlLabel control={<Checkbox checked={isChecked} onChange={(e) => handleChecked(e.target.checked)}/>} label="Permanecer conectado" sx={{width:'100%', color:'#666'}}/>
                <Button
                disabled={isPending}
                onClick={handleLogin}
                fullWidth
                sx={{
                    backgroundColor: '#ff6200',
                    color: 'white',
                    padding: '10px',
                    fontWeight: 'bold',
                    '&:hover': {
                        backgroundColor: '#ff6200',
                    }}
                }>
                    {isPending ? <CircularProgress style={{color:'#FFF'}} size={30}/> : "ENTRAR"}
                </Button>    
            </LoginPagePanelContainer>
            <Snackbar open={alert} autoHideDuration={6000} anchorOrigin={{vertical: "top", horizontal: "right"}} onClose={() => setAlert(false)}>
                    <Alert
                    onClose={() => setAlert(false)}
                    severity={alertType}
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    {messageAlert}
                    </Alert>
                </Snackbar>
        </LoginPageContainer>
    );
}