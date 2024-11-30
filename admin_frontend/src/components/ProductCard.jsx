const ProductCard = ({ product, handleDelete }) => {
  console.log(product);
  return (
    <div
      key={product.id}
      className="border border-gray-300 rounded-lg p-4 shadow-lg flex flex-col"
    >
      <img
        src={product.img}
        alt={product.name}
        className="h-48 w-full object-cover rounded-md mb-4"
      />
      <h4 className="text-lg font-bold mb-2">{product.name}</h4>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <div className="flex justify-between">
        <p className="text-green-600 font-semibold mb-1">
          Price: ${product.price}
        </p>
        <p className="text-blue-600 font-medium mb-4">
          Calories: {product.calorie} kcal
        </p>
      </div>
      <button
        onClick={() => handleDelete(product._id)}
        className="mt-auto bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default ProductCard;
