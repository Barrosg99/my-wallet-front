import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

import UserContext from '../../contexts/UserContext'
import Axios from 'axios';

export default function MyWallet() {
    const { user, setUser } = useContext(UserContext);
    const [ transactions, setTransactions ] = useState([]);
    let [ balance, setBalance ] = useState(); 
    const history = useHistory();

    useEffect( () => {
        if (!user) history.push('/signIn');
    }, [user]);

    useEffect( () => {
        if (!user) return;
        Axios
            .get(`https://barros-mywallet.herokuapp.com/api/records`,{ headers: { "Authorization": `Bearer ${user.token}` }})
            .then( res => {
                setTransactions(res.data);
                let sum = 0;
                res.data.forEach( ({transaction, type}) => {
                    let value = parseFloat(transaction.replace('R$ ','').replace('.','').replace(',','.'))
                    if(type === 'income') sum += value;
                    else if(type === 'expense') sum -= value;
                });
                setBalance(sum.toFixed(2));
            })
            .catch( err => {
                console.log(err);
            })
    },[]);

    function logOut() {
        const signOut = confirm('Você deseja deslogar?');
        if(signOut) {
            Axios
                .post('https://barros-mywallet.herokuapp.com/api/users/sign-out',{},{ headers: { "Authorization": `Bearer ${user.token}` }})
                .then( res => {
                    localStorage.clear();
                    setUser(null);
                })
                .catch( err => {
                    alert(err);
                });
        }
    }
    
    return (
        <MyWalletContainer>
            <header>
                <h1>Olá, { user && user.name } </h1>
                <RiLogoutBoxRLine onClick = {logOut}/>
            </header>
            <ul>
                { transactions.map( transaction => 
                    <Li key = {transaction.id} type = {transaction.type} >
                        <div>
                            <time>{dayjs(transaction.date).format('DD/MM')}</time>
                            <p> {transaction.description} </p>
                        </div>                        
                        <span> {transaction.transaction} </span>
                    </Li>   
                )}
                <Footer balance = {balance}>
                    <h4>Saldo</h4>
                    <p> {balance} </p>
                </Footer>
            </ul>
            <div>
                <Link to = '/register/income'>
                    <AiOutlinePlusCircle/>
                    <div>
                        <h4> Nova </h4>
                        <h4> Entrada </h4>
                    </div>
                </Link>
                <Link to = '/register/expense'>
                    <AiOutlineMinusCircle/>
                    <div>
                        <h4> Nova </h4>
                        <h4> Saída </h4>
                    </div>
                </Link>
            </div>
        </MyWalletContainer>
    )
}

const MyWalletContainer = styled.main `
    display: flex;
    flex-direction: column;
    align-items: center;

    header {
        display: flex;
        font-size: 26px;
        padding: 25px;
        justify-content: space-between;
        color: white;
        width: 100%;
    }

    ul {
        background: white;
        width: 86vw;
        height: 67vh;
        border-radius: 5px;
        padding: 23px 12px 27px;
        overflow: scroll;
    }

    & > div {
        display: flex;
        justify-content: space-between;
        width: 86%;
        font-size: 17px;
        color: white;
        padding: 13px 0px;
    }

    a {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #A328D6;
        padding: 10px;
        width: 45%;
        height: 17vh;
        border-radius: 5px;

        svg {
            font-size: 24px;
        }
    }
`

const Li = styled.li ` 
        display:flex;
        justify-content: space-between;
        font-size: 16px;
        margin-bottom: 15px;
        

        div {
            display:flex
        }

        time {
            color: #939393;
            margin-right: 15px;

        }

        span {
            color: ${ props => props.type === 'income' ? '#03AC00': '#C70000'};
        }
`

const Footer = styled.footer ` 
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 21.60%;
;
    width: 81%;
    background: white;
    height: 40px;
    align-items: center;
    p {
        color: ${ props => parseFloat(props.balance) > 0 ? '#03AC00' : '#C70000'}
    }
    
`

