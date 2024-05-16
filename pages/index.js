export default function Home({ postItems }) {
  return (
    <div>
      {postItems ? (
        <ul>
          {postItems.map((post) => (
            // <li key={post.id}>{post.title}</li>
            <li key={post.id}>
              <a href={`/posts/${post.id}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>postItems is false (null or undefined)</p>
      )}
    </div>
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
