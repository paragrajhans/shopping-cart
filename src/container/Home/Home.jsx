import React from "react";
import "./Home.scss";
import Header from "../../components/Header/Header";
import Logo from "../../components/Logo/Logo";
import Item from "../../components/Item/Item";
import Data from "../../../src/data/ListJSONTest.json";
import EmptyCart from "../../data/no_items_found.jpg";
import Cart from "../../components/Cart/Cart";
import { Dialog } from "@progress/kendo-react-dialogs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import Footer from "../../components/Footer/Footer";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUrl:
        "https://embed-ssl.wistia.com/deliveries/337960c0c1d06ab4c88ef95f6bd28b38548ba585.bin",
      data: [],
      cart: [],
      scroll: false,
      openDialog: false,
      showCart: false,
      itemAdded: false,
      totalPrice: 0,
      covid: true,
    };
  }

  sortBy = [
    "Availability",
    "Brand : A to Z",
    "Brand : Z to A",
    "Price : High to Low",
    "Price : Low to High",
    "Stock :  High to Low",
    "Stock :  Low to High",
    "Title",
  ];

  componentDidMount() {
    this.call();
    this.setState({ data: Data.List });
    window.addEventListener("scroll", this.listenScrollEvent);
  }

  call() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  onChange = (event) => {
    if (event.target.value === "Availability") {
      let tempAvailability = this.state.data.sort((a, b) => {
        return a.isAvailable - b.isAvailable;
      });
      this.setState({
        [this.state.data]: tempAvailability,
      });
    }
    if (event.target.value === "Brand : A to Z") {
      let tempBrand = this.state.data.sort((a, b) => {
        let aName = a.brand.toLowerCase();
        let bName = b.brand.toLowerCase();
        if (aName < bName) {
          return -1;
        }
        if (aName > bName) {
          return 1;
        }
      });
      this.setState({
        [this.state.data]: tempBrand,
      });
    }
    if (event.target.value === "Brand : Z to A") {
      let tempBrand = this.state.data.sort((a, b) => {
        let aName = a.brand.toLowerCase();
        let bName = b.brand.toLowerCase();
        if (aName > bName) {
          return -1;
        }
        if (aName < bName) {
          return 1;
        }
      });

      this.setState({
        [this.state.data]: tempBrand,
      });
    }
    if (event.target.value === "Price : High to Low") {
      let tempPrice = this.state.data.sort((a, b) => {
        return b.price - a.price;
      });
      this.setState({
        [this.state.data]: tempPrice,
      });
    }
    if (event.target.value === "Price : Low to High") {
      let tempPrice = this.state.data.sort((a, b) => {
        return a.price - b.price;
      });
      this.setState({
        [this.state.data]: tempPrice,
      });
    }

    if (event.target.value === "Stock :  High to Low") {
      let tempStock = this.state.data.sort((a, b) => {
        return b.displayOrder - a.displayOrder;
      });
      this.setState({
        [this.state.data]: tempStock,
      });
    }
    if (event.target.value === "Stock :  Low to High") {
      let tempStock = this.state.data.sort((a, b) => {
        return a.displayOrder - b.displayOrder;
      });
      this.setState({
        [this.state.data]: tempStock,
      });
    }

    if (event.target.value === "Title") {
      let tempCaption = this.state.data.sort((a, b) => {
        let aCaption = a.caption.toLowerCase();
        let bCaption = b.caption.toLowerCase();
        if (aCaption < bCaption) {
          return -1;
        }
        if (aCaption > bCaption) {
          return 1;
        }
      });
      this.setState({
        [this.state.data]: tempCaption,
      });
    }
  };

  toggleDialog = () => {
    this.setState({
      openDialog: !this.state.openDialog,
    });
  };

  listenScrollEvent = (event) => {
    if (window.scrollY > 300) {
      this.setState({ scroll: true });
    } else {
      this.setState({ scroll: false });
    }
  };

  removeFromCart = (item) => {
    let itemIndex = this.getItemIndexInCart(item);
    if (itemIndex === -1) {
      console.error("Item not found in cart.");
      return;
    }
    let items = this.state.cart;
    let deletedItem = items.splice(itemIndex, 1);
    this.setState({
      cart: items,
      totalPrice: this.getTotalPrice(),
    });
  };

  viewCart = () => {
    this.setState({
      showCart: true,
    });
  };

  onClickShop = () => {
    let a = document.getElementById("shop");
    a.scrollIntoView({ behavior: "smooth" });
  };

  onClickCart = () => {
    let a = document.getElementById("cart");
    a.scrollIntoView({ behavior: "smooth" });
  };

  onClickHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  getItemIndexInProductList = (dataItem) => {
    let items = this.state.data;

    for (let idx = 0; idx < items.length; idx++) {
      if (items[idx].prodId === dataItem.prodId) {
        return idx;
      } else {
        continue;
      }
    }
    return -1;
  };

  getItemIndexInCart = (dataItem) => {
    let items = this.state.cart;

    for (let idx = 0; idx < items.length; idx++) {
      if (items[idx].prodId === dataItem.prodId) {
        return idx;
      } else {
        continue;
      }
    }
    return -1;
  };

  getTotalPrice = () => {
    let price = 0;
    let items = this.state.cart;

    for (let idx = 0; idx < items.length; idx++) {
      price += items[idx].quantity * items[idx].price;
    }
    return price;
  };

  changeQty = (dataItem, selectedQuantity) => {
    let updatedCart = this.state.cart;
    let itemIndexInCart = this.getItemIndexInCart(dataItem);
    updatedCart[itemIndexInCart].quantity = selectedQuantity;
    this.setState({
      cart: updatedCart,
      totalPrice: this.getTotalPrice(),
      itemAdded: true,
    });
    setTimeout(() => {
      this.setState({ itemAdded: false });
    }, 3000);
  };

  addToCart = (dataItem) => {
    if (dataItem.displayOrder >= 1) {
      console.log(dataItem);

      let updatedCart = this.state.cart;
      let itemIndexInCart = this.getItemIndexInCart(dataItem);

      if (itemIndexInCart !== -1) {
        updatedCart[itemIndexInCart].quantity += 1;
        if (
          updatedCart[itemIndexInCart].quantity >
          updatedCart[itemIndexInCart].maxOrderQuantity
        ) {
          console.error("No product left to add");
          return;
        }
      } else {
        console.log("something matched 2");
        let itemCopy = JSON.parse(JSON.stringify(dataItem));
        itemCopy.quantity = 1;
        updatedCart.push(itemCopy);
      }

      this.setState({
        cart: updatedCart,
        itemAdded: true,
        totalPrice: this.getTotalPrice(),
      });
      setTimeout(() => {
        this.setState({ itemAdded: false });
      }, 3000);
    }
  };

  showDetails = (dataItem) => {
    this.setState({
      ...this.state,
      tempItem: dataItem,
      openDialog: true,
    });
  };

  onCloseCovid = () => {
    this.setState({
      covid: !this.state.covid,
    });
  };

  render() {
    return (
      <div className="content-wrapper">
        {this.state.openDialog && !this.state.shortCutAdd && (
          <Dialog
            title={
              this.state.tempItem.displayOrder > 0 ? (
                "Item Details"
              ) : (
                <span>
                  Item Details -{" "}
                  <span className="out-of-stock">Out of Stock</span>{" "}
                </span>
              )
            }
            onClose={this.toggleDialog}
            width="60%"
            height="49%"
          >
            <div className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-2" style={{ marginTop: "3%" }}>
                  <img
                    src={this.state.tempItem.imageURL}
                    className="card-img"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      {this.state.tempItem.caption}
                    </h5>
                    <p className="card-text">
                      {this.state.tempItem.description}
                    </p>
                    <p className="card-text">
                      <a href={this.state.tempItem.productUrl} target="_blank">
                        Navigate to Product
                      </a>
                    </p>

                    <p className="card-text">
                      <small className="text-muted">
                        {this.state.tempItem.currency}{" "}
                        {this.state.tempItem.price}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
        )}

        {this.state.covid && (
          <Dialog
            className="dialogHeader"
            title={"Shopazon"}
            onClose={this.onCloseCovid}
            style={{ border: "1px solid purple" }}
            width="300px"
            height="400px"
            style={{ color: "red" }}
          >
            <div className="content">
              Please be aware that all orders received in these days, will be
              shipped after COVID-19 emergency.
            </div>
            <div className="thanks">Thanks!</div>
            <div className="icon-container">
              <i className="far fa-thumbs-up"></i>
            </div>
          </Dialog>
        )}
        {this.state.itemAdded && <div className="item-added">Item Added</div>}
        <video
          loop
          autoPlay
          style={{
            width: "100%",
            height: "auto",
          }}
        >
          <source src={this.state.videoUrl} type="video/mp4" />
        </video>
        <Header
          onClickShop={this.onClickShop}
          onClickHome={this.onClickHome}
          itemInCart={this.state.cart}
          totalPrice={this.state.totalPrice}
          scrollEvent={this.state.scroll}
          onClickCart={this.onClickCart}
        />

        <Logo />
        <div style={{ height: "80px" }} id="shop"></div>
        <div
          className="row justify-content-center"
          style={{ marginTop: "20px" }}
        >
          <p style={{ marginRight: "5px", fontSize: "18px" }}>Sort By :</p>
          <DropDownList
            className="sort-by"
            data={this.sortBy}
            onChange={this.onChange}
            style={{
              border: "1px solid gray",
              borderRadius: "4px",
            }}
          />
        </div>

        <div className="item-wrapper">
          {this.state.data.map((value) => {
            return (
              <Item
                leg={value}
                addToCart={this.addToCart}
                showDetails={this.showDetails}
                changeQty={this.changeQty}
              />
            );
          })}
        </div>
        <div style={{ height: "80px" }} id="cart"></div>
        <div
          className="cart-container"
          style={{
            textAlign: "center",
          }}
        >
          {this.state.cart.length ? (
            <>
              <h2 style={{ textAlign: "left", marginLeft: "1%" }}>Cart</h2>
              <div className="scrollable-container">
                <Cart
                  list={this.state.cart}
                  removeFromCart={this.removeFromCart}
                  changeQty={this.changeQty}
                />

                <div className="total-amount d-flex justify-content-end">
                  <button type="button" class="btn btn-primary checkout-btn">
                    <span>
                      Total : {this.state.cart[0].currency}{" "}
                      {this.state.totalPrice.toFixed(2)} {"(plus tax)"}
                    </span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div id="cart" className="empty-cart-container">
              <img
                className="empty-cart"
                src={EmptyCart}
                style={{ marginTop: "15px" }}
              />
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
