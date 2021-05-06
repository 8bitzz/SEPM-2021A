import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';

import styled from 'styled-components';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../services/index';

const SignInPage = () => {
    return(
        <Container maxWidth="sm">
            <PaperWrap>
                <TitleWrap component="h1" variant="h5">
                    Sign in
                </TitleWrap>
                <SignInForm />
                <Grid container justify="center">
                    <Grid item>
                        <Link to='/signup'>
                            Don't have any account yet? Sign up
                        </Link>
                    </Grid>
                </Grid>
            </PaperWrap>
        </Container>
    );
}

const INITIAL_STATE = { 
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(authUser => {
                // Save UID to local storage
                localStorage.setItem("userID", authUser.user.uid);
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push('/search');
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid =
            password === '' ||
            email === '' ;

        return (
            <FormWrap noValidate onSubmit={this.onSubmit}>
                <Grid container spacing={2}>
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
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={this.onChange}
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
                    Sign in
                </ButtonWrap>
                <Grid>
                    <Grid item xs={12}>
                        {error && <ErrorWrap>{error.message}</ErrorWrap>}
                    </Grid>
                </Grid>
            </FormWrap>
        )
    }
}

const SignInForm = compose( 
    withRouter, 
    withFirebase,
    )(SignInFormBase);

const PaperWrap = styled(Paper)`
    margin-top: 120px;
    padding: 30px;
`;

const TitleWrap = styled(Typography)`
    margin: 20px;
    text-align: center;
`;

const FormWrap = styled.form`
    margin: 20px;
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

    &&:hover {
        background-color: #233326;
        color: #fff;
    }
`;

const ErrorWrap = styled.div`
    margin-bottom: 10px;
    color: red;
    text-align: center;
`;


export default SignInPage;