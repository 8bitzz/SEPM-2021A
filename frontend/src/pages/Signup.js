import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import styled from 'styled-components';

const SignUpPage = () => {
    return(
        <Container maxWidth="sm">
            <PaperWrap>
                <TitleWrap component="h1" variant="h5">
                    Sign up
                </TitleWrap>
                <SignUpForm />
                <Grid container justify="center">
                    <Grid item>
                        <Link href="#" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </PaperWrap>
        </Container>
    );
}

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {

    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form noValidate onSubmit={this.onSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="username"
                            name="username"
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="Full Name"
                            autoFocus
                            value={username}
                            onChange={this.onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={this.onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="passwordOne"
                            label="Password"
                            type="password"
                            id="passwordOne"
                            autoComplete="current-password"
                            value={passwordOne}
                            onChange={this.onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="passwordTwo"
                            label="Confirm Password"
                            type="password"
                            id="passwordTwo"
                            value={passwordTwo}
                            onChange={this.onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I want to create a room chat"
                        />
                    </Grid>
                </Grid>
                <ButtonWrap
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isInvalid}
                >
                    Sign Up
                </ButtonWrap>
            </form>
        )
    }
}


const PaperWrap = styled(Paper)`
    margin-top: 120px;
    padding: 30px;
`;

const TitleWrap = styled(Typography)`
    margin-top: 20px;
    margin-bottom: 40px;
    text-align: center;
`;

const ButtonWrap = styled(Button)`
    && {
        background-color: #7de38d;
        color: #222;
        margin-top: 20px;
        margin-bottom: 20px;
        text-transform: capitalize;
    }

    &&:disabled {
        background-color: #f8f8f8;
        color: #5f6368;
    }
`;


export default SignUpPage;