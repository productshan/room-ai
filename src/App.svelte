<script>
  import { onMount } from "svelte";
  import HeroSection from "./components/HeroSection.svelte";
  import HowItWorks from "./components/HowItWorks.svelte";
  import Dashboard from "./components/Dashboard.svelte";

  let route = "/";

  function updateRoute() {
    route = window.location.pathname || "/";
  }

  onMount(() => {
    updateRoute();
    window.addEventListener("popstate", updateRoute);
    return () => window.removeEventListener("popstate", updateRoute);
  });

  function handleNavigate(path) {
    if (window.location.pathname !== path) {
      history.pushState(null, "", path);
      route = path;
    }
  }
</script>

<main class="min-h-screen bg-[color:var(--color-background)] text-[color:var(--color-accent)]">
  {#if route === "/dashboard"}
    <Dashboard onNavigate={handleNavigate} />
  {:else}
    <HeroSection />
    <HowItWorks />
  {/if}
</main>
