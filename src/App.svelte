<script>
  import BeforeAfterSlider from './components/BeforeAfterSlider.svelte';
</script>

<main class="min-h-screen bg-slate-950 text-white">
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 bg-slate-950/90" />
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.16),_transparent_18%)]" />

    <div class="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
      <div class="grid gap-12 lg:grid-cols-[minmax(0,46%)_minmax(0,54%)] lg:items-end">
        <div class="relative flex flex-col justify-end gap-8 pb-8 pt-10 lg:pb-12">
          <div class="max-w-2xl">
            <p class="text-xs uppercase tracking-[0.3em] text-cyan-300/80">AI Room Design</p>
            <h1 class="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              See Your Dream Room<br />Before You Build It.
            </h1>
            <p class="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Upload a photo of your room and let AI redesign it in seconds. Explore furniture, colors, and styling recommendations before spending a single dollar.
            </p>
          </div>

          <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#" class="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
              Start Designing
            </a>
            <a href="#" class="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              View Examples
            </a>
          </div>

          <p class="max-w-md text-sm leading-6 text-slate-400">
            Transform any bedroom, workspace, or living room in minutes.
          </p>
        </div>

        <div class="relative">
          <div class="rounded-[2rem] border border-white/10 bg-slate-900/70 p-4 shadow-2xl backdrop-blur-xl lg:p-6">
            <BeforeAfterSlider />
          </div>
        </div>
      </div>
    </div>
  </section>
</main>