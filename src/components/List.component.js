import React from "react";
const List = ({ items, removeItem, addToCart }) => {
  return (
    <div className="row product-list my-4">
      {items.map((item) => {
        const { id, image, title, price } = item;
        return (
          <div key={id} className="col-sm-12 col-md-6 col-lg-3 mb-4">
            <article className="card product-item shadow">
              <a
                href="#"
                className="delete-btn position-absolute"
                onClick={() => removeItem(id)}
              >
                X
              </a>
              <img
                className="card-img-top"
                src={image}
                alt={title}
                width="100%"
                height={200}
              />
              <div className="card-body text-center mb-3">
                <h2 className="card-title h5">{title}</h2>
                <p className="price">{price} €</p>
                <a
                  href="#"
                  className="btn-primary add-to-cart px-4 pb-2 pt-1 rounded"
                  onClick={() => addToCart(id)}
                >
                  Add to cart
                </a>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
};

export default List;
