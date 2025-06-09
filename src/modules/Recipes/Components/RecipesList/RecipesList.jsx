import React, { useContext, useEffect, useState } from "react";
import Header from "../../../Shared/Components/Header/Header";
import { toast, ToastContainer } from "react-toastify";
import headerImg from "../../../../assets/images/HeaderImg.png";
import fallback from "../../../../assets/images/images.jpeg"
import {
  axiosInstance,
  baseImg,
  CATEGORIES_URLS,
  FAV_RECIPE_LIST_URL,
  RECIPES_URL,
  TAG_URL,
} from "../../../../Services/url";
import Loading from "../../../Shared/Components/Loading/loading";
import NoData from "../../../Shared/Components/NoData/NoData";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import DeleteConiformation from "../../../Shared/Components/DeletConiformation/DeletConiformation";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Context/AuthContext";

export default function RecipesList({ IsEditMode }) {
  const [RecipeList, setRecipeList] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [RecipeId, setRecipeId] = useState();
  const [showRecipeDetails, setShowRecipeDetails] = useState(false);
  const [RecipeDetailsData, setRecipeDetailsData] = useState({});
  const navigate = useNavigate();
  const [TagList, setTagList] = useState([]);
  const [NameValue, setNameValue] = useState("");
  const [SelectedTagId, setSelectedTagId] = useState("");
  const [SelectedCategoryId, setSelectedCategoryId] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [ArrayOfPages, setArrayOfPages] = useState()
  const{saveLoginData,loginData}=useContext(AuthContext);
  const isAdmin=loginData?.userGroup=="SuperAdmin";

 const getNameValue=(input)=>{
      setNameValue(input.target.value);
      getRecipeList(4,1,input.target.value);
  }
  const getCategorySelected = (input) => {
      setSelectedCategoryId(input.target.value);
      getRecipeList(4,1,NameValue,input.target.value);
};
 const getTagSelected = (input) => {
      setSelectedTagId(input.target.value);
      getRecipeList(4,1,NameValue,SelectedCategoryId,input.target.value);
};
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    setRecipeId(id);
    setShowDelete(true);
  };

  const getRecipeList = async (pageSize, pageNumber,name,CatId,TagId) => {
    try {
      let response = await axiosInstance.get(RECIPES_URL.GET_RECIPES, {
        params: { pageSize, pageNumber,name,categoryId: CatId ,tagId:TagId },
      });
      setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
      setRecipeList(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecipe = async () => {
    try {
      await axiosInstance.delete(RECIPES_URL.DELETE_RECIPES(RecipeId));
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

  const GetTagList = async () => {
    try {
      const response = await axiosInstance.get(TAG_URL.GET_TAG);
      setTagList(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategoryList = async (pageSize, pageNumber) => {
    try {
      const response = await axiosInstance.get(CATEGORIES_URLS.GET_CATEGORIES, {
        params: { pageSize, pageNumber },
      });
      setCategoriesList(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };




  const handelFavoriteClick=async(recipeId)=>{
         const isFav=favoriteIds.includes(recipeId);
          try {
             if(isFav){
                      let response=await axiosInstance.delete(FAV_RECIPE_LIST_URL.DELETE_FAV_RECIPE(recipeId));
                      setFavoriteIds((prev) => prev.filter((id) => id !== recipeId));
                      toast.success("Deleted From Favorite Successfully ")
                      
             }else{
                          await axiosInstance.post(FAV_RECIPE_LIST_URL.ADD_FAV_RECIPES, { recipeId });
                          setFavoriteIds(prev => [...prev, recipeId]);
                          toast.success("Added to Favorite Successfully ")
             }
          } catch (error) {
                            console.error("Favorite toggle failed", error);
                            toast.error(response.error.message || "Failed to add recipe to favorites")
          }
  }
  



  useEffect(() => {
    getRecipeList(2, 1,NameValue,SelectedCategoryId,SelectedTagId);
    GetTagList();
    getCategoryList(4, 1);
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="header-bg">
        <Header
          titel="Recipes Items"
          description="You can now add your items that any user can order it from the Application and you can edit"
          imgPath={headerImg}
        />
      </div>

      <div className="home-content mx-4 p-2 mt-4" >
        <div className="row d-flex align-items-center">
          <div className="col-md-8">
            <h3>Recipe Table Details</h3>
            <p>You can check all details</p>
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            {isAdmin?  <button
              onClick={() => navigate("/dashboard/recipe-Data", { state: { mode: "Add" } })}
              className="btn btn-success btn-icon"
            >
              Add New Recipe
            </button>:""}
           
          </div>
        </div>

        <div className="ActionAboveTable mt-3">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-md-6 input-group w-50 border rounded-3 text-muted">
              <span className="input-group-text bg-white border-light fs-6">
                <i className="fa-solid fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-light fs-6"
                placeholder="Search here..."
                onChange={(e) => getNameValue(e)}
              />
            </div>
            <div className="col-md-3 w-25">
              <div className="input-group border">
                <select
                  className="form-control border-light"
                  onChange={(e) => getTagSelected(e)}
                >
                  <option value="">Tag</option>
                  {TagList.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-3 w-25">
              <div className="input-group border">
                <select
                  className="form-control border-light"
                  onChange={(e) => getCategorySelected(e)}
                >
                  <option value="">Category</option>
                  {categoriesList.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
                <div></div>
            </div>
          
          </div>
        </div>

        <table className="table table-borderless table-striped table-responsive table-hover w-100 mt-2">
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
                <>
                   {  RecipeList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td className="text-center w-25 h-25">
                      <img className="item-img" src={item.imagePath?`${baseImg}${item.imagePath}`: fallback} alt="" />
                    </td>
                    <td className="text-center">{item.price}</td>
                    <td className="text-center">{item.description}</td>
                    <td className="text-center">{item.tag?.name}</td>
                    <td className="text-center">{item.category?.[0]?.name}</td>
                    <td className="text-center align-middle">
                      {isAdmin?

                           (<div className="dropdown">
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
                          <button className="dropdown-item d-flex align-items-center gap-2 text-success btn-icon" onClick={() => handleShowRecipeDetails(item)}>
                            <i className="fa fa-eye text-success"></i> View
                          </button>
                        </li>
                        <li> 
                          <button
                            className="dropdown-item d-flex align-items-center gap-2 text-success" 
                            onClick={() =>
                              navigate("/dashboard/recipe-Data", {
                                state: { mode: "update", RecipeData: item, RecipeId: item.id },
                              })
                            }
                          >
                            <i className="fa fa-pen text-success"></i> Edit
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item d-flex align-items-center gap-2 text-success"
                            onClick={() => handleShowDelete(item.id)}
                          >
                            <i className="fa fa-trash"></i> Delete
                          </button>
                        </li>
                      </ul>
                          </div>):( 
                           <div className="d-flex justify-content-center align-items-center">
                                   <div>

                                      <button  onClick={()=>{handelFavoriteClick(item.id)}}
                                          className="btn btn-light  m-2 px-2 py-1 rounded-circle shadow-sm "
                                          title="Favorite"
                                    >
                                 {favoriteIds.includes(item.id) ? (
                                            <i className="fa-solid fa-heart text-success text-center"></i>
                                          ) : (
                                            <i className="fa-regular fa-heart text-success"></i>
                                          )}
                                   </button>
                                   </div>


                                   <div> <button className="dropdown-item d-flex align-items-center gap-2 text-success" onClick={() => handleShowRecipeDetails(item)}>
                                                              <i className="fa fa-eye text-success"></i> 
                                    </button></div>
                                   
                                   


                            </div>
                          
                            
                            
                          
                          
                          )

                      
                    
                    
                    }
                    
                 </td>

                  </tr>
                ))}
                  <div className="d-flex mt-3 w-100 bg-red">
  <nav aria-label="Page navigation">
    <ul className="pagination">
      <li className="page-item">
        <a className="page-link text-success" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      {ArrayOfPages.map((pageNu) => (
        <li
          key={pageNu}
          onClick={() => getRecipeList(3, pageNu)}
          className="page-item"
        >
          <a className="page-link text-success" href="#">
            {pageNu}
          </a>
        </li>
      ))}

      <li className="page-item">
        <a className="page-link text-success" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</div>
                </>
              
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
        <Modal show={showDelete} onHide={handleCloseDelete} centered>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <DeleteConiformation deletitem="Category" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="btn btn-outline-danger" onClick={deleteRecipe}>
              Delete this item
            </Button>
          </Modal.Footer>
        </Modal>

        {/* View Modal */}
        <Modal show={showRecipeDetails} onHide={handleCloseRecipeDetails} centered size="md" backdrop="static">
          <Modal.Header className="border-0 p-2 justify-content-end">
            <button
              onClick={handleCloseRecipeDetails}
              className="btn btn-light rounded-circle border border-danger d-flex align-items-center justify-content-center close-btn"
            >
              <i className="fa fa-times text-danger"></i>
            </button>
          </Modal.Header>
          <Modal.Body className="text-center px-4 pt-0">
            <div className="mb-3">
              <img
                src={`${baseImg}${RecipeDetailsData.imagePath}`}
                alt={RecipeDetailsData.name}
                className="img-fluid rounded border border-3 border-success recipe-image"
              />
            </div>
            <h5 className="fw-bold mb-3">🍽️ {RecipeDetailsData.name}</h5>
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
