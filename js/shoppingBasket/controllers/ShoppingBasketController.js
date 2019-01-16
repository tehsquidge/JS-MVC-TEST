import Events from '../../util/Events.js';

import ShoppingItem from '../models/ShoppingItem.js';

class ShoppingBasketController {

    constructor(opts){
        this._items = [];
        this._basket = [];

        Events.subscribe('/ShoppingBasket/addItemToBasket',function(params){
            this.addItemToBasket(params.item, params.count)
        }.bind(this));

        Events.subscribe('/ShoppingBasket/removeItemFromBasket',function(params){
            this.removeItemFromBasket(params.item, params.count)
        }.bind(this));

    }

    get items(){
        return this._items;
    }

    get basket(){
        const basket = {};
        const basketItems = [];
        let total = 0.0;
        let count = 0;
        this._basket.forEach(function(val, idx) {
            basketItems.push(
                {
                    'idx': idx,
                    'item': this._items[idx],
                    'count': val
                }
            )
            count += val;
            total += parseFloat(this._items[idx].price * val);
        }.bind(this));
        basket.items = basketItems;
        basket.count = count;
        basket.total = parseFloat(total);
        return basket;
    }

    addShoppingItem(item,addToBasket = false){
        if(item instanceof ShoppingItem){
            if( this._items.indexOf(item) === -1 ){
                const idx = this._items.push(item) -1;
                if(addToBasket){
                    this.addItemToBasket(idx);
                }
                Events.publish('/ShoppingBasket/ShoppingItemAdded',{
                    'idx': idx,
                    'items': this.items
                });
                return true;
            }
        }
        return false;
    }

    removeShoppingItem(item){
        const idx = this._getItemIndex(item);
        if(idx !== -1){
            this.removeItemsFromBasket(idx);
            this._items.splice(idx,1);
            Events.publish('/ShoppingBasket/ShoppingItemRemoved',{
                'idx': idx,
                'items': this.items
            });
            return true;
        }
        
        return false;
    }

    getItemBasketCount(item){
        const idx = this._getItemIndex(item);
        if(this._basket[idx] !== void 0){
            return this._basket[idx];
        }else{
            return 0;
        }
    }

    addItemToBasket(item, count = 1){
        this.updateItemInBasket(item, this.getItemBasketCount(item) + parseInt(count));
        Events.publish('/ShoppingBasket/itemAddedToBasket',this.basket);
    }

    removeItemFromBasket(item, count = 1){
        this.updateItemInBasket(item, this.getItemBasketCount(item) - parseInt(count));
        Events.publish('/ShoppingBasket/itemRemovedFromBasket',this.basket);
    }

    removeItemsFromBasket(item){
        this.updateItemInBasket(item, 0);
        Events.publish('/ShoppingBasket/itemRemovedFromBasket',this.basket);

    }

    updateItemInBasket(item, count){
        if(isNaN(parseInt(count))){
            return false;
        }else{
            count = parseInt(count);
        }
        const idx = this._getItemIndex(item);

        if(idx < 0){
            return false;
        }
        
        if(count > 0)
            this._basket[idx] = count;
        else
            delete this._basket[idx];
        return true;
    }

    _getItemIndex(item){
        var idx = 0;
        if(item instanceof ShoppingItem){
            idx = this._items.indexOf(item);
        }else if( !isNaN(parseInt(item)) && item >= 0 && item < this._items.length ){
            idx = parseInt(item);
        }else{
            return -1;
        }
        return idx;
    }

}

export default ShoppingBasketController;