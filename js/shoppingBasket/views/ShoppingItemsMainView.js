import Events from '../../util/Events.js';

class ShoppingItemsMainView {

    constructor(id){
        this._viewport = document.getElementById(id);
        Events.subscribe('/ShoppingBasket/ShoppingItemAdded',function(params){
            this.render(params.items);
        }.bind(this));
        Events.subscribe('/ShoppingBasket/ShoppingItemRemoved',function(params){
            this.render(params.items);
        }.bind(this));
    }

    render(shoppingItems){
        this._viewport.innerHTML = "<h1>Products</h1>";
        shoppingItems.forEach( (item, idx) => {
            this._viewport.innerHTML += 
                `<div>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p><strong>price: </strong> £${item.price}</p>
                    <button value="${idx}">Add Item to Basket</button>
                </div>`;
        });
        this._viewport.querySelectorAll('button').forEach( button => {
            button.onclick = function(){
                Events.publish('/ShoppingBasket/addItemToBasket',{ 'item': this.value });
            }
        });
    }

}

export default ShoppingItemsMainView;