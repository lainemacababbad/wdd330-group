<script>
import { onMount } from "svelte";

let alerts = [];
onMount(async () => {
    const response = await fetch("/json/alerts.json");
    const data = await response.json();
    alerts = data;
    });

</script>