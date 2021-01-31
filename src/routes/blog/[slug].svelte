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
  export let post;
</script>

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
    header p {
      margin-top: 0;
    }
  }

  header hr {
    min-width: 100px;
    width: 30%;
  }

  .back {
    text-decoration: none;
    font-size: 1.5rem;
    margin: 0;
  }

  .back-button {
    text-align: center;
    margin-bottom: 2rem;
  }
</style>

<svelte:head>
  <title>{post.title}</title>
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
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })} />
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
      <a class="back" href="blog"><i
          class="fa fa-arrow-circle-left"
          aria-hidden="true" />
        Back To Posts</a>
    </div>
    <Bio />
  </div>
</div>
