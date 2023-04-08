import { Button } from '@mui/material';
import React from 'react'

export const DropdownItem = (props) => {
    return (
    <>
        <li className='dropdownItem'>
            {props.img}
            <Button onClick={props.onClick}>{props.text}</Button>
        </li>
    </>
  )
};