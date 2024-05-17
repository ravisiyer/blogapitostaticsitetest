Very simple test app focused on using getStaticProps() and getStaticPaths() functions of Next.js to generate a static site.
It gets certain number of blog posts from a specific blog using Blogger v3.0 API.

To run the program, following environment variables have to be set suitably:  
APIKEY=your-google-cloud-api-key  
BLOGURL=https://www.googleapis.com/blogger/v3/blogs/5765625164803845699  
MAXRESULTS=5

If you don't have a Google Cloud API credential to specify in APIKEY above, you can get it at:
[https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
Note that blog Id has to be supplied in BLOGURL env. variable.

The index page as well as the blog posts pages can be statically generated using npm build.

The user interface of the app is deliberately very simple.

Blog post associated with this app: [Notes on using Next.js 14 with Pages router to generate static site from data returned by an API](https://raviswdev.blogspot.com/2024/05/notes-on-using-nextjs-14-with-pages.html).
