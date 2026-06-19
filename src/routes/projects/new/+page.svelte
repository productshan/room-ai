<script>
  import { goto } from "$app/navigation";
  import CreateNewDesign from "$lib/components/CreateNewDesign.svelte";

  const onNavigate = (path) => goto(path);
</script>

<CreateNewDesign {onNavigate} />
