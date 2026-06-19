<script>
  import { goto } from "$app/navigation";
  import Dashboard from "$lib/components/Dashboard.svelte";

  const onNavigate = (path) => goto(path);
</script>

<Dashboard {onNavigate} />
