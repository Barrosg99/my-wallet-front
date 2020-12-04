import Axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RiArrowGoBackLine } from 'react-icons/ri';

import UserContext from '../../contexts/UserContext';

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
                <input
                    pattern = "^\d*(\.\d{0,2})?$"
                    value = { transaction }
                    onChange = { e => setTransaction(e.target.value)}
                    placeholder = "Valor"
                    required
                />
                <input
                    value = { description }
                    onChange = { e => setDescription(e.target.value)}
                    placeholder = "Descrição"
                    maxLength = '18'
                    required
                />
                <button type = 'submit' disabled = {isClicked} >Salvar {recordType}</button>
            </form>
        </TransactionsContainer>
    )
}

const TransactionsContainer = styled.main `
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-size: 26px;
        color: white;
        padding: 25px;
        margin-bottom: 15px;
    }

    svg {
        position: fixed;
        top: 22px;
        font-size: 25px;
        right: 15px;
        color: white;
    }

    input {
        display: block;
        font-size: 20px;
        font-family: inherit;
        padding: 17px 5px 17px 10px;
        outline: none;
        border-radius: 5px;
        border: none;
        width: 86vw;
        margin-bottom: 13px;
    }

    input::placeholder {
        color: black;
    }

    button {
        width: 86vw;
        padding: 11px 0px;
        font-size: 20px;
        font-family: inherit;
        background: #A328D6;
        color: white;
        border: none;
        border-radius: 5px;
        margin-bottom: 32px;
        outline: none;
        font-weight: bold;
    }
`