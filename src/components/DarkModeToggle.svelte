<script>
  import { fade } from "svelte/transition";

  let mode = "light";
  function toggle() {
    window.document.body.classList.toggle("dark-mode");
    if (mode == "dark") {
      mode = "light";
    } else {
      mode = "dark";
    }
  }
</script>

<div>
  {#if mode == "light"}
    <p on:click={toggle} in:fade={{ duration: 600 }}>
      Dark Mode <sup>Beta</sup>
    </p>
  {:else}
    <p on:click={toggle} in:fade={{ duration: 600 }}>
      Light Mode <sup>Beta</sup>
    </p>
  {/if}
</div>

<style>
  p {
    color: var(--secondary);
    cursor: pointer;
    margin: -1.8rem auto 0.9rem auto;
    letter-spacing: 0.1rem;
    font-weight: 500;
  }

  :global(body.dark-mode) {
    --primary: #2196f3;
    --secondary: #eeeeee;
    --grey: rgba(170, 170, 170, 0.5);
    --white: #252525;
  }

  sup {
    font-size: 0.7rem;
    color: var(--grey);
  }
</style>
