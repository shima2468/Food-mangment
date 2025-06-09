import React, { useEffect, useState, useCallback } from "react";
import headerImg from "../../../assets/images/HeaderImg.png";
import Header from "../../Shared/Components/Header/Header.jsx";
import Loading from "../../Shared/Components/Loading/loading.jsx";
import NoData from "../../Shared/Components/NoData/NoData.jsx";
import DeleteConiformation from "../../Shared/Components/DeletConiformation/DeletConiformation.jsx";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { axiosInstance, CATEGORIES_URLS } from "../../../Services/url.js";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [CategoryId, setCategoryId] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [SearchInput, setSearchInput] = useState("");
  const [ArrayOfPages, setArrayOfPages] = useState();
  const [NameValue, setNameValue] = useState("");
  const {
    register,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();
  const [CategoryDetails, setCategoryDetails] = useState([]);
  const handleClose = () => {
    setShow(false);
    reset();
  };
  const handleCloseDelete = () => setShowDelete(false);

  const handleShow = () => {
    setIsEditMode(false);
    setCurrentCategory(null);
    reset();
    setShow(true);
  };

  const handleShowEdit = (category) => {
    setIsEditMode(true);
    setCurrentCategory(category);
    setValue("name", category.name); // تعبئة القيمة القديمة
    setShow(true);
  };

  const handleShowDelete = (id) => {
    setCategoryId(id);
    console.log(CategoryId);
    setShowDelete(true);
  };
  const [showCategoryDetails, setShowCategoryDetails] = useState(false);

  const handleCloseCategoryDetails = () => setShowCategoryDetails(false);

  const handleShowCategoryDetails = (CategoryDetails) => {
    setCurrentCategory(CategoryDetails);
    setShowCategoryDetails(true);
    ViewCategoryDetails(CategoryDetails);
  };

  const getCategoryList = async (pageSize, pageNumber, name) => {
    try {
      let response = await axiosInstance.get(CATEGORIES_URLS.GET_CATEGORIES, {
        params: { pageSize, pageNumber, name },
      });
      console.log(response);

      setCategoriesList(response?.data?.data);
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      toast.success(response?.data?.message);
      setIsLoading(false);
    } catch (error) {
      toast.error(response?.error?.message);
      setIsLoading(false);
    }
  };

  const createCategory = async (data) => {
    try {
      let response = await axiosInstance.post(
        CATEGORIES_URLS.ADD_CATEGORIES,
        data
      );
      console.log(response);

      toast.success(
        response?.data?.message || "The category has been added successfully."
      );
      getCategoryList();
      handleClose();
    } catch (error) {
      toast.error(response?.error?.message || "Failed to add category");
      console.log(error);
    }
  };

  const editCategory = async (data) => {
    try {
      const response = await axiosInstance.put(
        CATEGORIES_URLS.EDIT_CATEGORIES(currentCategory.id),
        { name: data.name }
      );
      toast.success(
        response?.data?.message || "The category has been Updated successfully."
      );
      getCategoryList();
      handleClose();
    } catch (error) {
      toast.error(response?.error?.message || "Failed to update category");
      console.log(error);
    }
  };

  const ViewCategoryDetails = async (CategoryDetails) => {
    try {
      let response = await axiosInstance.get(
        CATEGORIES_URLS.VIEW_CATEGORY(CategoryDetails.id)
      );
      console.log(response.data);
      setCategoryDetails(response?.data);
      toast.success(
        response?.data?.message || "The category has been viewed successfully."
      );
    } catch (error) {
      toast.error(response?.error?.message || "Failed to view category");
    }
  };
  const onSubmit = (data) => {
    if (isEditMode) {
      editCategory(data);
    } else {
      createCategory(data);
    }
  };

  const deleteCategory = async () => {
    try {
      let response = await axiosInstance.delete(
        CATEGORIES_URLS.DELETE_CATEGORY(CategoryId)
      );
      toast.success(
        response?.data?.message || "The category has been deleted successfully."
      );
      getCategoryList();
      handleCloseDelete();
    } catch (error) {
      toast.error(response?.error?.message || "Failed to view category");
      console.log(error);
    }
  };

  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getCategoryList(4, 1, input.target.value);
  };

  useEffect(() => {
    getCategoryList(3, 1, NameValue);
  }, []);

  return (
    <>
      <ToastContainer />
      <Header
        titel={"Categories items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgPath={headerImg}
      />

      <div className="home-content mx-4 p-2 mt-4 ">
        <div className="row d-flex align-items-center ">
          <div className="col-md-8">
            <h3>Categories Table Details</h3>
            <p className="">You can check all details</p>
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            <button className="btn btn-success" onClick={handleShow}>
              Add New Category
            </button>
          </div>
        </div>
        <div className="ActionAboveTable mt-3">
          <div className="row d-flex">
            <div className="col-md-12 input-group   border rounded-3 text-muted">
              <span className="input-group-text bg-white border-light fs-6">
                <i className="fa-solid fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-light fs-6"
                placeholder="Search here By Name..."
                onChange={(e) => getNameValue(e)}
              />
            </div>
          </div>
        </div>

        <table className="table table-borderless table-striped table-responsive table-hover w-100">
          <thead className="p-3">
            <tr>
              <th scope="col">Category Name</th>
              <th scope="col" className="text-center">
                CreationDate
              </th>
              <th scope="col" className="text-center">
                ModificationDate
              </th>
              <th scope="col" className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          {isLoading ? (
            <Loading />
          ) : (
            <tbody>
              {categoriesList.length > 0 ? (
                <>
                  {categoriesList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td className="text-center">
                        {new Date(item.creationDate).toLocaleString()}
                      </td>
                      <td className="text-center">
                        {new Date(item.modificationDate).toLocaleString()}
                      </td>
                      <td className="text-center">
                        <div className="dropdown">
                          <button
                            className="btn p-0 border-0 bg-transparent"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fa fa-ellipsis fs-5 text-secondary"></i>
                          </button>
                          <ul className="dropdown-menu shadow">
                            <li>
                              <button
                                className="dropdown-item d-flex align-items-center gap-2 text-success"
                                onClick={() => handleShowCategoryDetails(item)}
                              >
                                <i className="fa fa-eye text-success"></i> View
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item d-flex align-items-center gap-2 text-success"
                                onClick={() => handleShowEdit(item)}
                              >
                                <i className="fa fa-pen text-primary text-success"></i>{" "}
                                Edit
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item d-flex align-items-center gap-2  text-success"
                                onClick={() => handleShowDelete(item.id)}
                              >
                                <i className="fa fa-trash text-success"></i>{" "}
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <div className="d-flex mt-3 w-100 bg-red">
                    <nav aria-label="Page navigation">
                      <ul className="pagination">
                        <li className="page-item">
                          <a
                            className="page-link text-success"
                            href="#"
                            aria-label="Previous"
                          >
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>

                        {ArrayOfPages.map((pageNu) => (
                          <li
                            key={pageNu}
                            onClick={() => getCategoryList(3, pageNu)}
                            className="page-item"
                          >
                            <a className="page-link text-success" href="#">
                              {pageNu}
                            </a>
                          </li>
                        ))}

                        <li className="page-item">
                          <a
                            className="page-link text-success"
                            href="#"
                            aria-label="Next"
                          >
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </>
              ) : (
                <tr>
                  <td colSpan="4">
                    <NoData />
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>

        <Modal
          show={show}
          onHide={handleClose}
          dialogClassName="w-75"
          className="d-flex justify-content-center align-items-center"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {isEditMode ? "Edit Category" : "Add Category"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <input
                  {...register("name", { required: "field is required" })}
                  type="text"
                  className="form-control"
                  placeholder="Category Name"
                  aria-label="name"
                  aria-describedby="basic-addon1"
                />
              </div>
              {errors.name && (
                <span className="text-danger">{errors.name.message}</span>
              )}
              <button
                className={`btn ${
                  isEditMode ? "btn-warning" : "btn-success"
                }  w-100 mt-2`}
              >
                {isSubmitting && isEditMode ? "Edit Category" : "Add Category"}
              </button>
            </form>
          </Modal.Body>
        </Modal>

        <Modal
          show={showDelete}
          onHide={handleCloseDelete}
          className="d-flex justify-content-center align-items-center"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="">
            <DeleteConiformation deletitem={"Category"} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="btn btn-outline-danger"
              onClick={() => deleteCategory()}
            >
              Delete this item
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showCategoryDetails}
          onHide={handleCloseCategoryDetails}
          backdrop="static"
          keyboard={false}
          className="d-flex align-items-center modal-padding"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="p-5">
            <div className="categoryDetails d-flex flex-column align-items-center justify-content-center">
              <h4>Category Name : {CategoryDetails.name}</h4>
              <p className="my-2">
                {" "}
                Creation Date:{" "}
                {new Date(CategoryDetails.creationDate).toLocaleString()}
              </p>
              <p className=" text-center">
                Modification Date:{" "}
                {new Date(CategoryDetails.modificationDate).toLocaleString()}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCategoryDetails}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
