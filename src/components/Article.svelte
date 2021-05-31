<script>
  export let article;
</script>

<div class="article-item">
  <h2>
    <a rel="prefetch" href="articles/{article.slug}">{article.title}</a>
  </h2>
  <p>{article.excerpt}</p>
  <div class="article-item-footer">
    <span class="article-item-date"
      >— {article.printDate} |
      <a href="articles/{article.slug}">Read more</a></span
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

  .article-item-footer {
    font-family: San Francisco, sans-serif;
    font-weight: 700;
  }

  .article-item-date {
    color: var(--secondary);
    text-transform: uppercase;
    margin-right: 1rem;
  }
</style>
