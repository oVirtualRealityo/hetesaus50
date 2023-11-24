const openCart = document.getElementById("openCart");
const hiddenCart = document.getElementById("hiddenCart");
 /* functie om de shoppingcart open of dicht te doen */
openCart.addEventListener("click", function (e) {
if (hiddenCart.style.display === "none") {
    hiddenCart.style.display = "flex";}
else  {
    hiddenCart.style.display = "none";}
}
);
/* nu deel 2 , de content zoeken en toevoegen doormiddel van js en functies */

/*eerst ga ik een plek maken om mijn items in te zetten, een lijstje */
let cart =[];

/* voor elke button de event listener en variabelen op voorhand laten vastzetten */
const buyButtons = document.querySelectorAll('.buyButton');

/* dit is een manier die ik persoonlijk het overzichtelijkste vind */
/* een functie om door elke button met deze tag te gaan vervolgens op elke button de listener zetten*/
buyButtons.forEach(function(button){
    button.addEventListener("click", function(e){
        /* de productdetails voor elke button oproepen */
        let product = e.target.closest(".product"); /* dit stelt de parent in, zodat de volgende "let's" weten waar ze hun data moeten halen */
        let productName = product.querySelector("h3").textContent; /* de sausnaam uit de html halen */
        let productPrice = parseFloat(product.querySelector('.priceValue').textContent); /* zo hebben we meteen de prijs zonder al teveel gedoe */

        addToCart(productName, productPrice); /* dit voegt het item toe aan het mandje indien nodig */
    });
});

/* vervolgens moet ik de add to cart functie uitbreiden. ik wil een hoeveelheid dat hij weergeeft.
dit kan ik doen door een vaste waarde van 1 te geven. eerst schrijf ik straks een loop die nagaat of het item al in het mandje zit
indien dit het geval is gaat de count ++ indien niet word de eerste count 1
graag zou ik ook willen dat de prijs actueel blijft, dus indien je 2 sauzen koopt gaat de prijs naar 2 flesjes
dit is gemakkelijk met Aantal Items X prijs Item */
function addToCart(name, price) {
    let ItemInCartIndex = -1; // een indexnotatie die ik zo nog nodig heb.

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            ItemInCartIndex = i; 
            break;
        }
    }

    if (ItemInCartIndex !== -1) {
        cart[ItemInCartIndex].quantity++;
        /* als het product al voorkomt doen we er eentje bij */
    }    
    else {
        cart.push({ name: name, price: price , quantity: 1});
        /* product toevoegen met naam prijs en aantal */
    }
    /* onze shopping cart zoeken en het element aanspreken om te inserten */
    
    const myShoppingCart = document.getElementById('myShoppingCart');
    myShoppingCart.innerHTML = '';
    /* toevoegen aan de display door een nieuw element te creeeren */
    cart.forEach(function(item) {
        let newRow = myShoppingCart.insertRow(-1);
        let nameColumn = newRow.insertCell(0);
        let AmountColumn = newRow.insertCell(1);
        let priceColumn = newRow.insertCell(2);
        

        nameColumn.textContent = item.name;
        AmountColumn.textContent = item.quantity;
        priceColumn.textContent = '€' + (item.price * item.quantity).toFixed(2);
        
    });


}

