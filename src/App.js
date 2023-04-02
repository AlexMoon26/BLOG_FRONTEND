import React from "react";
import { Routes, Route } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';


import Container from "@mui/material/Container";

import { Header, Loader} from "./components";
import { Home, FullPost, Registration, AddPost, EditPost, Login } from "./pages";
import { fetchAuthMe } from "./redux/slices/auth";

function App() {
	const dispatch = useDispatch();
	const userData = useSelector(state => state.auth);
	React.useEffect(() => {
		dispatch(fetchAuthMe());
		
	}, [dispatch])

	if(userData.status === 'loading'){
		return <Loader />
	}
	

	

	
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
