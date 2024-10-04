import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { Store } from '../../models/store';
import { ICategory } from '../../models/ICategory';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})



export class ProductsComponent implements OnInit {
  store: Store = new Store(
    'Furniture',
    ['15th', 'cairo', 'abdeen'],
    'https://naldzgraphics.net/wp-content/uploads/2012/01/14-furnituretown.jpg'
  );

  showOrHideImg: boolean = true;
  clientName: string = 'MR.Beans';
  isPurchased: boolean = false;

  productList: IProduct[];
  afterFilter: IProduct[] = [];
  prodQuant: number = 0;
  

  dropdownCategories: ICategory[] = [
    { id: 1, name: 'Tables' },
    { id: 2, name: 'Chairs' },
    { id: 3, name: 'TV Units' },
  ];

  // intializing the constructor to populate product list with data
  constructor() {
    this.productList = [
      {
        id: 1,
        name: 'Odense 8-Seater Top Dining Table',
        price: 21500,
        quantity: 0,
        PrdimgURL:
          'https://media.homecentre.com/i/homecentre/163650487-163650487-HC18082021_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$',
        categoryID: 1,
        Material: 'Engineered Wood',
      },
      {
        id: 5,
        name: 'Trixia 4-Seater Glass Top Dining Table',
        price: 30000,
        quantity: 1,
        PrdimgURL:
          'https://media.homecentre.com/i/homecentre/163645951-163645951-HC07102021_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$',
        categoryID: 1,
        Material: 'Metal',
      },
      {
        id: 25,
        name: 'Gasha Marble Top Side Table',
        price: 14000,
        quantity: 10,
        PrdimgURL:
          'https://media.homecentre.com/i/homecentre/160079085-160079085-HC020518_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$',
        categoryID: 1,
        Material: 'Metal',
      },
      {
        id: 7,
        name: 'Ventura Fabric Dining Chair',
        price: 1500,
        quantity: 2,
        PrdimgURL:
          'https://media.homecentre.com/i/homecentre/161257427-161257427-HC280119_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$',
        categoryID: 2,
        Material: 'Upholstered Seating',
      },
      {
        id: 17,
        name: 'Ventura Fabric Dining Chair',
        price: 1500,
        quantity: 2,
        PrdimgURL:
          'https://media.homecentre.com/i/homecentre/162640761-162640761-HC23092020_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$',
        categoryID: 2,
        Material: 'Upholstered Seating',
      },
      {
        id: 9,
        name: 'Boston Study Chair',
        price: 1000,
        quantity: 10,
        PrdimgURL:
          'https://media.homecentre.com/i/homecentre/159671547-159671547-HCB1226OCT17_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$',
        categoryID: 2,
        Material: 'Upholstered Seating',
      },
      {
        id: 10,
        name: 'Coby Extendable TV Unit',
        price: 13000,
        quantity: 0,
        PrdimgURL:
          'https://media.homecentre.com/i/homecentre/163723189-163568026-HC16082021_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$',
        categoryID: 3,
        Material: 'Wood',
      },
      {
        id: 15,
        name: 'Accent TV Unit',
        price: 36999,
        quantity: 4,
        PrdimgURL:
          'https://media.homecentre.com/i/homecentre/161684469-161684469-HC210519_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$',
        categoryID: 3,
        Material: 'MDF',
      },
      {
        id: 55,
        name: 'Plymouth TV Unit',
        price: 36999,
        quantity: 3,
        PrdimgURL:
          'https://media.homecentre.com/i/homecentre/163688823-163688823-HC05102021_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$',
        categoryID: 3,
        Material: 'wood',
      },
    ];
  }

  // filter by category in dropdown
  // filterByCategory(categoryId: number): void {
  //   this.afterFilter = this.productList.filter(
  //     (prod: IProduct) => prod.categoryID === categoryId
  //   );
  // }

  filterByCategory(categoryId: number): void {
    if (categoryId === 0) {
      this.afterFilter = [...this.productList];
    } else {
      this.afterFilter = this.productList.filter(
        (prod: IProduct) => prod.categoryID === categoryId
      );
    }
  }

  // setting that value i get in input from user
  set filterByName(value: string) {
    this.afterFilter = this.applySearchFilter(value);
  }

  // product filteration function
  applySearchFilter(filterValue: string): IProduct[] {
    filterValue = filterValue.toLowerCase();
    return this.productList.filter((prod: IProduct) =>
      prod.name.toLowerCase().includes(filterValue)
    );
  }

  // intialize products
  ngOnInit(): void {
    this.afterFilter = Array.from(this.productList);
  }

  toggleProductImg() {
    this.showOrHideImg =! this.showOrHideImg;
  }

  toggleIsPurchased() {
    this.isPurchased =!this.isPurchased;
  }

  addTOCart(productId: number) {
    const product = this.productList.find(prod => prod.id === productId);
    if (product) {
      product.isPurchased = true; 
      this.decQuant(productId); 

      if (product.quantity === 0) {
        this.afterFilter = this.afterFilter.filter(p => p.id !== productId);
      }
    }
  }

  decQuant(productId: number) {
    const product = this.productList.find(prod => prod.id === productId);
    if (product && product.quantity > 0) {
      product.quantity -= 1;
    }
  }





showBackProd(productId:number){
  const product = this.productList.find(prod => prod.id === productId);
    if (product) {
      product.isPurchased = false;

      if (!this.afterFilter.find(p => p.id === productId)) {
        this.afterFilter.push(product);
      }

    }
  }

  


}
