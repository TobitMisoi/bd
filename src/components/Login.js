import React, { useContext, useState } from 'react'
import { translated } from '../contexts/translated'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { users } from '../userData'
import { AuthContext } from '../contexts/AuthContext'
import { UserContext } from '../contexts/UserContext'

//Material UI Imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//Styled Components
const ErrorMsg = styled.p`
color:red;
font-size:.8rem;
`

const Login = ({ language, loginState, loginClose }) => {
    const [loginFailed, setLoginFailed] = useState(false)

    const { register, handleSubmit, errors } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange'
    })

    const { setAuth } = useContext(AuthContext)
    const { setUser } = useContext(UserContext)

    const onSubmit = (data) => {
        const activeUser = users.find(user => user.username === data.username && user.password === data.password);

        if (!activeUser) {
            setLoginFailed(true)
        } else if (activeUser) {
            setUser(activeUser)
            setAuth(true)
            setLoginFailed(false)
            loginClose()
        }
    }

    return (
        <Dialog open={loginState} onClose={loginClose} aria-labelledby="form-dialog-title" >
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle id="form-dialog">{translated.loginHeader[language]}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {translated.loginMsg[language]}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        inputRef={register({ required: "You must specify a username.", minLength: { value: 2, message: 'Username must have at least 6 characters.' } })}
                        name='username'
                        label={translated.loginUser[language]}
                        type="text"
                        error={!!errors.name}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        inputRef={register({ required: "You must specify a password.", minLength: { value: 2, message: 'Password must have at least 6 characters.' } })}
                        label={translated.loginPassword[language]}
                        type="password"
                        name='password'
                        error={!!errors.validName}
                        fullWidth
                    />
                    {loginFailed && <ErrorMsg>The username or password you entered is incorrect.</ErrorMsg>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={loginClose} color="primary">
                        {translated.loginCancel[language]}
                    </Button>
                    <Button type='submit' color="primary">
                        {translated.loginSubmit[language]}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default Login;