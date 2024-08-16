import { styled } from '@mui/system';

import CircularProgress from '@mui/material/CircularProgress';

const LoadingContainer = styled('div')({
    width: '100vw',
    height: '100vh',
    background: "#4d148c",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export default function LoadingModal(){
    return (
        <LoadingContainer>
            <CircularProgress style={{color:'#ff6200'}} size={80}/>
        </LoadingContainer>
    );
}