import React from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import style from './style';

import { regex } from '../../constants';

const Login = props => {
  const {
    handleOpenRegisterPopup,
    handleCloseLoginPopup,
    onLoginSubmit,
    isSubmitLoginLoading,
  } = props;

  const classes = makeStyles(style)();

  const [username, setUsernameValue] = React.useState('');
  const [usernameError, setUsernameError] = React.useState(false);
  const [password, setPasswordValue] = React.useState('');
  const [passwordVisible, setPasswordVisibility] = React.useState(false);

  const handleUsernameTyping = event => {
    if (
      regex.USERNAME_TYPING.test(event.target.value) ||
      event.target.value === ''
    ) {
      setUsernameError(false);
    } else {
      setUsernameError(true);
    }
    setUsernameValue(event.target.value);
  };

  const checkUsername = event => {
    if (regex.USERNAME.test(event.target.value) || event.target.value === '') {
      setUsernameError(false);
    } else {
      setUsernameError(true);
    }
  };

  const handlePasswordTyping = event => {
    setPasswordValue(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisible);
  };

  const handleLoginSubmit = event => {
    event.preventDefault();
    onLoginSubmit(username, password);
  };

  const handleRegisterClick = event => {
    event.preventDefault();
    handleCloseLoginPopup();
    setTimeout(handleOpenRegisterPopup, 500);
  };

  return (
    <>
      <Grid container spacing={1} justify="center" alignContent="center">
        <Grid item xs={12} sm={10}>
          <Grid container justify="center" className={classes.loginElement}>
            <Typography variant="h4">Login</Typography>
          </Grid>
          <form onSubmit={handleLoginSubmit}>
            <Grid container justify="center" className={classes.loginElement}>
              <Grid item xs={12} sm={10}>
                <TextField
                  id="email"
                  variant="outlined"
                  label="Username"
                  placeholder="rajnikanth"
                  value={username}
                  onChange={handleUsernameTyping}
                  onBlur={checkUsername}
                  error={usernameError}
                  helperText={usernameError && 'Invalid username format.'}
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container justify="center" className={classes.loginElement}>
              <Grid item xs={12} sm={10}>
                <TextField
                  id="password"
                  variant="outlined"
                  type={passwordVisible ? 'text' : 'password'}
                  label="Password"
                  placeholder="●●●●●●●●"
                  value={password}
                  onChange={handlePasswordTyping}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          onClick={handleTogglePasswordVisibility}
                        >
                          {passwordVisible ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="true"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container justify="center" className={classes.loginElement}>
              <Grid item xs={12} sm={10}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  disabled={usernameError || username === '' || password === ''}
                  onClick={handleLoginSubmit}
                  fullWidth
                >
                  {!isSubmitLoginLoading ? 'Login' : <CircularProgress />}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid container justify="center" className={classes.loginElement}>
          <Grid item xs={12} sm={10}>
            <Grid container justify="center">
              <Typography variant="subtitle1">
                Not our user yet?{' '}
                <Link href="" onClick={handleRegisterClick}>
                  Register Here.
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
