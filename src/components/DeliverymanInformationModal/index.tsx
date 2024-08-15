import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

import PersonIcon from '@mui/icons-material/Person';

import { styled } from '@mui/system';

const OrdersPageModalContainer = styled('div')({
    backgroundColor: '#FFF',
    padding: '20px',
    position: 'relative',
    width: '600px'
});

const ProfileImage = styled("img")({
    width: "200px",
    height: "200px",
    borderRadius: "100px",
    objectFit: "cover"
});

const ProfileImageEmpty = styled("div")({
    width: "200px",
    height: "200px",
    borderRadius: "100px",
    background: "#EEE",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const ImageContainer = styled("div")({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px"
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
    url_image_profile: string;
}

interface InformationModalProps {
    open: boolean;
    setOpen: (state:boolean) => void;
    data: DeliverymanProps | undefined
}

const DeliverymanInformationModal:React.FC<InformationModalProps> = ({open, setOpen, data}) => {
    return (
        console.log(data),
        <Modal open={open} onClose={() => setOpen(false)} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <OrdersPageModalContainer>
                {data !== undefined && (
                    data.url_image_profile === null ? (
                        <ImageContainer>
                            <ProfileImageEmpty>
                                <PersonIcon sx={{fontSize: "150px", color: "#333"}}/>
                            </ProfileImageEmpty>
                        </ImageContainer>
                    ) : (
                        <ImageContainer>
                            <ProfileImage src={data.url_image_profile}/>
                        </ImageContainer>
                    )
                )}
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