import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import alertify from "alertifyjs";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";
import FormDemo1 from "./FormDemo1";
import FormDemo2 from "./FormDemo2";

export default class App extends Component {
  //Props ile encapsulation props=bir companent'den diğerine taşınan data demektir.
  // bir companent özel bir data tutmak istiyorsak state kullanılmalıdır.
  state = { currentCategory: "", products: [], cart: [] };
  componentDidMount() {
    this.getProduct();
  }
  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProduct(category.id);
  };
  getProduct = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };
  addToCart = (product) => {
    //ürünler için sepet yapıyoruz onclick ile butonda çağırıyoruz
    let newCart = this.state.cart; //yeni bir obje oluşturduk
    var addedItem = newCart.find((c) => c.product.id === product.id); //listede bu ürün varmı kontrol
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 }); //gönderilen elemanı 1 ekledik
    }
    this.setState({ cart: newCart }); //sonra newCart'a set ettik
    alertify.success(product.productName + "  ürün eklendi", 2);
  };
  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.productName + "  ürün silindi", 2);
  };
  render() {
    let productInfo = { title: "ProductList" };
    let categoryInfo = { title: "CategoryList" };
    return (
      <div>
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <ProductList
                      {...props} //kopyalarını al öyle gönder demek
                      products={this.state.products}
                      addToCart={this.addToCart}
                      info={productInfo}
                      currentCategory={this.state.currentCategory}
                    />
                  )}
                />
                <Route
                  exact
                  path="/cart"
                  render={(props) => (
                    <CartList
                      {...props} //kopyalarını al öyle gönder demek
                      cart={this.state.cart}
                      removeFromCart={this.removeFromCart}
                    />
                  )}
                />
                <Route path="/form1" component={FormDemo1}></Route>
                <Route path="/form2" component={FormDemo2}></Route>
                <Route component={NotFound} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
