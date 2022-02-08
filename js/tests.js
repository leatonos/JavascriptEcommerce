$(document).ready(function(){

    const productModel = '<div class="col-sm-4 col-6 p-3 product-item"> <a href="product-page.html"> <img src="https://via.placeholder.com/550x450/" class="mx-auto d-block" style="width:75%"> <h3>Product Name</h3> <p>Price</p> </a> <button type="button" class="btn btn-outline-success mx-auto d-block">Add to Cart</button> </div>'


    function loadProducts(){
        for(i=0;i<14;i++){
            $(".row").append(productModel);
        }
    }

    loadProducts();


});

