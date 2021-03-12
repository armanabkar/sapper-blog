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
  h2,
  .post-item-footer {
    font-family: Rubik, sans-serif;
    font-weight: 700;
  }

  .post-item-date {
    color: var(--grey);
    text-align: left;
    text-transform: uppercase;
    margin-right: 16px;
  }

  .postName {
    color: var(--primary);
    letter-spacing: 0.02rem;
  }
</style>
