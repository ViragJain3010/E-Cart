import { useDispatch, useSelector } from "react-redux";
import {
  SelectProductByID,
  fetchProductByIDAsync,
  updateProductAsync,
} from "../ProductList/ProductListSlice";
import {
  SelectBrands,
  SelectCategory,
} from "../FilterPage/SectionSlice";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";

export default function AdminEditProduct() {
  const [flag, setFlag] = useState(false);
  const categories = useSelector(SelectCategory);
  const brands = useSelector(SelectBrands);
  const dispatch = useDispatch();
  const params = useParams();
  const product = useSelector(SelectProductByID);
  const [openModal, setOpenModal] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchProductByIDAsync(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("brand", product.brand);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("discountPercentage", product.discountPercentage);
      setValue("stock", product.stock);
      setValue("category", product.category);
      setValue("thumbnail", product.thumbnail);
      setValue("image1", product.images[0]);
      setValue("image2", product.images[1]);
      setValue("image3", product.images[2]);
      setValue("image4", product.images[3]);
    }
  }, [dispatch, product]);

  const handleDelete = () => {
    const newproduct = { ...product, deleted: true };
    dispatch(updateProductAsync(newproduct));
  };

  return (
    <>
      {flag && <Navigate to={`/admin/product/${params.id}`} replace={true} />}
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          const product = { ...data };
          product.id = params.id;
          product.images = [
            product.image1,
            product.image2,
            product.image3,
            product.image4,
            product.thumbnail,
          ];
          delete product["image1"];
          delete product["image2"];
          delete product["image3"];
          delete product["image4"];

          dispatch(updateProductAsync(product));
          reset();
        })}
      >
        <div className="space-y-12 bg-white p-16 text-left">
          <div className="p-2">
            <h2 className="text-3xl font-semibold leading-7 text-gray-900">
              Product Specifications
            </h2>
            {product && product.deleted && (
              <p className="text-2xl text-red-500 animate-pulse pt-4">
                This product has been deleted.
              </p>
            )}

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* Product Title */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w px-2">
                    <input
                      type="text"
                      {...register("title", {
                        required: "This field is required",
                      })}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              {/* Brand */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    {...register("brand", {
                      required: "This field is required",
                    })}
                    id="brand"
                    className="border-0 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 rounded lg:w-3/5 md:w-4/5 w-full "
                  >
                    <option value="" className="">
                      Choose Brand
                    </option>
                    {brands.map((brand) => (
                      <option
                        key={brand.value}
                        value={brand.value}
                        className=""
                      >
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    {...register("category", {
                      required: "This field is required",
                    })}
                    id="category"
                    className="border-0 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 rounded lg:w-3/5 md:w-4/5 w-full "
                  >
                    <option value="" className="">
                      Choose Category
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category.value}
                        value={category.value}
                        className=""
                      >
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Product Description */}
              <div className="sm:col-span-5">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "This field is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>

              {/* Price */}
              <div className="sm:col-span-2 ">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md px-2">
                    <input
                      type="number"
                      {...register("price", {
                        required: "This field is required",
                        min: 1,
                      })}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              {/* Discount Percentage */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md px-2">
                    <input
                      type="number"
                      {...register("discountPercentage", {
                        required: "This field is required",
                        min: 0,
                        max: 100,
                      })}
                      id="discountPercentage"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              {/* Stock */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md px-2">
                    <input
                      type="number"
                      {...register("stock", {
                        required: "This field is required",
                      })}
                      id="stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              {/* Thumbnail */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Thumbnail
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w px-2">
                    <input
                      type="url"
                      {...register("thumbnail", {
                        required: "This field is required",
                      })}
                      id="thumbnail"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 "
                    />
                  </div>
                </div>
              </div>

              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="sm:col-span-3">
                  <label
                    htmlFor={`image${num}`}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image {num}
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md px-2">
                      <input
                        type="url"
                        {...register(`image${num}`, {
                          required: "This field is required",
                        })}
                        id={`image${num}`}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={() => reset()}
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Reset
          </button>
          {product && product.deleted? null : (
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenModal(true);
              }}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </button>
          )}
          <button
            onClick={() => setFlag(true)}
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      {product && (
        <Modal
          type="danger"
          title={`Delete ${product.title}`}
          message="Are you sure you want to delete this Product ?"
          primaryOption="Delete"
          secondaryOption="Cancel"
          primaryAction={handleDelete}
          secondaryAction={() => setOpenModal(null)}
          showModal={openModal}
        ></Modal>
      )}
    </>
  );
}
