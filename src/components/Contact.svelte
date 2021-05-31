<script>
  export let Information;

  const icons = [
    {
      href: Information.socialMedia.LinkedIn,
      ariaLabel: "Linkedin",
      iconName: "bi-linkedin",
    },
    {
      href: Information.socialMedia.Github,
      ariaLabel: "Github",
      iconName: "bi-github",
    },
    {
      href: Information.socialMedia.Telegram,
      ariaLabel: "Telegram",
      iconName: "bi-telegram",
    },
    {
      href: Information.socialMedia.Twitter,
      ariaLabel: "Twitter",
      iconName: "bi-twitter",
    },
    {
      href: Information.socialMedia.Instagram,
      ariaLabel: "Instagram",
      iconName: "bi-instagram",
    },
  ];
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.min.css"
  />
</svelte:head>

<p class="prefix">Contact Info:</p>
<div class="container">
  <p><i class="bi bi-envelope-fill" /> {Information.email}</p>
</div>
<div class="container">
  <p><i class="bi bi-geo-alt-fill" /> {Information.location}</p>
  <p class="icons">
    {#each icons as { href, ariaLabel, iconName }}
      <a
        aria-label={ariaLabel}
        {href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class={"bi " + iconName} />
      </a>
    {/each}
  </p>
</div>

<style>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  p {
    margin: 0;
  }

  a {
    color: var(--primary);
    margin-right: 0.25em;
  }

  a:hover {
    color: var(--secondary);
  }

  @media (max-width: 768px) {
    .container {
      display: block;
    }
  }
</style>
