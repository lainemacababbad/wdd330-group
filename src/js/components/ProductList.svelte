<script>
  import { getData } from "../productData.mjs";
  import ProductSummary from "./ProductSummary.svelte";

  export let category;

  let promise = getData(category);

  function filterProducts(products) {
    return products.slice(0, 4);
  }
</script>

<!-- Render the heading dynamically within the component -->
<h2>Top Products</h2> <!-- This is dynamic -->

{#await promise}
  <p>Loading...</p>
{:then data}
  <ul class="product-list">
    {#each filterProducts(data) as product}
      <li class="product-card"><ProductSummary {product} /></li>
    {/each}
  </ul>
{/await}