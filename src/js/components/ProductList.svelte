<script>
  import { getData } from "../productData.mjs";
  import ProductSummary from "./ProductSummary.svelte";

  // this is how we make a prop in Svelte
  // let { category } = $props();
  export let category;

  // if you are looking at this thinking that's strange to just stop with a promise
  // you would be right. This will make more sense in a bit...stay tuned.
  let promise = getData(category);

  // Function to filter only the four tents we need
  function filterProducts(products) {
    return products.slice(0, 4); // Shows the first 4 items
  }

</script>

<h2>Top Products</h2>
{#await promise}
  <p>Loading</p>
{:then data}
  <ul class="product-list">
    {#each filterProducts(data) as product}
      <li class="product-card"><ProductSummary {product} /></li>
    {/each}
  </ul>
{/await}