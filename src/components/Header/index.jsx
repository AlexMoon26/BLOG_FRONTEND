import * as React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import Typography from '@mui/material/Typography';
// import MenuItem from '@mui/material/MenuItem';

import styles from './Header.module.scss';



export const Header = () => {

  const location = useLocation();

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотитие выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
          <div className={styles.inner}>
            <Link className={styles.logo} to="/">
              <div>MOON BLOG</div>
            </Link>
            <div className={styles.buttons}>
              {isAuth ? (
                <>
                  <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>


                </>
              ) : (
                <>
                  <Link to="/login" state={{ from: location }}>
                    <Button variant="outlined">Войти</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="contained">Создать аккаунт</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
      </Container>
    </div>
  );
};
