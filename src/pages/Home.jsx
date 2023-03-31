import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home =  () => {
	const dispatch = useDispatch();
	const userData = useSelector(state => state.auth.data);
	const {posts, tags} = useSelector(state => state.posts);

	const isPostsLoading = posts.status === 'loading';
	const isTagsLoading = tags.status === 'loading';

	React.useEffect(() => {
		dispatch(fetchPosts());
		dispatch(fetchTags());
	}, []);



  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
        <Tab label="Мои" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
						isPostsLoading ? (
							<Post key={index} isLoading={true} />
						) : (
							<Post
									id={obj._id}
									title={obj.title}
									imageUrl={obj.imageUrl? `http://localhost:4444${obj.imageUrl}` : "https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"}
									user={obj.user}
									createdAt={obj.createdAt}
									viewsCount={obj.viewsCount}
									commentsCount={3}
									tags={obj.tags}
									
									isEditable={userData?._id === obj.user._id}
							/>
						),
					)}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Владислав Завгородний',
                  avatarUrl: 'https://sun9-47.userapi.com/impg/JVsJYJQBNYC0IT1djSPAyPVMnDpy7WxCZDF3Qw/7gzeYkV3-Fw.jpg?size=1080x1080&quality=96&sign=1732e4b2a8251c8ebfcb9c343ae17510&type=album',
                },
                text: 'А вот неплохо',
              },
              {
                user: {
                  fullName: 'Андрей Борисов',
                  avatarUrl: 'https://sun9-36.userapi.com/impg/lBlMNylr869RhhP6LtkaMPZykUReanS1HQGNFA/ykwEX2XtbVI.jpg?size=1280x1280&quality=95&sign=993299c3b5ad39e44d6674b78f7881fe&type=album',
                },
                text: 'Честно говоря, я ожидал большего...',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};