import parse from "html-react-parser";
export default function Post({ post }) {
  // Render post...
  return (
    <article>
      <h1>{post.title}</h1>
      {parse(post.content)}
      {/* {post.content} // JSX escapes HTML content */}
    </article>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const blogReqURL = `${process.env.BLOGURL}/posts?maxResults=${process.env.MAXRESULTS}&key=${process.env.APIKEY}`;
  const res = await fetch(blogReqURL);
  const response = await res.json();

  const postItems = response.items;

  // Get the paths we want to pre-render based on posts
  const paths = postItems.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const blogReqURL = `${process.env.BLOGURL}/posts/${params.id}?key=${process.env.APIKEY}`;
  const res = await fetch(blogReqURL);
  const post = await res.json();

  // Pass post data to the page via props
  return { props: { post } };
}
