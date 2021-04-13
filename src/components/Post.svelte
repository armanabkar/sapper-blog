<script>
  export let post;
</script>

<div class="post-item">
  <h2 class="postName">
    <a rel="prefetch" href="blog/{post.slug}">{post.title}</a>
  </h2>
  <p>{post.excerpt}</p>
  <div class="post-item-footer">
    <span class="post-item-date">— {post.printDate}</span>
  </div>
</div>

<style>
  .post-item-footer {
    font-family: Rubik, sans-serif;
    font-weight: 700;
  }

  .post-item-date {
    color: var(--tertiary);
    text-transform: uppercase;
    margin-right: 1rem;
  }

  .postName {
    color: var(--primary);
  }
</style>
