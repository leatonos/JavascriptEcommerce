$(document).ready(function(){


    //Checking if you already have a cart

    var MycartList;

    const LocalCart = localStorage.getItem("cart");
    if(LocalCart == null || LocalCart == ""){
        MycartList = [];
    }else{
        MycartList = JSON.parse(LocalCart);
    }

    //Some logs for testing
    console.log("Welcome to our Store!")
    console.log("This is your Cart:")
    //console.log(MycartList)

   

    const cartBtn = ".addtocart.btn.btn-outline-success.mx-auto.d-block"


    // This is the add to cart function
    $(document).on("click", cartBtn ,function(){
       let price = $(this).attr("pp")
       let name = $(this).attr("pn")
       let id = $(this).attr("pid")

       //Checking if you already have this item on your cart
        if(typeof(checkFor(id)) != "number"){
            //You dont have this Item yet
            let newItem = {id,name,price,quantity:1}
            MycartList.push(newItem);
        }else{
            //You have this Item
            MycartList[checkFor(id)].quantity += 1;
        }

       console.log(MycartList)

       //Saving Your cartlist into your InternalStorage

       localStorage.setItem("cart", JSON.stringify(MycartList));

    });


    //This function prevents the cart of having the same item Twice
    function checkFor(ItemId){
        for(i=0;i<MycartList.length;i++){
            if(MycartList[i].id == ItemId){
                return i;
                break;
            }
        }
    }


    let itemnum = 1;
    //Loads your cart table
    MycartList.forEach(item => {
        //console.log(item)
        
        $(".cart-table").append("<tr>")
        $(".cart-table").append("<th scope='row'>"+itemnum+"</th>")
        $(".cart-table").append("<td>"+item.id+"</td>")
        $(".cart-table").append("<td>"+item.name+"</td>")
        $(".cart-table").append("<td>"+item.price+"</td>")
        $(".cart-table").append("<td>"+item.quantity+"</td>")
        $(".cart-table").append("</tr>")

        itemnum++;
    });
    //$(".cart-table").append();

    
    

});

//Function created just for testing
function cleanCart(){
    MycartList = [];
    localStorage.setItem("cart", MycartList);
    console.log("Cart Cleared please refresh your page")
}