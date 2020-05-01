import React, { Fragment } from "react";
import "./Item.scss";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (event) => {
    this.setState(
      {
        value: event.target.value,
      },
      () => {
        this.props.changeQty(this.state.value);
      }
    );
  };

  render() {
    const { addToCart, showDetails } = this.props;
    return (
      <Fragment>
        <div className="item">
          <div className="item-image">
            <img
              src={this.props.leg.imageURL}
              onClick={() => {
                showDetails(this.props.leg);
              }}
            />
          </div>
          <h5 className="item-brand">{this.props.leg.brand}</h5>
          <h5 className="item-name">{this.props.leg.caption}</h5>
          <p className="item-price">
            {this.props.leg.currency}
            {this.props.leg.price}
          </p>
          <p>
            {this.props.leg.isAvailable ? (
              this.props.leg.displayOrder <= 5 ? (
                <span className="less-stock" style={{ color: "orange" }}>
                  (Only {this.props.leg.displayOrder} left in stock)
                </span>
              ) : (
                <span style={{ color: "green" }}>(Surplus)</span>
              )
            ) : (
              <span className="empty-stock" style={{ color: "red" }}>
                Out of stock
              </span>
            )}
          </p>
          <div className="item-action">
            {this.props.leg.displayOrder > 0 ? (
              <button
                className="btn btn-success"
                onClick={() => {
                  addToCart(this.props.leg);
                }}
              >
                Add to Cart
              </button>
            ) : (
              <button className="btn btn-light">Add to Cart</button>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Item;
