import React, { useState, useContext } from 'react';
import SignUpContainter from './SignUpContainer'
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';

import UserContext from '../../contexts/UserContext';

export default function SignUp() {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordConfirmation, setPasswordConfirmation ] = useState('');
    const [ isClicked, setIsClicked ] = useState(false);
    const { user } = useContext(UserContext);
    const history = useHistory();

    if(user) return history.push('/');

    function signUp(e) {
        e.preventDefault();
        setIsClicked(true);

        const userInfo = {
            name,
            email,
            password,
            passwordConfirmation
        };
        const request = Axios.post('https://barros-mywallet.herokuapp.com/api/users/sign-up', userInfo)
        request
            .then( res => {
                setIsClicked(false);
                if (res.status === 201) {
                    return history.push('/signIn');
                }
                if (!res.data) return alert('Usuário não encontrado');
            })
            .catch(err => {
                const { response } = err;
                if(!response) alert("Internal Server Error");

                else    alert(JSON.stringify(response.data));
                setIsClicked(false);
            });
    }
    
    return (
        <SignUpContainter>
            <h1>MyWallet</h1>
            <form onSubmit = {signUp}>
                <input
                    placeholder = "Nome"
                    type = 'text'
                    value = { name }
                    onChange = { e => setName(e.target.value)}
                    required
                />
                <input
                    placeholder = "E-mail"
                    type = 'email'
                    value = { email }
                    onChange = { e => setEmail(e.target.value)}
                    required
                />
                <input
                    placeholder = "Senha"
                    type = 'password'
                    value = { password }
                    onChange = { e => setPassword(e.target.value)}
                    required
                />
                <input
                    placeholder = "Confirme a senha"
                    type = 'password'
                    value = { passwordConfirmation }
                    onChange = { e => setPasswordConfirmation(e.target.value)}
                />
                <button type = "submit" disabled = {isClicked} >Cadastrar</button>
                <Link to ="/signIn" >Já tem uma conta? Entre agora!</Link>
            </form>
        </SignUpContainter>
    )
}