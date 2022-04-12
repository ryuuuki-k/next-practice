import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

type Post = {
  userId: string;
  id: string;
  title: string;
  body: string;
};

type Props = {
  post: Post;
};

const Id: NextPage<Props> = ({ post }) => {
  const { userId, title, body } = post;
  return (
    <>
      <div>title: {title}</div>
      <div>userId: {userId}</div>
      <div>body: {body}</div>
    </>
  );
};

export default Id;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = (await res.json()) as Post;
  return {
    props: { post },
  };
};
