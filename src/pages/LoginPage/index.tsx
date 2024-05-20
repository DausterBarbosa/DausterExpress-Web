import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { styled } from '@mui/system';

const LoginPageContainer = styled('div')({
    width: '100vw',
    height: '100vh',
    background: '#4d148c',
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
    borderRadius: '20px'
})

export default function LoginPage(){
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
                <TextField fullWidth placeholder='Email' sx={
                    {
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#ff6200',
                            },
                          },
                    }
                }/>
                <TextField fullWidth placeholder='Senha' type='password' sx={
                    {
                        margin: '10px 0 10px 0',
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#ff6200',
                            },
                          },
                    }
                }/>
                <FormControlLabel control={<Checkbox />} label="Permanecer conectado" sx={{width:'100%', color:'#666'}}/>
                <Button fullWidth sx={{
                    backgroundColor: '#ff6200',
                    color: 'white',
                    padding: '10px',
                    fontWeight: 'bold',
                    '&:hover': {
                        backgroundColor: '#ff6200',
                    }}
                }>ENTRAR</Button>    
            </LoginPagePanelContainer>
        </LoginPageContainer>
    );
}