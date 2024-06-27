import {useState} from 'react';

import { useQueryClient } from '@tanstack/react-query';

import CancelIcon from '@mui/icons-material/Cancel';

import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert, {AlertColor} from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import {useRegisterRecipients} from '../../controllers/recipientController';
import {useGetStates, useGetCities} from '../../controllers/ibgeController';

import { styled } from '@mui/system';

const OrdersPageModalContainer = styled('div')({
    backgroundColor: '#FFF',
    padding: '20px',
    position: 'relative',
    width: "550px"
});

interface RecipicientsPageModalProps {
    open: boolean;
    setOpen: (state:boolean) => void;
}

interface FormDataProps{
    nome: string;
    cnpj: string;
    email: string;
    telefone: string;
    estado: string;
    cidade: string;
    cep: string;
    endereco: string;
    numero: string;
    complemento: string;
}

interface DataStateProp{
    sigla: string;
}

interface DataCititesProp{
    nome: string;
}

const RecipientsPageModal:React.FC<RecipicientsPageModalProps> = ({open, setOpen}) => {
    const queryClient = useQueryClient();

    const [alertType, setAlertType] = useState<AlertColor>("success");
    const [alert, setAlert] = useState(false);

    const [formData, setFormData] = useState<FormDataProps>({
        nome: '',
        cnpj: '',
        email: '',
        telefone: '',
        estado: '',
        cidade: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
    });

    const {data:dataStates} = useGetStates();
    const {data:dataCities, isLoading:dataCitiesLoading} = useGetCities(formData.estado);

    const {mutateAsync, isPending} = useRegisterRecipients();

    function handleForm(data:string, value:string){
        setFormData({
            ...formData,
            [data]: value
        });
    }

    async function handleRegister(){
        let formError = false;
        for(const key in formData){
            if(formData[key as keyof FormDataProps] === ''){
                formError = true;
            }
        }

        if(formError){
            setAlertType("warning");
            setAlert(true);
        }
        else {
            try {
                const data = await mutateAsync({...formData});
                setAlertType("success");
                setAlert(true);
                setFormData({
                    nome: '',
                    cnpj: '',
                    email: '',
                    telefone: '',
                    estado: '',
                    cidade: '',
                    cep: '',
                    endereco: '',
                    numero: '',
                    complemento: '',
                });
                queryClient.invalidateQueries({queryKey: ['getRecipients']});
            } catch (error:any) {
                const errorStatus = error.response.status;

                if(errorStatus === 409){
                    setAlertType("info");
                    setAlert(true);
                }
                else {
                    setAlertType("error");
                    setAlert(true);
                }
            }
        }

    }

    function phoneMask(value:string){
        if (!value) handleForm("telefone", "");
        else{
            if(value.length < 15){
                value = value.replace(/\D/g,'');
                value = value.replace(/(\d{2})(\d)/,"($1)$2");
                value = value.replace(/(\d)(\d{4})$/,"$1-$2");
                handleForm("telefone", value)
            }
        }
    }

    function cepMask(value:string){
        if (!value) handleForm("cep", "");
        else{
            if(value.length < 10){
                value = value.replace(/\D/g,'');
                value = value.replace(/(\d)(\d{3})$/,"$1-$2");
                handleForm("cep", value)
            }
        }
    }

    function cnpjMask(value:string){
        if (!value) handleForm("cnpj", "");
        else{
            if(value.length < 19){
                value = value.replace(/\D/g,'');
                value = value.replace(/^(\d{2})(\d)/, "$1.$2");
                value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
                value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
                value = value.replace(/(\d{4})(\d)/, "$1-$2");
                handleForm("cnpj", value)
            }
        }
    }

    function handleResetForm(){
       setFormData({
            nome: '',
            cnpj: '',
            email: '',
            telefone: '',
            estado: '',
            cidade: '',
            cep: '',
            endereco: '',
            numero: '',
            complemento: '',
        });

        setOpen(false)
    }

    return (
        <Modal open={open} onClose={handleResetForm} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <OrdersPageModalContainer>
                <Typography sx={{fontWeight: 'bold', color: '#666', fontSize: '17px'}}>CADASTRAR DESTINATÁRIO</Typography>
                <Stack spacing={2} margin={'20px 0'}>
                    <Stack spacing={2} direction="row">
                    <TextField sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#4d148c !important',
                                },
                            },
                            '& .MuiInputLabel-shrink': {
                                color: '#4d148c !important',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root': {
                                color: '#4d148c !important',
                            },
                            width: '75%'
                        }}
                        label="NOME"
                        variant="outlined"
                        value={formData.nome}
                        onChange={(e) => handleForm("nome", e.target.value)}
                        />
                        <TextField sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#4d148c !important',
                                },
                            },
                            '& .MuiInputLabel-shrink': {
                                color: '#4d148c !important',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root': {
                                color: '#4d148c !important',
                            },
                        }}
                        value={formData.cnpj}
                        label="CNPJ"
                        variant="outlined"
                        onChange={(e) => cnpjMask(e.target.value)}
                        />
                    </Stack>
                    <TextField sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#4d148c !important',
                                },
                            },
                            '& .MuiInputLabel-shrink': {
                                color: '#4d148c !important',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root': {
                                color: '#4d148c !important',
                            },
                        }}
                        value={formData.email}
                        label="EMAIL"
                        variant="outlined"
                        onChange={(e) => handleForm("email", e.target.value)}
                        />
                    <TextField sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#4d148c !important',
                            },
                        },
                        '& .MuiInputLabel-shrink': {
                            color: '#4d148c !important',
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root': {
                            color: '#4d148c !important',
                        },
                    }}
                    value={formData.telefone}
                    label="TELEFONE"
                    variant="outlined"
                    onChange={(e) => phoneMask(e.target.value)}
                    />
                    <Stack spacing={2} direction="row">
                        <Autocomplete  sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#4d148c !important',
                                },
                            },
                            '& .MuiInputLabel-shrink': {
                                color: '#4d148c !important',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root': {
                                color: '#4d148c !important',
                            },
                            width: '35%'
                        }}
                        value={{sigla: formData.estado}}
                        renderInput={(params) => <TextField {...params} label="ESTADO" />}
                        options={dataStates ? dataStates : []}
                        getOptionLabel={(option:DataStateProp) => option.sigla}
                        isOptionEqualToValue={(option:DataStateProp, value:DataStateProp) => option.sigla === value.sigla}
                        onChange={(event, value) => value ? handleForm("estado", value!.sigla) : handleForm("estado", "")}
                        />
                        <Autocomplete sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#4d148c !important',
                                },
                            },
                            '& .MuiInputLabel-shrink': {
                                color: '#4d148c !important',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root': {
                                color: '#4d148c !important',
                            },
                            width: '70%'
                        }}
                        value={{nome: formData.cidade}}
                        loading={dataCitiesLoading}
                        options={dataCities ? dataCities : []}
                        getOptionLabel={(option:DataCititesProp) => option.nome}
                        isOptionEqualToValue={(option:DataCititesProp, value:DataCititesProp) => option.nome === value.nome}
                        onChange={(event, value) => value ? handleForm("cidade", value!.nome) : handleForm("cidade", "")}
                        renderInput={(params) => <TextField {...params} label="CIDADE" />}
                        />
                        <TextField sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#4d148c !important',
                                    },
                                },
                                '& .MuiInputLabel-shrink': {
                                    color: '#4d148c !important',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root': {
                                    color: '#4d148c !important',
                                },
                            }}
                            value={formData.cep}
                            label="CEP"
                            variant="outlined"
                            onChange={(e) => cepMask(e.target.value)}
                            />
                    </Stack>
                    <Stack spacing={2} direction="row">
                        <TextField sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#4d148c !important',
                                    },
                                },
                                '& .MuiInputLabel-shrink': {
                                    color: '#4d148c !important',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root': {
                                    color: '#4d148c !important',
                                },
                                width: '70%'
                            }}
                            value={formData.endereco}
                            label="ENDEREÇO"
                            variant="outlined"
                            onChange={(e) => handleForm("endereco", e.target.value)}
                            />
                            <TextField sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#4d148c !important',
                                    },
                                },
                                '& .MuiInputLabel-shrink': {
                                    color: '#4d148c !important',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root': {
                                    color: '#4d148c !important',
                                },
                                width: '30%'
                            }}
                            value={formData.numero}
                            label="NÚMERO"
                            variant="outlined"
                            type="number"
                            onChange={(e) => handleForm("numero", e.target.value)}
                            />
                    </Stack>
                    <TextField sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#4d148c !important',
                                },
                            },
                            '& .MuiInputLabel-shrink': {
                                color: '#4d148c !important',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root': {
                                color: '#4d148c !important',
                            },
                        }}
                        value={formData.complemento}
                        label="COMPLEMENTO"
                        variant="outlined"
                        onChange={(e) => handleForm("complemento", e.target.value)}
                        />
                </Stack>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center" }}>
                    {isPending && <CircularProgress style={{
                        transform: 'translate(-50%, -50%)',
                        color:'#4d148c',
                        marginRight: "15px"
                    }}
                        size={30}
                    />}
                    <Button variant="contained" disabled={isPending} sx={{backgroundColor: '#4d148c', fontWeight: 'bold'}} onClick={handleRegister}>CADASTRAR</Button>
                </Box>
                <IconButton onClick={handleResetForm} sx={{ padding: 0, margin: 0, color:'#4d148c', position: 'absolute', top: 5, right: 5}}>
                    <CancelIcon fontSize="large"/>
                </IconButton>
                <Snackbar open={alert} autoHideDuration={6000} anchorOrigin={{vertical: "top", horizontal: "right"}} onClose={() => setAlert(false)}>
                    <Alert
                    onClose={() => setAlert(false)}
                    severity={alertType}
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    {alertType === 'success' && 'Operação realizada com sucesso!'}
                    {alertType === 'error' && 'Ocorreu um erro ao realizar a operação!'}
                    {alertType === 'warning' && 'Preencha todos os campos!'}
                    {alertType === 'info' && 'CNPJ já cadastrado!'}
                    </Alert>
                </Snackbar>
            </OrdersPageModalContainer>
        </Modal>
    );
}

export default RecipientsPageModal;