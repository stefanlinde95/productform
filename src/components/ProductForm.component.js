import React, { useState, useEffect } from "react";
import Alert from "./Alert.component";
import List from "./List.component";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
function ProductForm() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [cartItem, setCartItem] = useState([]);
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !image) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, image: image, title: name, price: price };
          }
          return item;
        }),
      );
      setImage("");
      setName("");
      setPrice("");
      setEditID(null);
      setIsEditing(false);
    } else {
      showAlert(true, "success", "Item added to the list");
      const newItem = {
        id: new Date().getTime().toString(),
        image: image,
        title: name,
        price: price,
      };

      setList([...list, newItem]);
      setImage("");
      setName("");
      setPrice("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const addToCart = (id) => {
    showAlert(true, "success", "Item added to cart");
    cartItem.push(id);
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "Item removed");
    setList(list.filter((item) => item.id !== id));
    setCartItem(cartItem.filter((item) => item != id));
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-9 col-lg-6 offset-lg-3 my-4">
          <form className="product-form" onSubmit={handleSubmit}>
            {alert.show && (
              <Alert {...alert} removeAlert={showAlert} list={list} />
            )}

            <h2>Add product</h2>
            <div className="form-control text-center">
              <input
                type="url"
                className="product_image d-block my-2 w-100"
                placeholder="Product image (https://)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
              <input
                type="text"
                className="product d-block my-2 w-100"
                placeholder="Product name"
                maxLength="40"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="number"
                className="product_price d-block my-2 w-100"
                placeholder="Product price"
                value={price}
                step="0.01"
                min="0"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <button
                type="submit"
                className="submit-btn my-3 px-4 rounded btn-success"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-sm-12 col-md-3 my-auto">
          <p className="rounded border p-3">
            Products in cart: {cartItem.length}
          </p>
        </div>
      </div>
      <>
        {list.length > 0 && (
          <div className="product-container">
            <List items={list} removeItem={removeItem} addToCart={addToCart} />
          </div>
        )}
      </>
    </div>
  );
}

export default ProductForm;
