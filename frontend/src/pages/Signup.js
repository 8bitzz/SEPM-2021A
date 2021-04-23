import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';

import styled from 'styled-components';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../services/index';

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
                        <Link to='/signin'>
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

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in the Firebase realtime database
                return this.props.firebase
                .user(authUser.user.uid)
                .set({
                    username,
                    email, });
                })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push('/result');
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
            <FormWrap noValidate onSubmit={this.onSubmit}>
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
                <Grid>
                    <Grid item xs={12}>
                        {error && <ErrorWrap>{error.message}</ErrorWrap>}
                    </Grid>
                </Grid>
                
            </FormWrap>
        )
    }
}

const SignUpForm = compose(
    withRouter,
    withFirebase,
  )(SignUpFormBase);

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


export default SignUpPage;