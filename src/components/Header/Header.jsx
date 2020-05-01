import React from "react";
import "./Header.scss";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
    };
  }

  getTotalQuantity = (items) => {
    let quantity = 0;
    for (let idx = 0; idx < items.length; idx++) {
      quantity += items[idx].quantity;
    }
    return quantity;
  };

  render() {
    const { onClickShop, onClickHome, onClickCart } = this.props;
    return (
      <header>
        {this.props.scrollEvent ? (
          <div className="scroll-header-container justify-content-center">
            <div
              className="home"
              onClick={() => {
                onClickHome();
              }}
            >
              Home
            </div>
            <div
              className="shop"
              onClick={() => {
                onClickShop();
              }}
            >
              Shop
            </div>

            <div className="cart">
              <i
                className="fas fa-cart-plus"
                style={{ fontSize: "20px" }}
                onClick={() => {
                  onClickCart();
                }}
              ></i>
            </div>
            <div className="d-flex cart-count">
              <p>
                Count :{" "}
                {this.props.itemInCart
                  ? this.props.itemInCart.length
                    ? this.getTotalQuantity(this.props.itemInCart)
                    : 0
                  : ""}{" "}
              </p>
            </div>
            <div className="cart-total">
              <p>
                Total :{" "}
                {this.props.itemInCart.length
                  ? this.props.itemInCart[0].currency
                  : ""}{" "}
                {this.props.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        ) : (
          <div className="header-container justify-content-center">
            <div
              className="home"
              onClick={() => {
                onClickHome();
              }}
            >
              Home
            </div>
            <div
              className="shop"
              onClick={() => {
                onClickShop();
              }}
            >
              Shop
            </div>

            <div className="cart">
              <i
                className="fas fa-cart-plus"
                style={{ fontSize: "20px" }}
                onClick={() => {
                  onClickCart();
                }}
              ></i>
            </div>
            <div className="d-flex cart-count">
              <p>
                Count :{" "}
                {this.props.itemInCart
                  ? this.props.itemInCart.length
                    ? this.getTotalQuantity(this.props.itemInCart)
                    : 0
                  : ""}
              </p>
            </div>
            <div className="cart-total">
              <p>
                Total :{" "}
                {this.props.itemInCart.length
                  ? this.props.itemInCart[0].currency
                  : ""}
                {this.props.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
