<p>My new project list component!</p>
<script>
import { getData } from "../productData.mjs";

// this is how we make a prop in svelte
let {category} = $props();
// if you are looking at this thinking that's strange to just stop with a promise
// you would be right.  This will make more sense in a bit...stay tuned.
let promise = getData(category);
</script>

<h2>Top products: {category}</h2>
<ul class="product-list">

<li class="product-card">
    <a href="product_pages/index.html?product=880RR">
        <img
        src="images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg"
        alt="Marmot Ajax tent"/>
        <h3 class="card__brand">Marmot</h3>
        <h2 class="card__name">Ajax Tent - 3-Person, 3-Season</h2>
        <p class="product-card__price">$199.99</p></a>
    
    </li>
    
    
    
</ul>