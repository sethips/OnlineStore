import * as DataBaseHandler from './DataBaseHandler';
import * as Ui_Updater from './UI-Updater';
import * as DomModules from './DomModules';
const DomElements = DomModules.DOMElements;

DomElements.featuredProducts.addEventListener('click', (e) => {
  const clickedProduct = DataBaseHandler.getProduct(e.target.textContent);

  Ui_Updater.displayProduct(clickedProduct);
});
