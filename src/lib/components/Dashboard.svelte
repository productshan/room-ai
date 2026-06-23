<script>
	export let onNavigate;
	import { onMount } from 'svelte';
	import { getProjects, deleteProject } from '$lib/client/project.api';

	let projects = [];

	onMount(async () => {
		let res = await getProjects();
		projects = res.data;
	});

  let selectedProjectId = null;
	let showDeleteModal = false;

	async function handleDelete(projectId) {
		try {
			await deleteProject(projectId);
			projects = projects.filter((project) => project.id !== projectId);
		} catch (error) {
			console.error('Error deleting project:', error);
		}
	}

  async function modalDeleteHandler(projectId) {
    selectedProjectId = projectId;
    showDeleteModal = true;
  }

</script>
  
<div class={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${showDeleteModal ? '' : 'hidden'}`}>
	<div class="bg-white rounded-lg p-6 shadow-lg">
		<h2 class="text-lg font-semibold mb-4">Confirm Deletion</h2>
		<p class="mb-4">Are you sure you want to delete this project? This action cannot be undone. {selectedProjectId} </p>
		<div class="flex justify-end gap-4">
			<button
				class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
				on:click={() => (showDeleteModal = false)}
			>
				Cancel
			</button>
			<button
				class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
				on:click={() => {
					handleDelete(selectedProjectId);
					showDeleteModal = false;
				}}
			>
				Delete
			</button>
		</div>
	</div>
</div>

<section class="px-6 py-16 sm:px-8 lg:px-10 xl:px-0">
	<div class="mx-auto max-w-7xl">
		<div
			class="flex flex-col gap-8 border-b border-[color:var(--border)] pb-10 sm:flex-row sm:items-end sm:justify-between"
		>
			<div class="max-w-3xl">
				<h1
					class="font-display text-4xl font-semibold leading-tight text-[color:var(--color-accent)] sm:text-5xl"
				>
					My Designs
				</h1>
				<p class="mt-4 max-w-xl font-body text-base leading-7 text-[color:rgba(47,47,47,0.78)]">
					Explore previous room transformations or create a new design.
				</p>
			</div>

			<button
				type="button"
				class="inline-flex items-center justify-center rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-[color:var(--color-background)] transition hover:bg-[color:var(--color-accent)]/90"
				on:click={() => onNavigate('/projects/new')}
			>
				New Design
			</button>
		</div>

		<div class="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
			<button
				type="button"
				class="group rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--color-background)] p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-[color:var(--color-accent)] hover:shadow-sm"
				on:click={() => onNavigate('/projects/new')}
			>
				<p class="font-mono text-xs uppercase tracking-[0.2em] text-[color:rgba(47,47,47,0.55)]">
					Design New Room
				</p>
				<h2 class="mt-4 font-body text-xl font-semibold text-[color:var(--color-accent)]">
					Create a new room transformation
				</h2>
			</button>

			<button
				type="button"
				class="group rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--color-background)] p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-[color:var(--color-accent)] hover:shadow-sm"
				on:click={() => onNavigate('/projects/examples')}
			>
				<p class="font-mono text-xs uppercase tracking-[0.2em] text-[color:rgba(47,47,47,0.55)]">
					Explore Inspirations
				</p>
				<h2 class="mt-4 font-body text-xl font-semibold text-[color:var(--color-accent)]">
					Browse example transformations
				</h2>
			</button>
		</div>

		<div class="mt-14">
			{#if projects.length > 0}
				<div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
					{#each projects as project}
						<article
							class="group overflow-hidden rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--color-background)] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[color:var(--color-accent)] hover:shadow-md"
						>
							<div class="aspect-[4/3] bg-[color:var(--color-secondary)] re p-4">
								<div class="relative h-full rounded-[1.25rem] bg-red-100 shadow-inner">
									<img
										src={project.original_image_url}
										alt={project.title}
										class="h-full w-full object-cover"
									/>
								</div>
							</div>
							<div class="space-y-2 p-6">
								<div class="flex justify-between">
									<h3 class="font-body text-lg font-semibold text-[color:var(--color-accent)]">
										{project.title}
									</h3>
									<button
										type="button"
										class="text-red-500 hover:text-red-700"
										on:click={() => modalDeleteHandler(project.id)}
									>
										Delete
									</button>
								</div>
								<p class="text-sm text-[color:rgba(47,47,47,0.55)]">{project.date}</p>
								<p class="text-sm text-[color:rgba(47,47,47,0.55)]">{project.type}</p>
							</div>
						</article>
					{/each}
				</div>
			{:else}
				<div
					class="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--color-background)] p-10 text-center"
				>
					<div
						class="mx-auto mb-6 h-48 w-48 rounded-[1.5rem] bg-[color:var(--color-secondary)]"
						aria-label="Empty room illustration"
						role="img"
					></div>
					<h2 class="font-display text-3xl font-semibold text-[color:var(--color-accent)]">
						No Designs Yet
					</h2>
					<p
						class="mt-4 max-w-xl mx-auto font-body text-base leading-7 text-[color:rgba(47,47,47,0.78)]"
					>
						Create your first AI room transformation and start building your dream space.
					</p>
					<button
						type="button"
						class="mt-8 inline-flex items-center justify-center rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-[color:var(--color-background)] transition hover:bg-[color:var(--color-accent)]/90"
						on:click={() => onNavigate('/projects/new')}
					>
						Create First Design
					</button>
				</div>
			{/if}
		</div>
	</div>
</section>
