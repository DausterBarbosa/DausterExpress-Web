import Modal from '@mui/material/Modal';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Divider from '@mui/material/Divider';

import { styled } from '@mui/system';

const OrdersPageModalContainer = styled('div')({
    backgroundColor: '#FFF',
    padding: '20px',
    position: 'relative',
    width: '600px'
});

interface OrderProps{
    encomenda: string;
    imagem_url: string | null;
    data_retirada: string | null;
    data_entrega: string | null;
    status: string;
    destinatario: {
        nome: string;
        telefone: string;
        email: string;
    };
    entregador: {
        nome: string;
        sobrenome: string;
        telefone: string;
        email: string;
    };
}

interface InformationModalProps {
    open: boolean;
    setOpen: (state:boolean) => void;
    data: OrderProps | undefined;
}

const OrderInformationModal:React.FC<InformationModalProps> = ({open, setOpen, data}) => {
    return (
        <Modal open={open} onClose={() => setOpen(false)} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <OrdersPageModalContainer>
                <Typography sx={{fontWeight:"bold"}}>ENCOMENDA</Typography>
                <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>ITEM:</span> {data?.encomenda}</Typography>
                <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>STATUS:</span> {data?.status}</Typography>
                <Divider sx={{margin: "10px 0"}}/>
                <Typography sx={{fontWeight:"bold", marginTop: "10px"}}>DESTINATÁRIO</Typography>
                <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>NOME:</span> {data?.destinatario.nome}</Typography>
                <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>TELEFONE:</span> {data?.destinatario.telefone}</Typography>
                <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>EMAIL:</span> {data?.destinatario.email}</Typography>
                <Divider sx={{margin: "10px 0"}}/>
                <Typography sx={{fontWeight:"bold", marginTop: "10px"}}>ENTREGADOR</Typography>
                <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>NOME:</span> {data?.entregador.nome + " " + data?.entregador.sobrenome}</Typography>
                <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>TELEFONE:</span> {data?.entregador.telefone}</Typography>
                <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>EMAIL:</span> {data?.entregador.email}</Typography>
                <Divider sx={{margin: "10px 0"}}/>
                <Typography sx={{fontWeight:"bold", marginTop: "10px"}}>DATAS</Typography>
                <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>RETIRADO:</span> {data?.data_retirada === null ? "Pendente" : ""}</Typography>
                <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>ENTREGUE:</span> {data?.data_entrega === null ? "Pendente" : ""}</Typography>
                <Divider sx={{margin: "10px 0"}}/>
                <Typography sx={{fontWeight:"bold", marginTop: "10px"}}>IMAGEM DA ENTREGA: Pendente</Typography>
                <IconButton sx={{ padding: 0, margin: 0, color:'#4d148c', position: 'absolute', top: 5, right: 5}} onClick={() => setOpen(false)}>
                    <CancelIcon fontSize="large"/>
                </IconButton>
            </OrdersPageModalContainer>
        </Modal>
    );
}

export default OrderInformationModal;