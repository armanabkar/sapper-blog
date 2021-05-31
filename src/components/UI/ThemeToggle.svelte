<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let themeMode;
  onMount(() => {
    themeMode = localStorage.getItem("theme");
  });

  function setThemeMode(mode) {
    themeMode = mode;
    localStorage.setItem("theme", mode);
  }

  function toggleTheme() {
    window.document.body.classList.toggle("dark-mode");
    switch (themeMode) {
      case "light":
        setThemeMode("dark");
        break;
      case "dark":
        setThemeMode("light");
        break;
      default:
        setThemeMode("light");
        break;
    }
  }
  // Toggle CSS classes functionality is implemented in template.html
</script>

<div>
  <p on:click={toggleTheme}>
    {#if themeMode == "light"}
      <svg
        in:fade={{ duration: 600 }}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    {:else}
      <svg
        in:fade={{ duration: 600 }}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    {/if}
  </p>
</div>

<style>
  p {
    color: var(--secondary);
    cursor: pointer;
    margin: 0;
  }

  p:hover {
    color: var(--primary);
  }

  :global(body.dark-mode) {
    --primary: #fdfdfd;
    --secondary: #5F5F5F;
    --background: #000000;
    --link: #007aff;
  }
</style>
