import ShoppingBasketController from './shoppingBasket/controllers/ShoppingBasketController.js';
import ShoppingItem from './shoppingBasket/models/ShoppingItem.js';

import ShoppingItemsMainView from './shoppingBasket/views/ShoppingItemsMainView.js';
import ShoppingBasketMainView from './shoppingBasket/views/ShoppingBasketMainView.js';

document.shoppingBasket = new ShoppingBasketController();

const shoppingItemsView = new ShoppingItemsMainView('shopping-items-view');
const shoppingBasketView = new ShoppingBasketMainView('shopping-basket-view');

document.shoppingBasket.addShoppingItem(new ShoppingItem('Edible Cereal','tolerate your morning with 100% edible cereal.',2.50),true);
document.shoppingBasket.addShoppingItem(new ShoppingItem('Bendy Banana','It\'s a bendy banana which the EU doesn\'t want you to have!',0.15));
document.shoppingBasket.addShoppingItem(new ShoppingItem('Chicken in Can','The All American delicacy you love.',1.50));
document.shoppingBasket.addShoppingItem(new ShoppingItem('British Whisky','Whisky from North Britain.',19.99));
