import React, { Fragment } from "react";
import "./Cart.scss";
import { DropDownList } from "@progress/kendo-react-dropdowns";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  count = [1, 2, 3, 4, 5];

  render() {
    const { removeFromCart, changeQty } = this.props;
    return (
      <Fragment>
        <div>
          {this.props.list &&
            this.props.list.map((value) => {
              return (
                <Fragment>
                  <div className="card">
                    <div className="row">
                      <div className="col-1">
                        <img src={value.imageURL} className="card-img" />
                      </div>
                      <div className="col-7 text-left">
                        <div className="card-body">
                          <h5 className="card-title">
                            {value.brand}
                            {"-"} {value.caption}
                          </h5>
                          <p className="card-text">
                            <small className="text-muted">
                              {value.currency} {value.price}
                            </small>
                          </p>
                        </div>
                      </div>
                      <div className="col-3 align-content-left dd-container">
                        <DropDownList
                          data={this.count}
                          name={"qty"}
                          className="qty-dropdown"
                          value={value.quantity}
                          onChange={(event) => {
                            changeQty(value, event.target.value);
                          }}
                        />{" "}
                      </div>
                      <div
                        className="remove-item"
                        style={{ alignSelf: "center" }}
                      >
                        <i
                          class="fas fa-times"
                          style={{ fontSize: "30px", cursor: "pointer" }}
                          onClick={() => {
                            removeFromCart(value);
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </Fragment>
              );
            })}
        </div>
      </Fragment>
    );
  }
}

export default Cart;
