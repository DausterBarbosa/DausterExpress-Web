import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

import { styled } from '@mui/system';

const OrdersPageModalContainer = styled('div')({
    backgroundColor: '#FFF',
    padding: '20px',
    position: 'relative',
    width: '600px'
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

interface InformationModalProps {
    open: boolean;
    setOpen: (state:boolean) => void;
    data: DeliverymanProps | undefined
}

const DeliverymanInformationModal:React.FC<InformationModalProps> = ({open, setOpen, data}) => {
    return (
        <Modal open={open} onClose={() => setOpen(false)} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <OrdersPageModalContainer>
                <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>NOME:</span> {data?.nome + " " + data?.sobrenome}</Typography>
                <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>EMAIL:</span> {data?.email}</Typography>
                <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>TELEFONE:</span> {data?.telefone}</Typography>
                <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>ESTADO:</span> {data?.estado}</Typography>
                <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>CIDADE:</span> {data?.cidade}</Typography>
                <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>CEP:</span> {data?.cep}</Typography>
                <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>ENDEREÇO:</span> {data?.endereco}</Typography>
                <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>NÚMERO:</span> {data?.numero}</Typography>
                <IconButton sx={{ padding: 0, margin: 0, color:'#4d148c', position: 'absolute', top: 5, right: 5}} onClick={() => setOpen(false)}>
                    <CancelIcon fontSize="large"/>
                </IconButton>
            </OrdersPageModalContainer>
        </Modal>
    );
}

export default DeliverymanInformationModal;