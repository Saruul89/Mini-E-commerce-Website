const Card = () => {
  return (
    <div className="w-full">
      <div className="container m-auto mt-[70px]">
        <div className="card bg-base-100 w-96 shadow-xl">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Shoes!</h2>
            <p className="pb-2">price</p>
            <div className="card-actions justify-end flex gap-6">
              <button className="btn btn-primary">View details</button>
              <button className="btn btn-primary">Add cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
