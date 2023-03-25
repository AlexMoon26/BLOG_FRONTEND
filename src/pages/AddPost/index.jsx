import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import axios from '../../axios';
import FormData from 'form-data';

import { useSelector } from 'react-redux';
import {selectIsAuth} from '../../redux/slices/auth';
import { useNavigate, Navigate, useParams } from 'react-router-dom';


import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const {id} = useParams();
	const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
	const inputFileRef = React.useRef(null);

  const handleChangeFile = async (event) => {
		try {
			const fromData = new FormData();
			const file = event.target.files[0];
			fromData.append('image', file);
			const { data } = await axios.post('/upload', fromData);
			setImageUrl(data.url);
		} catch (err) {
			console.warn(err);
			alert('Ошибка при загрузке файла');
		}
	};

  const onClickRemoveImage = () => {
		setImageUrl('');
	};

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

	const onSubmit = async () => {
		try {
			setLoading(true);

			const fields = {
				title,
				imageUrl,
				tags: tags.split(','),
				text
			}
			const { data } = await axios.post('/posts', fields);

			const _id = data._id;

			navigate(`/posts/${_id}`);

		} catch (err) {
			console.warn(err);
			alert('Ошибка при создании статьи');
		}
	}

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );


	if(!window.localStorage.getItem('token') && !isAuth) {
		return <Navigate to="/" />
	}

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
					<Button variant="contained" color="error" onClick={onClickRemoveImage}>
        		Удалить
        	</Button>
					<img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
				</>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
				value={title}
				onChange={e => setTitle(e.target.value)}
        fullWidth
      />
      <TextField 
				classes={{ root: styles.tags }} 
				variant="standard" 
				placeholder="Тэги"
				value={tags}
				onChange={e => setTags(e.target.value)} 
				fullWidth 
			/>
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Опубликовать
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
