<script>
  import Slug from "../routes/blog/[slug].svelte";

  export let post;
</script>

<div class="post-item">
  <h2>
    <a rel="prefetch" href="blog/{post.slug}">{post.title}</a>
  </h2>
  <p>{post.excerpt}</p>
  <div class="post-item-footer">
    <span class="post-item-date"
      >— {post.printDate} | <a href="blog/{post.slug}">Read more</a></span
    >
  </div>
</div>

<style>
  h2 a {
    color: var(--primary);
  }

  p {
    margin: 0.9em 0;
  }

  .post-item-footer {
    font-family: San Francisco, sans-serif;
    font-weight: 700;
  }

  .post-item-date {
    color: var(--secondary);
    text-transform: uppercase;
    margin-right: 1rem;
  }
</style>
