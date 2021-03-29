<script>
  export let Information;

  const icons = [
    {
      href: Information.socialMedia.LinkedIn,
      ariaLabel: "Linkedin",
      iconName: "fa-linkedin-in",
    },
    {
      href: Information.socialMedia.Github,
      ariaLabel: "Github",
      iconName: "fa-github",
    },
    {
      href: Information.socialMedia.StackOverflow,
      ariaLabel: "StackOverflow",
      iconName: "fa-stack-overflow",
    },
    {
      href: Information.socialMedia.Telegram,
      ariaLabel: "Telegram",
      iconName: "fa-telegram",
    },
    {
      href: Information.socialMedia.Twitter,
      ariaLabel: "Twitter",
      iconName: "fa-twitter",
    },
    {
      href: Information.socialMedia.Instagram,
      ariaLabel: "Instagram",
      iconName: "fa-instagram",
    },
  ];

  const validIcons = icons.filter((icon) => icon.href !== "");
</script>

<svelte:head>
  <script
    defer
    src="https://kit.fontawesome.com/5a630b64cb.js"
    crossorigin="anonymous"></script>
</svelte:head>

<footer>
  {#each validIcons as { href, ariaLabel, iconName }}
    <a aria-label={ariaLabel} {href} target="_blank" rel="noopener noreferrer">
      <i class={"fab " + iconName + " fa-2x"} />
    </a>
  {/each}
</footer>

<style>
  footer {
    display: flex;
    flex-direction: row;
    height: 2rem;
    position: relative;
    bottom: -2rem;
    justify-content: center;
    gap: 0.75rem;
  }

  a {
    color: var(--grey);
  }

  a:hover {
    color: var(--secondary);
  }
</style>
