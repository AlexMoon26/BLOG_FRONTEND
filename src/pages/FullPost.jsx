import React from "react";
import { useParams } from "react-router-dom";
import axios from '../axios';

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

import moment from 'moment/moment';
import 'moment/locale/ru';

import ReactMarkdown from 'react-markdown';

export const FullPost = () => {
	const [data, setData] = React.useState();
	const [isLoading, setIsLoading] = React.useState(true);
	const {id} = useParams();

	React.useEffect(() => {
		axios.get(`/posts/${id}`).then(res => {
			setData(res.data);
			setIsLoading(false);
		}).catch(err => {
			console.warn(err);
			alert('Ошибка при получении статьи');
		});
	}, []);
	
	if(isLoading) {
		return <Post isLoading={isLoading} isFullPost />;
	}

  return (
    <>
      <Post
        id={data.id}
        title={data.title}
        imageUrl={ data.imageUrl ? `${process.env.REACT_APP_API_URL || 'http://localhost:4444'}${data.imageUrl}` : "https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"}
        user={data.user}
        createdAt={moment(data.createdAt).format('llll')}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Антон Демченко",
              avatarUrl: "https://sun9-8.userapi.com/impg/CNaFEUWZcObPt4kYCCdELdbA3V-dHm_1XzwXDg/gDJIS4y1fYs.jpg?size=736x736&quality=95&sign=9cecc1dc67984c15afdbfa1519c263a9&type=album",
            },
            text: "А еще меньше нельзя было сделать?",
          },
          {
            user: {
              fullName: "Иван Кочеров",
              avatarUrl: "/img/avatars/ivan.jpg",
            },
            text: "Классно, по факту",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
