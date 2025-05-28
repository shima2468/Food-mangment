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

export default function CategoriesList({ loginData }) {
  const [categoriesList, setCategoriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [CategoryId, setCategoryId] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const {
    register,
    setValue,
    formState: { errors },
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
     console.log(CategoryId)
    setShowDelete(true);
  };
  const [showCategoryDetails, setShowCategoryDetails] = useState(false);

  const handleCloseCategoryDetails = () => setShowCategoryDetails(false);

  const handleShowCategoryDetails = (CategoryDetails) => {
    setCurrentCategory(CategoryDetails);
    setShowCategoryDetails(true);
    ViewCategoryDetails(CategoryDetails);
  };

  const getCategoryList = async (pageSize,pageNumber) => {
    try {
      let response = await axiosInstance.get(CATEGORIES_URLS.GET_CATEGORIES,{params:{pageSize,pageNumber}});
      setCategoriesList(response?.data?.data)
    } catch (error) {
      toast.error("حدث خطأ أثناء جلب البيانات");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createCategory = async (data) => {
    try {
      let response = await axiosInstance
      .post(
        "https://upskilling-egypt.com:3006/api/v1/Category/",
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success("✅ تم إضافة التصنيف بنجاح");
      getCategoryList();
      handleClose();
    } catch (error) {
      toast.error("❌ فشل في إضافة التصنيف");
      console.log(error);
    }
  };

  const editCategory = async (data) => {
    try {
      const response = await axiosInstance.put(
        `https://upskilling-egypt.com:3006/api/v1/Category/${currentCategory.id}`,
        { name: data.name },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success("✏️ تم تعديل التصنيف بنجاح");
      getCategoryList();
      handleClose();
    } catch (error) {
      toast.error("❌ فشل في تعديل التصنيف");
      console.log(error);
    }
  };

  const ViewCategoryDetails = async (CategoryDetails) => {
    try {
      let response = await axiosInstance.get(
        `https://upskilling-egypt.com:3006/api/v1/Category/${CategoryDetails.id}}`,
        {
          headers: localStorage.getItem("token"),
        }
      );
      console.log(response.data);
      setCategoryDetails(response?.data);
    } catch (error) {}
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
      let response=await axiosInstance.delete(CATEGORIES_URLS.DELETE_CATEGORY(CategoryId));
      toast.success("🗑️ تم حذف التصنيف بنجاح");
      getCategoryList();
      handleCloseDelete();
    } catch (error) {
      toast.error("❌ فشل في حذف التصنيف");
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryList(5,1);
  }, [getCategoryList]);

  return (
    <>
      <ToastContainer/>
      <Header
        titel={"Categories items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgPath={headerImg}
        loginData={loginData}
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
      categoriesList.map((item, index) => (
        <tr key={index}>
          <td>{item.name}</td>
          <td className="text-center">
            {new Date(item.creationDate).toLocaleString()}
          </td>
          <td className="text-center">
            {new Date(item.modificationDate).toLocaleString()}
          </td>
          <td className="text-center">
            <i
              className="fa fa-eye"
              onClick={() => handleShowCategoryDetails(item)}
            ></i>
            <i
              className="fa fa-edit mx-2 text-warning"
              onClick={() => handleShowEdit(item)}
            ></i>
            <i
              className="fa fa-trash text-danger"
              onClick={() => handleShowDelete(item.id)}
            ></i>
          </td>
        </tr>
      ))
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
                {isEditMode ? "Edit Category" : "Add Category"}
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
