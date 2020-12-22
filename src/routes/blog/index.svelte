<script context="module">
  import { fadeIn, fadeOut } from "../../components/pageFade";

  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then((r) => r.json())
      .then((posts) => {
        return { posts };
      });
  }
</script>

<script>
  export let posts;
</script>

<style>
  h2,
  .post-item-footer {
    font-family: Rubik, sans-serif;
    font-weight: 700;
  }

  .post-item-date {
    color: #aaa;
    text-align: left;
    text-transform: uppercase;
    margin-right: 16px;
  }

  hr {
    margin: 3rem auto;
  }

  @media (max-width: 1020px) {
    .container {
      text-align: center;
      margin: 0 auto;
    }

    hr {
      margin: 2rem auto;
    }
  }
</style>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<div class="container" in:fadeIn out:fadeOut>
  <h1>Blog</h1>
  {#each posts as post, index}
    {#if index}
      <hr />
    {/if}
    <div class="post-item">
      <h2><a rel="prefetch" href="blog/{post.slug}">{post.title}</a></h2>
      <p>{post.excerpt}</p>
      <div class="post-item-footer">
        <span class="post-item-date">— {post.printDate}</span>
      </div>
    </div>
  {/each}
</div>
