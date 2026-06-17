<script>
  let position = 48;
</script>

<div class="relative w-full h-[420px] md:h-[560px] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-white/10 bg-slate-950">
  <div class="absolute inset-0 bg-slate-950/90" />

  <div class="absolute inset-0 grid grid-cols-2">
    <div class="relative bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.55),_transparent_40%)]">
      <div class="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-slate-950/30 to-slate-950/90"></div>
    </div>
    <div class="relative bg-[radial-gradient(circle_at_top_right,_rgba(236,72,153,0.5),_transparent_40%)]">
      <div class="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-slate-950/20 to-slate-950/90"></div>
    </div>
  </div>

  <div class="absolute inset-0 bg-[linear-gradient(180deg,_rgba(15,23,42,0.16),_rgba(15,23,42,0.84))]" />

  <div class="absolute inset-y-0 left-0 overflow-hidden" style="width: {position}%">
    <div class="absolute inset-0 bg-[linear-gradient(135deg,_rgba(56,189,248,0.32),_rgba(14,165,233,0.12))]" />
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.18),_transparent_32%)]" />
  </div>

  <div class="absolute inset-x-0 top-6 px-6 flex items-center justify-between text-xs uppercase tracking-[0.4em] text-slate-300/75">
    <span class="rounded-full bg-white/5 px-3 py-1">Before</span>
    <span class="rounded-full bg-white/5 px-3 py-1">After</span>
  </div>

  <div class="absolute inset-x-0 bottom-24 px-6">
    <div class="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-400">
      <span>AI-powered visualization</span>
      <span>{position}%</span>
    </div>
  </div>

  <div class="absolute inset-x-0 inset-y-0 flex items-center justify-center pointer-events-none">
    <div class="relative w-full max-w-4xl" style="--pos: {position}%">
      <div class="absolute top-0 bottom-0 w-px bg-white/20" style="left: {position}%" />
      <div class="absolute top-1/2 mt-0 h-12 w-12 -translate-x-1/2 rounded-full border border-white/70 bg-slate-950/80 shadow-2xl" style="left: {position}%">
        <span class="absolute inset-0 flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">Drag</span>
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
      class="w-full accent-cyan-400"
    />
  </div>
</div>
