import React, { useContext } from 'react'
import { LanguageContext } from '../contexts/LanguageContext'
import { AuthContext } from '../contexts/AuthContext'
import { UserContext } from '../contexts/UserContext'
import Login from './Login'
import Currency from './Currency'
import styled from 'styled-components'
import { AiFillLock, AiFillUnlock } from "react-icons/ai"
import useToggle from '../hooks/useToggle'
import { translated } from '../contexts/translated'
import { makeStyles } from '@material-ui/core/styles'

//MUI imports
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

//MUI styles
const useStyles = makeStyles({
    root: {
        color: 'white',
        icon: {
        }
    },
    icon: {
        color: 'white',
    },
});

//Styled Components CSS
const MainNav = styled.nav`
display:flex;
height:10vh;
align-items:center;
flex-flow: row nowrap;
width:100%;
background-color:rgba(0, 0, 0, 0.2);
z-index:100;
`

const StartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width:30%;
  height:100%;
  padding-left:5em;
`

const EndWrapper = styled.div`
  width:70%;
  height:100%;
  padding-right:5em;
`

const LogoContainer = styled.div`
display:flex;
`

const NavLinks = styled.ul`
    width:100%;
    display:flex;
    flex-flow:row nowrap;
    justify-content:flex-end;
    align-items:center;
    height:100%;
    `

const NavLink = styled.li`
    list-style-type:none;
    padding: 0 20px;
    margin: 0 10px;
    font-family: 'Raleway', sans-serif;
    display:flex;
    align-items:center;
    text-transform: uppercase;
    transition: all 2s;
    position:relative;
    height:60%;
    transition: all .5s;
    color:white;

    &:before {
        transition: all .5s;
    }

    &:hover {
        cursor:pointer;
    }

    &:after{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 0%;
        content: '.';
        color: transparent;
        background: #eeeeee;
        height: 1px;
        transition: all .5s;
    }

    &:hover:after{
        width:100%;
    }
    `

const Logo = styled.h1``

function Navbar() {

    //Setting React States
    const [langState, langOpen, langClose] = useToggle()
    const [loginState, loginOpen, loginClose] = useToggle()
    const [currState, currOpen, currClose] = useToggle()
    const { language, changeLanguage } = useContext(LanguageContext)
    const { auth, setAuth } = useContext(AuthContext)
    const { user, setUser } = useContext(UserContext)
    const classes = useStyles();


    const handleLangChange = (event) => {
        changeLanguage(event);
    };

    const handleLogout = () => {
        setAuth(false);
        setUser({});
        alert('You have been logged out')
    }

    return (
        <MainNav>
            <StartWrapper>
                <LogoContainer>
                    <Logo>LOGO</Logo>
                </LogoContainer>
            </StartWrapper>
            <EndWrapper>
                <NavLinks>
                    <NavLink id='currency' onClick={currOpen} >{translated.navOne[language]}</NavLink>
                    <NavLink id='language'>
                        <FormControl>
                            <Select
                                classes={{
                                    root: classes.root,
                                    icon: classes.icon,
                                }}
                                disableUnderline={true}
                                open={langState}
                                onClose={langClose}
                                onOpen={langOpen}
                                value={language}
                                onChange={handleLangChange}
                            >
                                <MenuItem value={'en'}>English</MenuItem>
                                <MenuItem value={'fr'}>Français</MenuItem>
                                <MenuItem value={'kr'}>한국어</MenuItem>
                            </Select>
                        </FormControl>
                    </NavLink>
                    {auth && user
                        ?
                        (
                            <NavLink id='Login' onClick={handleLogout} >{translated.navThree[language]}<AiFillUnlock style={{ marginLeft: '10px' }} /></NavLink>
                        )
                        :
                        (
                            <NavLink id='logout' onClick={loginOpen} >{translated.navTwo[language]}<AiFillLock style={{ marginLeft: '10px' }} /></NavLink>
                        )
                    }
                    <Login {...({ language, loginState, loginClose })} />
                    <Currency {...({ language, currState, currClose })} />
                </NavLinks>
            </EndWrapper>
        </MainNav>
    )
}
export default Navbar