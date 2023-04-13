import { Button } from '@mui/material';
import React from 'react'

import styles from './DropDownItem.module.scss'

export const DropdownItem = (props) => {
    return (
    <>
        <li className={styles.dropdownItem}>
            {props.img}
            <Button onClick={props.onClick}>{props.text}</Button>
        </li>
    </>
  )
};