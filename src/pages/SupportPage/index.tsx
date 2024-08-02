import GlobalLayout from "../../components/GlobalLayout";

import SendIcon from '@mui/icons-material/Send';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { styled } from '@mui/system';

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
    background: '#EEE'
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

export default function SupportPage(){
    return (
        <GlobalLayout>
            <SupportPageContainer>
                <ContactList>
                    <ContactListHeader>
                        <TextField sx={{
                            background: "#FFF", 
                            '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: 'none',
                            },
                            },
                        }} size='small' fullWidth placeholder="Pesquisar entregador"/>
                    </ContactListHeader>
                    <ItemList>
                        <ItemListImage src="https://www.eutesalvo.com/arquivos/upload/eutesalvo-39551fc526efc2565b395948069b8cc1.jpg"/>
                        <ItemListLabel>Adolfinho Hitler</ItemListLabel>
                    </ItemList>
                    <ItemList>
                        <ItemListImage src="https://www.eutesalvo.com/arquivos/upload/eutesalvo-39551fc526efc2565b395948069b8cc1.jpg"/>
                        <ItemListLabel>Adolfinho Hitler</ItemListLabel>
                    </ItemList>
                    <ItemList>
                        <ItemListImage src="https://www.eutesalvo.com/arquivos/upload/eutesalvo-39551fc526efc2565b395948069b8cc1.jpg"/>
                        <ItemListLabel>Adolfinho Hitler</ItemListLabel>
                    </ItemList>
                    <ItemList>
                        <ItemListImage src="https://www.eutesalvo.com/arquivos/upload/eutesalvo-39551fc526efc2565b395948069b8cc1.jpg"/>
                        <ItemListLabel>Adolfinho Hitler</ItemListLabel>
                    </ItemList>
                    <ItemList>
                        <ItemListImage src="https://www.eutesalvo.com/arquivos/upload/eutesalvo-39551fc526efc2565b395948069b8cc1.jpg"/>
                        <ItemListLabel>Adolfinho Hitler</ItemListLabel>
                    </ItemList>
                </ContactList>
                <ChatContainer>
                    <ProfileBar>
                        <ProfileImage src="https://www.eutesalvo.com/arquivos/upload/eutesalvo-39551fc526efc2565b395948069b8cc1.jpg"/>
                        <ProfileLabel>Adolfinho Hitler</ProfileLabel>
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
            </SupportPageContainer>
        </GlobalLayout>
    );
}