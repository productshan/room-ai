<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  let box;

  onMount(() => {
    // GSAP animation example
    gsap.to(box, {
      duration: 2,
      rotation: 360,
      repeat: -1,
      ease: 'power1.inOut'
    });
  });
</script>

<main class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
  <div class="text-center">
    <h1 class="text-5xl font-bold text-gray-800 mb-4">Room AI</h1>
    <p class="text-lg text-gray-600 mb-8">Svelte + Tailwind CSS + GSAP</p>
    
    <div
      bind:this={box}
      class="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg mx-auto mb-8"
    ></div>
    
    <p class="text-gray-600">Your project is ready to go! 🚀</p>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>
