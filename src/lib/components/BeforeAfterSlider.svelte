<script>
  let position = 48;
</script>

<div
  class="relative w-full h-[420px] md:h-[560px] rounded-[2rem] overflow-hidden border border-[color:var(--border)] bg-[color:var(--color-background)] shadow-[0_40px_80px_rgba(47,47,47,0.08)]"
>
  <div
    class="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,244,240,0.95),rgba(232,220,203,0.20),transparent)]"
  ></div>

  <div class="absolute inset-0 grid grid-cols-2">
    <div
      class="relative bg-[linear-gradient(135deg,rgba(232,220,203,0.35),transparent_68%)]"
    >
      <div
        class="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(47,47,47,0.04))]"
      ></div>
    </div>
    <div
      class="relative bg-[linear-gradient(225deg,rgba(233,229,221,0.30),transparent_68%)]"
    >
      <div
        class="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(47,47,47,0.04))]"
      ></div>
    </div>
  </div>

  <div
    class="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(47,47,47,0.16))]"
  ></div>

  <div
    class="absolute inset-y-0 left-0 overflow-hidden"
    style="width: {position}%"
  >
    <div
      class="absolute inset-0 bg-[linear-gradient(135deg,rgba(232,220,203,0.36),transparent)]"
    ></div>
  </div>

  <div
    class="absolute inset-x-0 top-6 px-6 flex items-center justify-between text-xs uppercase tracking-[0.4em] text-[color:rgba(47,47,47,0.55)]"
  >
    <span
      class="rounded-full bg-[color:var(--color-background)]/80 px-3 py-1 text-[color:var(--color-accent)]"
      >Before</span
    >
    <span
      class="rounded-full bg-[color:var(--color-background)]/80 px-3 py-1 text-[color:var(--color-accent)]"
      >After</span
    >
  </div>

  <div class="absolute inset-x-0 bottom-24 px-6">
    <div
      class="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-[color:rgba(47,47,47,0.55)]"
    >
      <span>AI-powered visualization</span>
      <span>{position}%</span>
    </div>
  </div>

  <div
    class="absolute inset-x-0 inset-y-0 flex items-center justify-center pointer-events-none"
  >
    <div class="relative w-full max-w-4xl">
      <div
        class="absolute top-0 bottom-0 w-px bg-[color:var(--border)]"
        style="left: {position}%"
      ></div>
      <div
        class="absolute top-1/2 mt-0 h-12 w-12 -translate-x-1/2 rounded-full border border-[color:var(--border)] bg-[color:var(--color-background)] shadow-lg"
        style="left: {position}%"
      >
        <span
          class="absolute inset-0 flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-accent)]"
          >Drag</span
        >
      </div>
    </div>
  </div>

  <div class="absolute inset-x-0 bottom-6 px-6">
    <input
      type="range"
      min="0"
      max="100"
      bind:value={position}
      aria-label="Adjust before and after preview"
      class="w-full accent-[color:var(--color-accent)]"
    />
  </div>
</div>
