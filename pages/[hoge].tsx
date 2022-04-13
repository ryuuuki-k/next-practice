import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from 'next';

type Post = {
  id: string;
  userId: string;
  title: string;
  body: string;
};

type Props = {
  post: Post;
  time: number;
};

const Hoge: NextPage<Props> = ({ post, time }) => {
  return (
    <div>
      <div>
        <p>{time}</p>
      </div>
    </div>
  );
};

export default Hoge;

export const getStaticPaths: GetStaticPaths<{ hoge: string }> = async (
  context: GetStaticPathsContext
) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const json = (await res.json()) as Post[];

  // const paths = json.map(({ id }) => {
  //   return {
  //     params: { hoge: id.toString() },
  //   };
  // });
  const paths = [{ params: { hoge: '1' } }];

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<Props> = async (
  context: GetStaticPropsContext
) => {
  const id = context.params?.hoge;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = (await res.json()) as Post;
  return { props: { post, time: Date.now() }, revalidate: 3 };
};
