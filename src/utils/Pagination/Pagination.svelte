<script>
  import { createEventDispatcher } from "svelte";
  import { generateNavigationOptions } from "./index";
  import { PREVIOUS_PAGE, NEXT_PAGE, ELLIPSIS } from "./index";

  const dispatch = createEventDispatcher();

  export let totalItems = 0;
  export let pageSize = 1;
  export let currentPage = 1;
  export let limit = null;
  export let showStepOptions = false;

  $: options = generateNavigationOptions({
    totalItems,
    pageSize,
    currentPage,
    limit,
    showStepOptions,
  });

  $: totalPages = Math.ceil(totalItems / pageSize);

  function handleOptionClick(option) {
    dispatch("setPage", { page: option.value });
    document.body.scrollIntoView({ behavior: "smooth" });
  }
</script>

<div class="light-pagination-nav" class:disabled={totalItems < pageSize}>
  <div class="pagination-nav">
    {#each options as option}
      <span
        class="option"
        class:prev={option.type === "symbol" && option.symbol === PREVIOUS_PAGE}
        class:next={option.type === "symbol" && option.symbol === NEXT_PAGE}
        class:disabled={(option.type === "symbol" &&
          option.symbol === NEXT_PAGE &&
          currentPage >= totalPages) ||
          (option.type === "symbol" &&
            option.symbol === PREVIOUS_PAGE &&
            currentPage <= 1)}
        class:ellipsis={option.type === "symbol" && option.symbol === ELLIPSIS}
        on:click={() => handleOptionClick(option)}
      >
        {#if option.type === "symbol" && option.symbol === PREVIOUS_PAGE}
          <slot name="prev">
            <p>Previous Page</p>
          </slot>
        {:else if option.type === "symbol" && option.symbol === NEXT_PAGE}
          <slot name="next">
            <p>Next Page</p>
          </slot>
        {/if}
      </span>
    {/each}
  </div>
</div>

<style>
  .light-pagination-nav :global(.pagination-nav) {
    display: flex;
    justify-content: space-between;
  }
  .light-pagination-nav :global(.option) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    font-family: San Francisco, -apple-system, Roboto, sans-serif;
    margin: 0;
  }
  .light-pagination-nav :global(.option.active) {
    color: var(--link);
  }
  .disabled {
    pointer-events: none;
    opacity: 0;
  }
  p {
    color: var(--link);
    margin: 0;
    padding: 0;
    font-size: 1.15em;
    transition: color linear 0.15s;
    font-weight: 500;
  }
  p:hover {
    color: var(--primary);
    cursor: pointer;
  }
</style>
