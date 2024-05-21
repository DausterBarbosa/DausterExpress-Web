import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ErrorIcon from '@mui/icons-material/Error';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/system';

const OrdersPageContainer = styled('div')({
    width: '100vw',
    height: '100vh',
    backgroundColor: '#EEE',
    display: 'flex',
    flexDirection: 'column',
});

const StatusOrdersPageContainer = styled('div')({
    marginTop: '100px',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
});

const StatusContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '5px 5px 5px #DDD',

    '& + &': {
        marginLeft: '20px',
    }
});

export default function OrdersPage(){
    return (
        <OrdersPageContainer>
            <StatusOrdersPageContainer>
                <StatusContainer>
                    <CheckCircleIcon sx={{fontSize: '40px', color: '#3e973f'}}/>
                    <Box marginLeft={'5px'}>
                        <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>ENTREGUES HOJE</Typography>
                        <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>10</Typography>
                    </Box>
                </StatusContainer>
                <StatusContainer>
                    <WatchLaterIcon sx={{fontSize: '40px', color: '#613f7f'}}/>
                    <Box marginLeft={'5px'}>
                        <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>PENDENTES</Typography>
                        <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>10</Typography>
                    </Box>
                </StatusContainer>
                <StatusContainer>
                    <LocalShippingIcon sx={{fontSize: '40px', color: '#ff6200'}}/>
                    <Box marginLeft={'5px'}>
                        <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>RETIRADOS HOJE</Typography>
                        <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>10</Typography>
                    </Box>
                </StatusContainer>
                <StatusContainer>
                    <ErrorIcon sx={{fontSize: '40px', color: '#e21a47'}}/>
                    <Box marginLeft={'5px'}>
                        <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>PROBLEMAS</Typography>
                        <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>10</Typography>
                    </Box>
                </StatusContainer>
            </StatusOrdersPageContainer>
        </OrdersPageContainer>
    );
}