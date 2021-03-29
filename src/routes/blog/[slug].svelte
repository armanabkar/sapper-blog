<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    const res = await this.fetch(`blog/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import { fadeIn, fadeOut } from "../../utils/pageFade";

  import Bio from "../../components/Bio.svelte";
  import { Information } from "../../config";
  export let post;
</script>

<svelte:head>
  <title>{post.title} - {Information.name} - {Information.position}</title>
  <!--  Include canonical links to your blog -->
  <!--   <link rel="canonical" href="" /> -->

  <!-- Validate your twitter card with https://cards-dev.twitter.com/validator  -->
  <!-- Update content properties with your URL   -->
  <!-- 	<meta property="og:url" content=""} /> -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content={post.title} />
  <meta name="Description" content={post.excerpt} />
  <meta property="og:description" content={post.excerpt} />

  <!--  Link to your preferred image  -->
  <!-- 	<meta property="og:image" content="" /> -->

  <meta name="twitter:card" content="summary_large_image" />

  <!--  Link to your Domain  -->
  <!-- 	<meta name="twitter:domain" value="" /> -->

  <!--  Link to your Twitter Account  -->
  <!-- 	<meta name="twitter:creator" value="" /> -->

  <meta name="twitter:title" value={post.title} />
  <meta name="twitter:description" content={post.excerpt} />

  <!--  Link to your preferred image to be displayed on Twitter (832x520px) -->
  <!-- 	<meta name="twitter:image" content="" /> -->

  <meta name="twitter:label1" value="Published on" />
  <meta
    name="twitter:data1"
    value={new Date(post.printDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}
  />
  <meta name="twitter:label2" value="Reading Time" />
  <meta name="twitter:data2" value={post.printReadingTime} />
</svelte:head>

<div in:fadeIn out:fadeOut>
  <header>
    <p>{post.printDate} ~ {post.printReadingTime}</p>
    <h1>{post.title}</h1>
    <hr />
  </header>
  <div class="container">
    <article class="content">
      {@html post.html}
    </article>
    <div class="back-button">
      <a class="back" href="blog"
        ><svg
          width="24px"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="arrow-circle-left"
          class="svg-inline--fa fa-arrow-circle-left fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          ><path
            fill="currentColor"
            d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z"
          /></svg
        > Back To Posts</a
      >
    </div>
    <Bio {Information} />
  </div>
</div>

<style>
  header {
    text-align: center;
  }

  header h1 {
    margin-bottom: 0.7em;
    font-size: 3.5em;
  }

  @media only screen and (max-width: 768px) {
    header h1 {
      font-size: 2.5em;
    }
  }

  header {
    padding: 0;
    margin: 0;
  }

  header p {
    color: var(--grey);
    text-transform: uppercase;
    font-family: Rubik, sans-serif;
    font-weight: 600;
    margin-top: 1rem;
  }

  @media (max-width: 800px) {
    .container {
      text-align: left;
    }

    header p {
      margin-top: 0;
    }
  }

  header hr {
    min-width: 100px;
    width: 30%;
  }

  .back {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    text-decoration: none;
    font-size: 1.5rem;
    letter-spacing: 0.01rem;
    padding-top: 1.5rem;
    color: var(--primary);
  }
  .back:hover {
    color: var(--scrondary);
  }

  .back-button {
    text-align: center;
    margin-bottom: 2rem;
  }
</style>
