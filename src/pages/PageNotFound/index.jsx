import React from 'react'
import styles from './PageNotFound.module.scss'
import GirlNotFound from './source/girlNotFound.gif'

import { Link, useLocation } from 'react-router-dom'

import { Button, Grid } from '@mui/material'

export const PageNotFound = () => {
	return (
		<Grid container className={styles.container}>
				<Grid className={styles.textContent}>
					<h1>404</h1>
					<h2>Такой страницы не найдено</h2>
					<Link to="/"> 
						<Button variant="outlined">Вернуться на главную</Button>
					</Link>
				</Grid>
				<Grid>
					<img className={styles.img} src={GirlNotFound} alt='Девочка с мороженым'/>
				</Grid>
		</Grid>
	)
}
