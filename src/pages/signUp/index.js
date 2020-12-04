import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';

import UserContext from '../../contexts/UserContext';
import SignUpContainter from './SignUpContainer'
import StyledInput from '../../components/Inputs/StyledInput';
import StyledButton from '../../components/Buttons/StyledButton';

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
                <StyledInput
                    placeholder = "Nome"
                    type = 'text'
                    value = { name }
                    onChange = { e => setName(e.target.value)}
                    required
                />
                <StyledInput
                    placeholder = "E-mail"
                    type = 'email'
                    value = { email }
                    onChange = { e => setEmail(e.target.value)}
                    required
                />
                <StyledInput
                    placeholder = "Senha"
                    type = 'password'
                    value = { password }
                    onChange = { e => setPassword(e.target.value)}
                    required
                />
                <StyledInput
                    placeholder = "Confirme a senha"
                    type = 'password'
                    value = { passwordConfirmation }
                    onChange = { e => setPasswordConfirmation(e.target.value)}
                />
                <StyledButton type = "submit" disabled = {isClicked} >Cadastrar</StyledButton>
                <Link to ="/signIn" >Já tem uma conta? Entre agora!</Link>
            </form>
        </SignUpContainter>
    )
}