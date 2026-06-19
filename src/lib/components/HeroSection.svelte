<script>
  import BeforeAfterSlider from "./BeforeAfterSlider.svelte";
</script>

<section class="h-screen flex items-center justify-center">
    <div
      class="grid flex-1 gap-10 lg:grid-cols-2 items-center max-w-[70%]"
    >
      <div
        class="flex flex-col justify-end gap-8 pb-10 pt-8 text-left sm:text-center lg:text-left"
      >
        <div class="max-w-2xl">
          <p
            class="font-mono text-xs uppercase tracking-[0.28em] text-[color:rgba(47,47,47,0.55)]"
          >
            AI-Powered Interior Design
          </p>
          <h1
            class="mt-6 max-w-[700px] text-4xl font-display font-semibold leading-tight tracking-tight sm:text-5xl lg:text-[clamp(3rem,6vw,6rem)] text-gray-800"
          >
            See Your Dream Room<br />Before You Build It.
          </h1>
          <p
            class="mt-6 max-w-xl font-body text-base leading-8 text-[color:rgba(47,47,47,0.78)] sm:text-lg"
          >
            Upload a photo of your room and let AI redesign it in seconds.
            Discover furniture, colors, and styling recommendations before
            making a single purchase.
          </p>
        </div>

        <div class="flex flex-col gap-4 sm:flex-row sm:justify-start">
          <a
            href="/dashboard"
            class="inline-flex items-center justify-center rounded-full bg-[color:var(--color-accent)] px-7 py-3 text-sm font-semibold text-[color:var(--color-background)] transition hover:bg-[color:var(--color-accent)]/90"
          >
            Start Designing
          </a>
          <a
            href="/projects/new"
            class="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] bg-transparent px-7 py-3 text-sm font-semibold text-[color:var(--color-accent)] transition hover:bg-[color:var(--color-background)]/90"
          >
            Create New Design
          </a>
        </div>

        <p
          class="max-w-md font-body text-sm leading-6 text-[color:rgba(47,47,47,0.55)]"
        >
          Bedroom • Workspace • Living Room
        </p>
      </div>

      <div class="flex items-end justify-center lg:justify-end">
        <div
          class="w-full overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--color-background)] p-4 shadow-[0_32px_80px_rgba(47,47,47,0.08)] lg:p-6"
        >
          <BeforeAfterSlider />
        </div>
      </div>
    </div>
</section>
