import Axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RiArrowGoBackLine } from 'react-icons/ri';

import UserContext from '../../contexts/UserContext';
import StyledButton from '../../components/Buttons/StyledButton';
import StyledInput from '../../components/Inputs/StyledInput';
import TransactionsContainer from './TransactionContainer';

export default function Transactions() {
    const [ transaction, setTransaction ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ isClicked, setIsClicked ] = useState(false);
    const { transactionType } = useParams();
    const { user } = useContext(UserContext);
    const history = useHistory();

    if(!user || !transactionType) {
        setTimeout(() => history.push('/signIn'), 500); 
        return <h1>Redirecionando para página de login ...</h1>
    }
    
    const recordType = transactionType === 'income' 
        ? 'Entrada' 
        : transactionType === 'expense' 
            ? 'Saída' 
            : noType()
    
    function noType() {
        setTimeout(() => history.push('/'), 500); 
        alert('Página não encontrada');
    }

    function recordTransaction(e) {
        e.preventDefault();
        setIsClicked(true);

        const recordInfo = {
            transaction,
            description,
            type: transactionType
        };
        Axios
            .post(
                `https://barros-mywallet.herokuapp.com/api/records`, 
                recordInfo,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                } 
            )
            .then( res => {
                setIsClicked(false);
                history.push('/')
            })
            .catch( err => {
                const { response } = err;
                if(!response) alert("Internal Server Error");

                else    alert(JSON.stringify(response.data));
                setIsClicked(false);
            })
    }

    function goBack() {
        history.push('/');
    }

    return  (
        <TransactionsContainer>
            <div>
                <h1>Nova {recordType} </h1>
                <RiArrowGoBackLine onClick = {goBack} />    
            </div>
            
            <form onSubmit = {recordTransaction}>
                <StyledInput
                    pattern = "^\d*(\.\d{0,2})?$"
                    value = { transaction }
                    onChange = { e => setTransaction(e.target.value)}
                    placeholder = "Valor"
                    required
                />
                <StyledInput
                    value = { description }
                    onChange = { e => setDescription(e.target.value)}
                    placeholder = "Descrição"
                    maxLength = '18'
                    required
                />
                <StyledButton type = 'submit' disabled = {isClicked} >Salvar {recordType}</StyledButton>
            </form>
        </TransactionsContainer>
    )
}

