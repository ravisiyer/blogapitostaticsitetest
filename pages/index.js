import styles from "@/styles/Home.module.css";
import Head from "next/head";
export default function Home({ postItems }) {
  return (
    <>
      <Head>
        <title>Test Next.js SSG</title>
        <meta
          name="description"
          content="Test Next.js static site generation"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Very simple test app to generate static site</h1>
        <p>
          It uses getStaticProps() and getStaticPaths() functions of Next.js and
          gets certain number of blog posts from a specific blog using Blogger
          v3.0 API. The index page as well as the blog posts pages can be
          statically generated using npm build.
        </p>
        <h2>Blog Posts</h2>
        <ul>
          {postItems.map((post) => (
            <li key={post.id}>
              <a href={`/posts/${post.id}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const blogReqURL = `${process.env.BLOGURL}/posts?maxResults=${process.env.MAXRESULTS}&key=${process.env.APIKEY}`;
  const res = await fetch(blogReqURL);
  const response = await res.json();

  const postItems = response.items;

  // By returning { props: { postItems } }, the Blog component
  // will receive `postItems` as a prop at build time
  return {
    props: {
      postItems,
    },
  };
}
