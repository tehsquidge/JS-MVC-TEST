import Events from '../../util/Events.js';

class ShoppingBasketMainView {

    constructor(id){
        this._viewport = document.getElementById(id);
        Events.subscribe('/ShoppingBasket/itemAddedToBasket',function(basket){
            this.render(basket);
        }.bind(this));
        Events.subscribe('/ShoppingBasket/itemRemovedfromBasket',function(basket){
            this.render(basket);
        }.bind(this));
        this.render();
    }

    render(basket = {'count': 0, 'items': [], 'total': 0.0 }){
        var output = `<h2>Basket (${basket.count})</h2><table>`;
        output += "<tr><th>Item</th><th>Count</th><th>Price</th><th></th></tr>";


        basket.items.forEach( (row) => {
            output += 
                `<tr><td>${row.item.name}</td><td>${row.count}</td><td>£${parseFloat(row.item.price * row.count).toFixed(2)}</td><td><button class="decrement" data-idx="${row.idx}" value="1"> - </button><button class="increment" data-idx="${row.idx}" value="1"> + </button></td></tr>`;
        });
        output += "</table>";
        output += `<p><strong>Total:</strong>£${ basket.total.toFixed(2) }</p>`;

        this._viewport.innerHTML = output;

        this._viewport.querySelectorAll('button.decrement').forEach( button => {
            button.onclick = function(){
                Events.publish('/ShoppingBasket/removeItemFromBasket',{ 'item': this.dataset.idx, 'count': this.value });
            }
        });
        this._viewport.querySelectorAll('button.increment').forEach( button => {
            button.onclick = function(){
                Events.publish('/ShoppingBasket/addItemToBasket',{ 'item': this.dataset.idx, 'count': this.value });
            }
        });
    }

}

export default ShoppingBasketMainView;