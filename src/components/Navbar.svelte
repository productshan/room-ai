<script>
  import gsap from "gsap";
  import { onMount } from "svelte";

  let navTween = gsap.timeline({
    scrollTrigger: {
      trigger: "header",
      start: "bottom top",
    },
  });

  onMount(() => {
    navTween.fromTo(
      "header",
      { backgroundColor: "transparent" },
      {
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        duration: 1,
        backgroundFilter: "blur(10px)",
        ease: "power1.inOut",
      },
    );
  });
</script>

<header class="sticky top-0 bg-transparent z-10">
  <div class="container mx-auto px-4 py-4 flex items-center justify-between">
    <h1 class="text-2xl font-sans font-bold text-gray-800 font-mono">
      Room AI
    </h1>
    <nav>
      <ul class="flex space-x-4">
        <li>
          <a href="#" class="text-gray-600 hover:text-gray-800 font-mono"
            >Let's generate!</a
          >
        </li>
      </ul>
    </nav>
  </div>
</header>
