import {useState} from "react";

import GlobalLayout from "../../components/GlobalLayout";

import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { styled } from '@mui/system';

import {useGetDeliverymans} from "../../controllers/deliverymanController";

import Support from "../../assets/images/support.svg";

const SupportPageContainer = styled('div')({
    width: '90vw',
    height: '570px',
    maxWidth: '1230px',
    marginTop: '70px',
    background: '#FFF',
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
});

const ContactList = styled('div')({
    width: '30%',
    borderRight: '1px solid #FFF',
    background: '#FFF',
});

const ChatContainer = styled('div')({
    width: '70%',
    flexDirection: 'column',
});

const MessagesContainer = styled('div')({
    height: '448px',
    background: '#cac6c6'
});

const TextFieldContainer = styled('div')({
    display: 'flex',
    background: '#4d148c',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px',
});

const ProfileBar = styled('div')({
    background: '#4d148c',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '5px 10px',
});

const ProfileImage = styled('img')({
    width: '50px',
    height: '50px',
    borderRadius: '100px',
});

const ProfileLabel = styled('p')({
    marginLeft: '10px',
    color: '#FFF',
    fontSize: '17px',
    fontWeight: 'bold',
});

const ContactListHeader = styled('div')({
    background: '#4d148c',
    padding: '10px',
});

const ItemList = styled('div')({
    background: '#FFF',
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center;',
    cursor: 'pointer',
    borderBottom: '1px solid #DDD',

    '&:hover':{
        background: '#EEE',
    },
});

const ItemListImage = styled('img')({
    width: '50px',
    height: '50px',
    borderRadius: '100px',
});

const ItemListLabel = styled('p')({
    color: '#333',
    fontSize: '17px',
    fontWeight: 'bold',
    marginLeft: '10px',
});

const PhotoEmpty = styled('div')({
    width: '50px',
    height: '50px',
    borderRadius: '100px',
    background: '#c5c5c5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const PanelContainer = styled('div')({
    flex: 1,
    background: '#EEE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const ContactsContainer = styled('div')({
    overflowY: 'scroll',
    height: '510px',
});

interface DeliverymanProps{
    id: string;
    nome: string;
    sobrenome: string;
    url_image_profile: string;
}

export default function SupportPage(){
    const [deliveryman, setDeliveryman] = useState<DeliverymanProps | null>(null);

    const [searchDeliveryman, setSearchDeliveryman] = useState("");

    const {data, isLoading} = useGetDeliverymans(true, {
        page: null,
        take: null,
        mode: "summary",
        entregador: "",
    });

    function handleDeliveryman(item:DeliverymanProps){
        setDeliveryman(item);
    }

    function handleSearchdeliveryman(){
        return data.data.filter((item:DeliverymanProps) => (item.nome + " " + item.sobrenome).toLowerCase().includes(searchDeliveryman.toLowerCase()));
    } 

    return (
        <GlobalLayout>
            <SupportPageContainer>
                <ContactList>
                    <ContactListHeader>
                        <TextField
                            sx={{
                                background: "#FFF", 
                                '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
                                },
                                },
                            }}
                            size='small'
                            fullWidth
                            placeholder="Pesquisar entregador"
                            onChange={(e) => setSearchDeliveryman(e.target.value)}
                        />
                    </ContactListHeader>
                    {isLoading ? (
                        <p>asdf</p>
                    ) : (
                        <ContactsContainer>
                            {
                                handleSearchdeliveryman().map((item:DeliverymanProps) => (
                                    <ItemList onClick={() => handleDeliveryman(item)} sx={{background: deliveryman !== null ? item.id === deliveryman.id ? "#EEE" : "" : ""}}>
                                    {item.url_image_profile === null ? (
                                        <PhotoEmpty>
                                            <PersonIcon sx={{fontSize: '30px', color: '#333'}}/>
                                        </PhotoEmpty>
                                    ) : (
                                        <ItemListImage src={item.url_image_profile}/>
                                    )}
                                    <ItemListLabel>{item.nome + " " + item.sobrenome}</ItemListLabel>
                                    </ItemList>
                                ))
                            }
                        </ContactsContainer>
                    )}
                </ContactList>
                {deliveryman === null ? (
                    <PanelContainer>
                        <img src={Support} alt="Atendente logo" height="400px"/>
                    </PanelContainer>
                ) : (
                    <ChatContainer>
                        <ProfileBar>
                            {deliveryman.url_image_profile === null ? (
                                <PhotoEmpty>
                                    <PersonIcon sx={{fontSize: '30px', color: '#333'}}/>
                                </PhotoEmpty>
                            ) : (
                                <ItemListImage src={deliveryman.url_image_profile}/>
                            )}
                            <ProfileLabel>{deliveryman.nome + " " + deliveryman.sobrenome}</ProfileLabel>
                        </ProfileBar>
                        <MessagesContainer>

                        </MessagesContainer>
                        <TextFieldContainer>
                            <TextField sx={{
                                background: "#FFF", 
                                '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
                                },
                                },
                            }} size='small' fullWidth placeholder="Mensagem"/>
                            <Button style={{background: "#ff6200", marginLeft: '10px'}}>
                                <SendIcon sx={{fontSize: '30px', color: '#FFF'}}/>
                            </Button>
                        </TextFieldContainer>
                    </ChatContainer>
                )}
            </SupportPageContainer>
        </GlobalLayout>
    );
}