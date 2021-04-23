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

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm:'',
    error: null,
  };

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

    render() {
        const {
            firstName,
            lastName,
            email,
            password,
            passwordConfirm,
            error
          } = this.state;

        const isInvalid =
        password !== passwordConfirm ||
        firstName === '' ||
        lastName === '' ||
        email === '' ||
        password === '';


        return (
        <Container maxWidth="sm">
            <PaperWrap>
                <TitleWrap component="h1" variant="h5">
                    Sign up
                </TitleWrap>
                <form noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            value={firstName}
                            onChange={this.onChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                            value={lastName}
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
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={this.onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="passwordConfirm"
                            label="Confirm Password"
                            type="password"
                            id="passwordConfirm"
                            value={passwordConfirm}
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
                <Grid container justify="center">
                    <Grid item>
                    <Link href="#" variant="body2">
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                </Grid>
                {error && <p>{error.message}</p>}
                </form>
            </PaperWrap>
        </Container>
        )
    }
}

const PaperWrap = styled(Paper)`
    margin-top: 120px;
    padding: 30px;
`;

const TitleWrap = styled(Typography)`
    margin-top: 20px;
    margin-bottom: 20px;
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
    
    &&:hover {
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
        background-color: #233326;
        color: #fff;
    }
`;

export default Signup;