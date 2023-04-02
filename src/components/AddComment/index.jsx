import React from "react";
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";



export const AddComment = () => {

	const location = useLocation();

	const isAuth = useSelector(selectIsAuth);
	const userData = useSelector(state => state.auth.data);



	return (
		<>
			<div className={styles.root}>
				{isAuth ? (
					<>
						<Avatar
							classes={{ root: styles.avatar }}
							src={userData.avatarUrl}
						/>
						<div className={styles.form}>
							<TextField
								label="Написать комментарий"
								variant="outlined"
								maxRows={10}
								multiline
								fullWidth
							/>
							<Button variant="contained">Отправить</Button>
						</div>
					</>
				) : (
					<>
						<div className={styles.notAuth}>
							<Grid className={styles.text}>Чтобы оставить комментарий, авторизуйтесь!</Grid>
							<Grid className={styles.buttons}>
								<Link to="/login" state={{from: location}}>
									<Button variant="outlined">Войти</Button>
								</Link>
								<Link to="/register">
									<Button variant="contained">Создать аккаунт</Button>
								</Link>
							</Grid>
						</div>
					</>
				)}

			</div>
		</>
	);
};
