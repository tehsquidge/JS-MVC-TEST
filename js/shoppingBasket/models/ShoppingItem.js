class ShoppingItem {

    constructor(name, description, price){
        this._name = name;
        this._description = description;
        this._price = price;
    }

    get name(){
        return this._name;
    }

    set name(name){
        this._name = name;
    }

    get description(){
        return this._description;
    }

    set description(description){
        this._description = description;
    }

    get price(){
        return this._price;
    }

    set price(price){
        if(parseFloat(price)){
            this._price = parseFloat(price);
        }
    }

}

export default ShoppingItem;