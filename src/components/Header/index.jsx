import * as React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import { DropDownMenu } from '../DropDownMenu';



export const Header = () => {

  const location = useLocation();

  const isAuth = useSelector(selectIsAuth);

  // const onClickLogout = () => {
  //   if (window.confirm('Вы действительно хотитие выйти?')) {
  //     dispatch(logout());
  //     window.localStorage.removeItem('token');
  //   }
  // };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>MOON BLOG</div>
          </Link>
          <div>
            {isAuth ? (
              <>
                <DropDownMenu />
              </>
            ) : (
              <div className={styles.buttons}>
                <Link to="/login" state={{ from: location }}>
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
