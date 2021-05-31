<script context="module">
  export async function preload({ params }) {
    const res = await this.fetch(`articles/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { article: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import { fadeIn, fadeOut } from "../../utils/pageFade";
  import { Information } from "../../information.config";
  export let article;
</script>

<svelte:head>
  <title>{article.title} - {Information.name} - {Information.position}</title>

  <meta property="og:type" content="article" />
  <meta property="og:title" content={article.title} />
  <meta name="Description" content={article.excerpt} />
  <meta property="og:description" content={article.excerpt} />
</svelte:head>

<div in:fadeIn out:fadeOut>
  <header>
    <p>{article.printDate} ~ {article.printReadingTime}</p>
    <h1>{article.title}</h1>
    <hr />
  </header>
  <div class="container">
    <article class="content">
      {@html article.html}
    </article>
    <a class="back" href="articles">Back To Articles</a>
  </div>
</div>

<style>
  header {
    text-align: center;
    padding: 0;
    margin: 1.5rem 0;
  }

  header h1 {
    font-size: 2.5em;
    margin: 0 3.5em;
  }

  header p {
    color: var(--secondary);
    text-transform: uppercase;
    font-family: San Francisco, sans-serif;
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
    font-size: 1.5rem;
    font-weight: 500;
    display: flex;
    justify-content: center;
    margin-top: 1.25em;
  }
</style>
