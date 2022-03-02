import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
//rcc yazarak otomatik oluşturuyoruz
export default class Category extends Component {
  state = {
    categories: [],
  }; // json-server --watch db.json başlatma
  //komponent yerleşti kategorileri doldur diyoruz
  componentDidMount() {
    this.getCategories();
  }
  //apiye ulaştığımız kod
  getCategories = () => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => this.setState({ categories: data }));
  };
  render() {
    //yukarıda oluşturduğumuz state ile çekiyoruz bu alana özel veri
    return (
      <div>
        <h3>{this.props.info.title}</h3>
        <ListGroup>
          {this.state.categories.map((category) => (
            <ListGroupItem active={category.categoryName===this.props.currentCategory?true:false} //üstüne gelince renk değiştirmesi mouse
              onClick={() => this.props.changeCategory(category)}
              key={category.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}
