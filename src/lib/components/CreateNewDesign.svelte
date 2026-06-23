<script>
  import { uploadImage } from '$lib/client/upload.api';
  import { createProject } from '$lib/client/project.api';

  export let onNavigate;

  let imageFile = null;
  let imageUrl = "";
  let prompt = "";
  let uploadResult = null;
  let selectedStyleId = null;
  
  let generatedProcess = null;
  let isGenerating = false;
  let uploadStatus = 'idle';
  let isUploading = false;
  let uploadError = "";

  let statusSteps = [
    { label: "Uploading Room", state: "pending" },
    { label: "Generating Design", state: "pending" },
    { label: "Creating Recommendations", state: "pending" }
  ];
  let statusMessage = "";
  let chipSuggestions = [
    {'title': 'Japanese Minimalist', id: 1}, 
    {'title': 'Scandinavian Cozy', id: 2}, 
    {'title': 'Mid-Century Modern', id: 3}, 
    {'title': 'Industrial Chic', id: 4}, 
    {'title': 'Bohemian Eclectic', id: 5}];

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (file && allowedTypes.includes(file.type)) {
      setImage(file);
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file && allowedTypes.includes(file.type)) {
      setImage(file);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function setImage(file) {
    imageFile = file;
    imageUrl = URL.createObjectURL(file);
    uploadResult = null;
    uploadStatus = 'idle';
    uploadError = "";
  }

  function removeImage() {
    imageFile = null;
    imageUrl = "";
    uploadResult = null;
    uploadStatus = 'idle';
    uploadError = "";
    statusSteps = statusSteps.map((step) => ({ ...step, state: "pending" }));
    statusMessage = "";
    isGenerating = false;
    isUploading = false;
  }

  function chooseChip(value) {
    prompt = `Transform this space into a ${chipSuggestions.find(chip => chip.id === value)?.title || 'stylish design'} style.`;
    selectedStyleId = value;
  }

  async function handleUpload() {
    if (!imageFile) return;

    uploadStatus = 'uploading';
    uploadError = "";
    uploadResult = null;
    isUploading = true;

    try {
      const result = await uploadImage(imageFile);
      uploadResult = result;
      uploadStatus = 'success';
      statusMessage = 'Image uploaded successfully.';
    } catch (error) {
      uploadStatus = 'error';
      uploadError = error instanceof Error ? error.message : 'Upload failed.';
      statusMessage = 'Image upload failed.';
    } finally {
      isUploading = false;
    }
  }

  function resetStatus() {
    statusSteps = statusSteps.map((step) => ({ ...step, state: "pending" }));
    statusMessage = "";
    isGenerating = false;
  }

  function handleGenerate() {
    if (!imageFile || !prompt.trim()) return;

    resetStatus();
    isGenerating = true;
    statusMessage = "Designing your dream space...";

    statusSteps[0].state = "active";

    setTimeout(() => {
      statusSteps = statusSteps.map((step, index) => ({ ...step, state: index === 1 ? "active" : index < 1 ? "complete" : "pending" }));
      statusSteps[0].state = "complete";
    }, 900);

    setTimeout(() => {
      statusSteps = statusSteps.map((step, index) => ({ ...step, state: index === 2 ? "active" : index < 2 ? "complete" : "pending" }));
    }, 1700);

    setTimeout(() => {
      statusSteps = statusSteps.map((step) => ({ ...step, state: "complete" }));
      statusMessage = "Your room transformation is ready.";
      isGenerating = false;
    }, 2400);
  }

  async function createProjectFromDesign() {
    if (!uploadResult) return;

    try {
      const projectData = {
        title:'Untitled Design',
        style:'Unknown Style',
        prompt: prompt,
        status: 'draft',
        image_prompt: prompt,
        original_image_url: uploadResult.url,
      };

      const newProject = await createProject(projectData);
      generatedProcess = newProject;
    } catch (error) {
      generatedProcess = error;
    }
  }

</script>

<section class="min-h-screen px-6 py-16 sm:px-8 lg:px-10 xl:px-0">
  <div class="mx-auto max-w-7xl">
    <div class="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div class="max-w-2xl">
        <p class="font-mono text-xs uppercase tracking-[0.28em] text-[color:rgba(47,47,47,0.55)]">
          NEW DESIGN
        </p>
        <h1 class="mt-5 text-4xl font-display font-semibold leading-tight text-[color:var(--color-accent)] sm:text-5xl">
          Transform Your Room
        </h1>
        <p class="mt-5 max-w-xl font-body text-base leading-8 text-[color:rgba(47,47,47,0.78)]">
          Upload a room photo and describe the style you want to achieve.
        </p>
      </div>
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--color-background)] px-6 py-3 text-sm font-semibold text-[color:var(--color-accent)] transition hover:border-[color:var(--color-accent)] hover:bg-[color:var(--color-primary)]/10"
        on:click={() => onNavigate('/dashboard')}
      >
        Back to Dashboard
      </button>
    </div>

    <div class="grid gap-10 xl:grid-cols-[0.95fr_1.05fr]">
      <div class="space-y-6">
        <div
          class="group rounded-[1.5rem] border-2 border-[color:var(--border)] bg-[color:var(--color-background)] p-8 transition duration-300 hover:border-[color:var(--color-primary)]"
          role="button"
          tabindex="0"
          on:dragover={handleDragOver}
          on:drop={handleDrop}
        >
          <label class="block h-full min-h-[320px] cursor-pointer" for="upload-input">
            {#if imageUrl}
              <div class="relative h-full overflow-hidden rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--color-background)]">
                <img src={imageUrl} alt="Uploaded room preview" class="h-full w-full object-cover" />
                <div class="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(248,244,240,0.96))] p-4 backdrop-blur-sm">
                  <div class="flex flex-col gap-3">
                    <button
                      type="button"
                      class="inline-flex items-center justify-center rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-[color:var(--color-background)] transition hover:bg-[color:var(--color-accent)]/90"
                      on:click|stopPropagation={removeImage}
                    >
                      Replace Image
                    </button>
                    <button
                      type="button"
                      class="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--color-background)] px-4 py-2 text-sm font-semibold text-[color:var(--color-accent)] transition hover:border-[color:var(--color-accent)]"
                      on:click|stopPropagation={removeImage}
                    >
                      Remove Image
                    </button>
                  </div>
                </div>
              </div>
            {:else}
              <div class="flex h-full flex-col items-center justify-center gap-4 text-center text-[color:rgba(47,47,47,0.65)]">
                <div class="rounded-full border border-[color:var(--border)] bg-[color:var(--color-secondary)] p-5 text-[color:var(--color-accent)]">
                  <span class="text-xl font-semibold">+</span>
                </div>
                <div>
                  <p class="font-body text-lg font-semibold text-[color:var(--color-accent)]">Drag & drop your room photo</p>
                  <p class="mt-2 font-body text-sm text-[color:rgba(47,47,47,0.7)]">or click to browse</p>
                </div>
                <p class="text-xs uppercase tracking-[0.22em] text-[color:rgba(47,47,47,0.55)]">Supported: JPG, PNG, WEBP</p>
              </div>
            {/if}
          </label>
          <input
            id="upload-input"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            class="sr-only"
            on:change={handleFileChange}
          />
        </div>

        {#if imageFile}
          <div class="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--color-background)] p-8">
            <div class="flex flex-col gap-4">
              <button
                type="button"
                class="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--color-accent)] px-6 py-4 text-sm font-semibold text-[color:var(--color-background)] transition disabled:cursor-not-allowed disabled:opacity-60 hover:bg-[color:var(--color-accent)]/90"
                on:click={handleUpload}
                disabled={isUploading}
              >
                {#if isUploading}
                  Uploading...
                {:else if uploadStatus === 'success'}
                  Uploaded
                {:else}
                  Upload Image
                {/if}
              </button>

              {#if uploadStatus === 'success' && uploadResult}
                <div class="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--color-background)] p-4">
                  <p class="text-sm font-semibold text-[color:var(--color-accent)]">Upload complete</p>
                  <p class="mt-2 text-sm text-[color:rgba(47,47,47,0.78)]">Image uploaded to Supabase originals folder.</p>
                  <a href={uploadResult.url} target="_blank" rel="noreferrer" class="mt-3 block truncate text-sm text-[color:var(--color-accent)] underline">
                    {uploadResult.url}
                  </a>
                </div>
              {:else if uploadStatus === 'error'}
                <p class="text-sm font-semibold text-red-600">{uploadError}</p>
              {/if}
            </div>
          </div>
        {/if}

        <div class="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--color-background)] p-8">
          <p class="font-mono text-xs uppercase tracking-[0.28em] text-[color:rgba(47,47,47,0.55)]">Style Prompt</p>
          <textarea
            class="mt-5 min-h-[220px] w-full resize-none rounded-[1.25rem] border border-[color:var(--border)] bg-[color:var(--color-background)] p-5 font-body text-base leading-7 text-[color:var(--color-accent)] outline-none transition focus:border-[color:var(--color-accent)]"
            placeholder="Transform this workspace into a Japanese minimalist style with warm lighting and natural wood furniture."
            bind:value={prompt}
            maxlength="1000"
          ></textarea>
          <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div class="flex flex-wrap gap-3">
              {#each chipSuggestions as chip}
                <button
                  type="button"
                  class={`rounded-full border px-4 py-2 text-sm font-semibold ${selectedStyleId === chip.id ? 'bg-red-100' : ''}`}
                  on:click={() => chooseChip(chip.id)}
                >
                  {chip.title}
                </button>
              {/each}
            </div>
            <p class="text-sm text-[color:rgba(47,47,47,0.55)]">{prompt.length}/1000</p>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--color-background)] p-8">
          <p class="font-mono text-xs uppercase tracking-[0.28em] text-[color:rgba(47,47,47,0.55)]">Generate Design</p>
          <p class="mt-4 font-body text-base leading-7 text-[color:rgba(47,47,47,0.78)]">
            When you are ready, generate a polished room design and see your transformation come to life.
          </p>
          <button
            type="button"
            class="mt-8 w-full rounded-full bg-[color:var(--color-accent)] px-6 py-4 text-sm font-semibold text-[color:var(--color-background)] transition disabled:cursor-not-allowed disabled:opacity-60 hover:bg-[color:var(--color-accent)]/90"
            on:click={createProjectFromDesign}
            disabled={!imageFile || !prompt.trim() || isGenerating}
          >
            Generate Design + {generatedProcess}
          </button>
        </div>

          {#if isGenerating || statusMessage}
          <div class="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--color-background)] p-8">
            <p class="font-mono text-xs uppercase tracking-[0.28em] text-[color:rgba(47,47,47,0.55)]">Generation Status</p>
            <div class="mt-6 space-y-6">
              {#each statusSteps as step}
                <div class="flex items-start gap-4">
                  <span class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--color-background)] text-sm font-semibold text-[color:var(--color-accent)]">
                    {step.state === 'complete' ? '✓' : step.state === 'active' ? '⟳' : '○'}
                  </span>
                  <div>
                    <p class="font-body text-sm font-semibold text-[color:var(--color-accent)]">{step.label}</p>
                    <p class="text-sm text-[color:rgba(47,47,47,0.55)]">
                      {step.state === 'complete'
                        ? 'Completed'
                        : step.state === 'active'
                        ? 'In progress'
                        : 'Pending'}
                    </p>
                  </div>
                </div>
              {/each}
            </div>
            {#if statusMessage}
              <p class="mt-8 rounded-3xl border border-[color:var(--border)] bg-[color:var(--color-secondary)]/50 p-5 font-body text-sm leading-6 text-[color:var(--color-accent)]">
                {statusMessage}
              </p>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>
