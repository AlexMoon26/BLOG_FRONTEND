import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../redux/slices/auth';

import { UserInfo } from '../UserInfo';
import {DropdownItem} from '../DropDownItem';

import { Person } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import styles from './DropDownMenu.module.scss'

export const DropDownMenu = () => {
		const navigate = useNavigate();
    const userData = useSelector(state => state.auth);
    const [open, setOpen] = useState(false);
		let menuRef = useRef();
    const dispatch = useDispatch();



    const onClickLogout = () => {
        if (window.confirm('Вы действительно хотитие выйти?')) {
          dispatch(logout());
          window.localStorage.removeItem('token');
        }
      };

		const onClickAddPost = () => {
			navigate('/add-post');
			setOpen(false);
		}

		useEffect (() => {
			let handler = (e) => {
				if(!menuRef.current.contains(e.target)){
					setOpen(false);
				}
			}

			document.addEventListener("mousedown", handler);

			return() => {
				document.removeEventListener("mousedown", handler);
			}
		});


  return (
    <>
        <div className={styles.menuContainer} ref={menuRef}>
            <div className={styles.menuTrigger} onClick={() => {setOpen(!open)}}>
              <UserInfo {...userData.data} />
            </div>
            <div className={`${styles.dropdownMenu} ${open ? styles.active : styles.inactive} `}>
                <h3>{userData.data.fullName}</h3>
                <ul>
                    <DropdownItem img={<Person />} text={"Профиль"} />
                    <DropdownItem img={<EditIcon />} text={"Написать статью"} onClick={onClickAddPost} />
                    <DropdownItem img={<SettingsIcon />} text={"Настройки"} />
                    <DropdownItem img={<LogoutIcon />} text={"Выйти"} onClick={onClickLogout} />
                </ul>
            </div>
        </div>
    </>
  )
};