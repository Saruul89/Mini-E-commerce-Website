const Card = ({ handleSubmit, product }) => {
  return (
    <div>
      <div key={product.id} className="card bg-white shadow-lg">
        <img
          src={product?.pic_url}
          alt={product.name}
          className="h-[300px] w-full rounded-lg object-cover"
        />
        <div className="card-body p-4">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-lg text-gray-700 pb-2">{product.price}$</p>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Add to cart
          </button>
          <button
            className="btn"
            onClick={() =>
              document.getElementById(`modal_${product.id}`).showModal()
            }
          >
            Details
          </button>
          <dialog id={`modal_${product.id}`} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="py-4">{product.introduce}</p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Card;
