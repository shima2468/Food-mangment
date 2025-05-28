import React, { useEffect, useState } from "react";
import Header from "../../../Shared/Components/Header/Header";
import { toast, ToastContainer } from "react-toastify";
import headerImg from "../../../../assets/images/HeaderImg.png";
import { axiosInstance, baseImg, RECIPES_URL } from "../../../../Services/url";
import Loading from "../../../Shared/Components/Loading/loading";
import NoData from "../../../Shared/Components/NoData/NoData";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import DeleteConiformation from "../../../Shared/Components/DeletConiformation/DeletConiformation";

export default function RecipesList({ IsEditMode }) {
  const [RecipeList, setRecipeList] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [RecipeId, setRecipeId] = useState();
  const [showRecipeDetails, setShowRecipeDetails] = useState(false);
  const [RecipeDetailsData, setRecipeDetailsData] = useState({});
  const navigate = useNavigate();

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    setRecipeId(id);
    setShowDelete(true);
  };

  const getRecipeList = async (pageSize, pageNumber) => {
    try {
      let response = await axiosInstance.get(RECIPES_URL.GET_RECIPES, {
        params: { pageSize, pageNumber },
      });
      setRecipeList(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecipe = async () => {
    try {
      let response = await axiosInstance.delete(
        RECIPES_URL.DELETE_RECIPES(RecipeId)
      );
      toast.success("🗑️ تم حذف التصنيف بنجاح");
      getRecipeList();
      handleCloseDelete();
    } catch (error) {
      toast.error("❌ فشل في حذف التصنيف");
      console.log(error);
    }
  };

  const handleCloseRecipeDetails = () => setShowRecipeDetails(false);

  const handleShowRecipeDetails = (recipe) => {
    setShowRecipeDetails(true);
    ViewRecipeDetails(recipe.id);
  };

  const ViewRecipeDetails = async (id) => {
    try {
      let response = await axiosInstance.get(RECIPES_URL.VIEW_RECIPES(id));
      setRecipeDetailsData(response?.data);
    } catch (error) {
      console.error("Error loading recipe details", error);
    }
  };

  useEffect(() => {
    getRecipeList(10, 1);
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="header-bg">
        <Header
          titel={"Recipes Items"}
          description={
            "You can now add your items that any user can order it from the Application and you can edit"
          }
          imgPath={headerImg}
        />
      </div>

      <div className="home-content mx-4 p-2 mt-4 ">
        <div className="row d-flex align-items-center ">
          <div className="col-md-8">
            <h3>Recipe Table Details</h3>
            <p className="">You can check all details</p>
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            <button
              onClick={() =>
                navigate("/dashboard/recipe-Data", { state: { mode: "Add" } })
              }
              className="btn btn-success"
            >
              Add New item
            </button>
          </div>
        </div>

        <table className="table table-borderless table-striped table-responsive table-hover w-100">
          <thead className="p-3">
            <tr>
              <th>Name</th>
              <th className="text-center">Image</th>
              <th className="text-center">Price</th>
              <th className="text-center">Description</th>
              <th className="text-center">Tag</th>
              <th className="text-center">Category</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          {isLoading ? (
            <Loading />
          ) : (
            <tbody>
              {RecipeList.length > 0 ? (
                RecipeList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td className="text-center">
                      <img className='item-img' src={`${baseImg}${item.imagePath}`} alt="" />
                    </td>
                    <td className="text-center">{item.price}</td>
                    <td className="text-center">{item.description}</td>
                    <td className="text-center">{item.tag.name}</td>
                    <td className="text-center">{item?.category[0]?.name}</td>
                    <td className="text-center">
                      <i className="fa fa-eye" onClick={() => handleShowRecipeDetails(item)}></i>
                      <i
                        className="fa fa-edit mx-2 text-warning"
                        onClick={() =>
                          navigate("/dashboard/recipe-Data", {
                            state: {
                              mode: "update",
                              RecipeData: item,
                              RecipeId: item.id,
                            },
                          })
                        }
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
                  <td colSpan="7">
                    <NoData />
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>

        {/* Delete Confirmation Modal */}
        <Modal
          show={showDelete}
          onHide={handleCloseDelete}
          className="d-flex justify-content-center align-items-center"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <DeleteConiformation deletitem={"Category"} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="btn btn-outline-danger"
              onClick={() => deleteRecipe()}
            >
              Delete this item
            </Button>
          </Modal.Footer>
        </Modal>
     <Modal
  show={showRecipeDetails}
  onHide={handleCloseRecipeDetails}
  centered
  size="md"
  backdrop="static"
  keyboard={false}
>
  <Modal.Header className="border-0 p-2 justify-content-end">
    <button
      onClick={handleCloseRecipeDetails}
      className="btn btn-light rounded-circle border border-danger d-flex align-items-center justify-content-center close-btn"
    >
      <i className="fa fa-times text-danger"></i>
    </button>
  </Modal.Header>

  <Modal.Body className="text-center px-4 pt-0">

    {/* صورة الوصفة */}
    <div className="mb-3">
      <img
        src={`${baseImg}${RecipeDetailsData.imagePath}`}
        alt={RecipeDetailsData.name}
        className="img-fluid rounded border border-3 border-success recipe-image"
      />
    </div>


    <h5 className="fw-bold mb-3">
      🍽️ {RecipeDetailsData.name}
    </h5>


    <div className="mb-2 d-flex align-items-center justify-content-center gap-2">
      <i className="fa-solid fa-dollar-sign text-success"></i>
      <span className="fw-bold">Price:</span>
      <span>{RecipeDetailsData.price} $</span>
    </div>

    <div className="mb-2 d-flex align-items-center justify-content-center gap-2">
      <i className="fa-solid fa-ad text-dark"></i>
      <span className="fw-bold">Description:</span>
      <span>{RecipeDetailsData.description}</span>
    </div>


    <div className="mb-2 d-flex align-items-center justify-content-center gap-2 flex-wrap">
      <i className="fa-solid fa-folder-open text-primary"></i>
      <span className="fw-bold">Categories:</span>
      {RecipeDetailsData.category?.length > 0 ? (
        RecipeDetailsData.category.map((cat) => (
          <span key={cat.id} className="badge bg-secondary mx-1">
            {cat.name}
          </span>
        ))
      ) : (
        <span className="text-muted">No Category</span>
      )}
    </div>

    <div className="mb-3 d-flex align-items-center justify-content-center gap-2">
      <i className="fa-solid fa-tag text-warning"></i>
      <span className="fw-bold">Tag:</span>
      <span>{RecipeDetailsData.tag?.name || "No Tag"}</span>
    </div>

  </Modal.Body>
</Modal>


      </div>
    </>
  );
}
