const BLOGPOSTSREQ =
  "https://www.googleapis.com/blogger/v3/blogs/5765625164803845699/posts?maxResults=5&key=";

export default function Home({ postItems }) {
  return (
    <div>
      {postItems ? (
        <ul>
          {postItems.map((post) => (
            <li key={post.id}>{post.title}</li>
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
  const blogReqURL = BLOGPOSTSREQ + process.env.APIKEY;
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
