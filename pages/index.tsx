import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

type Post = {
  userId: string;
  id: string;
  title: string;
  body: string;
};

type Posts = Post[];

type Props = {
  posts: Posts;
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">SSR in Next.js!</a>
        </h1>
        <h2>{posts[0].body}</h2>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = (await res.json()) as Posts;
  return { props: { posts } };
};
