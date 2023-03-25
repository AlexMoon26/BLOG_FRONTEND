import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export const Index = () => {
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://sun9-18.userapi.com/impg/IfciDOrMu9J98wCerl3bAtwfQgzYum7htaV3Lg/3uFnNifk84c.jpg?size=2560x2560&quality=95&sign=6569788752ef0937ac8b1258c5108af8&type=album"
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
      </div>
    </>
  );
};
