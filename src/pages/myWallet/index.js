import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Axios from 'axios';
import dayjs from 'dayjs';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

import UserContext from '../../contexts/UserContext'
import { MyWalletContainer, Li, Footer } from './myWalletStyles';

export default function MyWallet() {
    const { user, setUser } = useContext(UserContext);
    const ref = useRef();
    const [componentWidth, setComponentWidth] = useState('81%');
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
                setBalance(sum.toFixed(2).replace('.',','));
            })
            .catch( err => {
                alert(err);
            })
    }, []);

    function handleResize() {
        if (ref.current) {
            setComponentWidth(`${ref.current.offsetWidth}px`)
        }
    }

    useLayoutEffect(() => {
        handleResize();

        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)

        }
    });

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
                    <Li key={transaction.id} type={transaction.type} ref={ref} >
                        <div>
                            <time>{dayjs(transaction.date).format('DD/MM')}</time>
                            <p> {transaction.description} </p>
                        </div>                        
                        <span> {transaction.transaction} </span>
                    </Li>   
                )}
                { transactions.length !== 0 &&
                    <Footer balance={balance} width={componentWidth}>
                        <h4>Saldo</h4>
                        <p> {`R$ ${balance}`} </p>
                    </Footer>
                }
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







