const CreateProductAdmin = ({
  handleCreateSubmit,
  handleInputChange,
  product,
}) => {
  
  return (
    <div>
      <button
        className="btn w-[300px] h-[30px] bg-green-500"
        onClick={() => document.getElementById("my_modal_create").showModal()}
      >
        Create product
      </button>
      <dialog id="my_modal_create" className="modal">
        <div className="modal-box">
          <div className="flex flex-col gap-3 mt-4">
            <input
              name="name"
              onChange={handleInputChange}
              type="text"
              placeholder="Name"
              className="w-full input input-bordered"
              value={product?.name || ""}
            />
            <input
              name="introduce"
              onChange={handleInputChange}
              type="text"
              placeholder="Introduce"
              className="w-full input input-bordered"
              value={product?.introduce || ""}
            />
            <input
              name="price"
              onChange={handleInputChange}
              type="text"
              placeholder="Price"
              className="w-full input input-bordered"
              value={product?.price || ""}
            />
            <input
              name="pic_url"
              onChange={handleInputChange}
              type="text"
              placeholder="Picture URL"
              className="w-full input input-bordered"
              value={product?.pic_url || ""}
            />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={handleCreateSubmit}>
                Submit
              </button>
              <button className="btn ml-2">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CreateProductAdmin;
