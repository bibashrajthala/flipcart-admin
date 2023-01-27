import React, { useState, useEffect } from "react";
import Input from "../../components/shared/Input";
import {
  addCategory,
  getAllCategories,
} from "../../slices/category/category.slice";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { Category } from "../../types/types";

export interface InitialValues {
  categoryName: string;
  parentCategoryId: string;
  categoryImage: Blob | string;
}
export interface CategoryInputs {
  name: string;
  parentId: string;
  categoryImage: Blob | string;
}

const CategoriesList = () => {
  const dispatch = useAppDispatch();
  const categories: Category[] = useAppSelector(
    (state: RootState) => state.category.categories
  );

  const [showModal, setShowModal] = useState<boolean>(false);
  const initialValues = {
    categoryName: "",
    parentCategoryId: "",
    categoryImage: "",
  };
  const [values, setValues] = useState<InitialValues>(initialValues);

  // console.log(category.categories);
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const renderMenu = (categories: Category[]) => {
    return categories?.map((category) => {
      return (
        <li className="ml-8  list-disc" key={category._id}>
          {category.name}
          {category.children.length ? (
            <ul>{renderMenu(category.children)}</ul>
          ) : null}
        </li>
      );
    });
  };
  const renderParentCategoriesOptions = (categories: Category[]): any => {
    return categories?.map((category) => {
      // console.log(category);
      return (
        <>
          <option
            className="ml-8  list-disc"
            key={category._id}
            value={category._id}
          >
            {category.name}
          </option>
          {category.children.length
            ? renderParentCategoriesOptions(category.children)
            : null}
        </>
      );
    });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleChange = (
    e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    console.log(files?.[0]);
    setValues((values) => ({ ...values, [name]: value }));
    if (files) {
      setValues((values) => ({ ...values, categoryImage: files[0] }));
    }
  };

  console.log(values);

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(values);
    const formData = new FormData();
    formData.append("name", values.categoryName);
    formData.append("parentId", values.parentCategoryId);
    formData.append("categoryImage", values.categoryImage);

    const newCategory = formData;
    dispatch(addCategory(newCategory));
  };

  return (
    <>
      <h3 className="font-bold text-xl mb-4">Categories</h3>
      <button
        className="bg-blue-300 p-2 border-blue-800 cursor-pointer"
        onClick={handleShowModal}
      >
        Add Category
      </button>

      <div
        className={`w-screen min-h-screen max-w-2xl flex flex-col h-20 items-center justify-center bg-white shadow-xl ${
          showModal
            ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            : "hidden"
        }`}
      >
        <div onClick={() => setShowModal(false)}>Close Modal</div>
        <form
          onSubmit={(e) => handleLoginSubmit(e)}
          className="px-8 pt-6 pb-8 mb-4 w-80"
        >
          <Input
            type="text"
            name="categoryName"
            value=""
            placeholder="Category"
            label="Category"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <select
            // type="text"
            name="parentCategoryId"
            // value=""
            // placeholder=""
            // label="Email"
            onChange={(e) => {
              handleChange(e);
            }}
          >
            <option value="" selected>
              Select parent Category if any.
            </option>
            {renderParentCategoriesOptions(categories)}
          </select>

          <Input
            type="file"
            name="categoryImage"
            value=""
            placeholder="Upload your category Image"
            label="Category Image"
            onChange={(e) => {
              handleChange(e);
            }}
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-1 px-4 rounded"
          >
            Add Category
          </button>
        </form>
      </div>

      <ul>{renderMenu(categories)}</ul>
    </>
  );
};

export default CategoriesList;
