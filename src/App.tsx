import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import arrow from './arrow.png';
import {fetchSave} from "./fetchSave";

function App() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleValidation = () => {
        let er = ''
        if (!email.includes('@')) {
            er += 'Email должен содержать символ "@"\n'
        }
        if (phone.length < 12) {
            er += 'Телефон должен содержать 12 символов'

        } else {
            er = ''
        }
        console.log(er)
        setErrorMessage(er)
    };

    useEffect(() => {
        handleValidation()

    }, []);
    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                    <div className={'input__block'}>
                        <label style={{opacity: 0.7, fontSize: '20px'}}>Имя</label>
                        <input
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            className={'input__block--input'} type={"text"}/>
                    </div>
                    <div className={'input__block'}>
                        <label style={{opacity: 0.7, fontSize: '20px'}}>E-mail</label>
                        <input onChange={(e) => {
                            handleValidation()
                            setEmail(e.target.value)
                        }} className={'input__block--input'} type={"email"}/>
                    </div>
                    <div className={'input__block'}>
                        <label style={{opacity: 0.7, fontSize: '20px'}}>Телефон</label>
                        <input onChange={(e) => {
                            handleValidation()
                            setPhone(e.target.value)
                        }} placeholder="+7 (___) ___-____" data-slots="_"
                               className={'input__block--input'} type={"tel"}/>
                    </div>
                    <button
                        className={'btn'} onClick={() => {
                        if (errorMessage.length) {
                            alert(errorMessage)
                        } else {
                            fetchSave(name, email, phone)
                        }
                    }}
                    >Отправить<img alt={'arrow'} className={'btn--arrow'} src={arrow}/></button>
            </div>
            {errorMessage && <p style={{position: "relative"}}>{errorMessage}</p>}

        </div>

    );
}

export default App;
