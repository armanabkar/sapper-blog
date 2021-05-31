<header>
  <button on:click={() => window.history.back()}>Back</button>
</header>

<style>
  header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 auto;
    max-width: 57em;
    width: 100%;
  }

  button {
    text-decoration: none;
    margin: 1rem 0 0 0;
    padding: 0;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--link);
    box-shadow: none;
    border: none;
    background-color: var(--background);
    transition: color linear 0.15s;
  }

  button:hover {
    cursor: pointer;
    color: var(--primary);
  }
</style>
