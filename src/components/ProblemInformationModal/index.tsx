import {useState} from "react";

import Modal from '@mui/material/Modal';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { styled } from '@mui/system';
import { Box } from "@mui/material";

const GeneralContainer = styled("div")({
    background: "#FFF",
    width: '600px',
    position: 'relative',
});

const ProblemsContainer = styled("div")({
    height: "300px",
    overflowY: "scroll",
    padding: "5px"
});

const CustomTab = styled(Tab)({
    "&.Mui-selected": {
        color: "#4d148c",
      },
});

const CustomTabs = styled(Tabs)({
    "& .MuiTabs-indicator": {
        backgroundColor: "#4d148c",
        height: "2px",
    },
});

interface OrderProps{
    encomenda: string;
    imagem_url: string | null;
    data_retirada: string | null;
    data_entrega: string | null;
    status: string;
    description_problem: string;
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
    problemas: any[];
}

interface InformationModalProps {
    open: boolean;
    setOpen: (state:boolean) => void;
    data: OrderProps | undefined;
}

function formattedDate(dateString:string){
    return new Date(dateString).toLocaleDateString("pt-BR", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p:2 }}>{children}</Box>}
      </div>
    );
  }

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ProblemInformationModal:React.FC<InformationModalProps> = ({open, setOpen, data}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        console.log(data),
        <Modal open={open} onClose={() => setOpen(false)} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <GeneralContainer>
                <CustomTabs value={value} onChange={handleChange}>
                    <CustomTab label="Detalhes" {...a11yProps(0)} />
                    <CustomTab label="Problemas" {...a11yProps(1)} />
                </CustomTabs>
                <CustomTabPanel value={value} index={0}>
                    <Typography sx={{fontWeight:"bold"}}>ENCOMENDA</Typography>
                    <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>ITEM:</span> {data?.encomenda}</Typography>
                    <Typography><span style={{fontWeight:"bold", fontSize: "15px", color: "#61605f"}}>RETIRADO:</span> {!data?.data_retirada ? "PENDENTE" : formattedDate(data!.data_retirada)}</Typography>
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
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <ProblemsContainer>
                        {data !== undefined && (
                            data.problemas.map((item) => (
                                <Typography sx={{background: "#EEE", padding: "10px", marginBottom: "5px"}}>{item.descricao}</Typography>
                            ))
                        )}
                    </ProblemsContainer>
                </CustomTabPanel>
                <IconButton sx={{ padding: 0, margin: 0, color:'#4d148c', position: 'absolute', top: 5, right: 5}} onClick={() => setOpen(false)}>
                    <CancelIcon fontSize="large"/>
                </IconButton>
            </GeneralContainer>
        </Modal>
    );
}

export default ProblemInformationModal;