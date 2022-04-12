import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from 'next';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Props = {
  post: Post;
};

const Huga: NextPage<Props> = ({ post }) => {
  const { id, title, body } = post;
  return (
    <>
      <div>{id}</div>
      <div>{title}</div>
      <div>{body}</div>
    </>
  );
};

export default Huga;

export const getStaticPaths: GetStaticPaths<{ hoge: string }> = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const json = (await res.json()) as Post[];

  const paths = json.map(({ id }) => {
    return {
      params: { hoge: id.toString() },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async (
  context: GetStaticPropsContext
) => {
  // context.params['hoge'] -> pageディレクトリの動的なファイル名に合わせる
  const id = context.params?.hoge as string;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  console.log(id);
  const post = (await res.json()) as Post;

  console.log(post.title);

  return {
    props: { post },
  };
};
