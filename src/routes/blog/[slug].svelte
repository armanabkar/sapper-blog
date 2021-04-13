<script context="module">
  export async function preload({ params }) {
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
  import { Information } from "../../information.config";
  export let post;
</script>

<svelte:head>
  <title>{post.title} - {Information.name} - {Information.position}</title>

  <meta property="og:type" content="article" />
  <meta property="og:title" content={post.title} />
  <meta name="Description" content={post.excerpt} />
  <meta property="og:description" content={post.excerpt} />
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
    <Bio {Information} />
  </div>
</div>

<style>
  header {
    text-align: center;
    padding: 0;
    margin: 0;
  }

  header h1 {
    font-size: 2.5em;
    margin: 0 3.5em;
  }

  header p {
    color: var(--tertiary);
    text-transform: uppercase;
    font-family: Rubik, sans-serif;
    font-weight: 600;
    font-style: italic;
    margin-top: 1rem;
    font-size: 1.2em;
  }

  @media (max-width: 768px) {
    header h1 {
      font-size: 2em;
      margin: 0;
    }

    .container {
      text-align: left;
    }

    header p {
      margin-top: 0;
      font-size: 1em;
    }
  }

  header hr {
    min-width: 100px;
    width: 35%;
  }

  .back {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    font-size: 1.5rem;
    padding: 1.5rem 0;
    color: var(--primary);
  }
  .back:hover {
    color: var(--scrondary);
  }
</style>
