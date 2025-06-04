import React, { useEffect, useState } from 'react';
import Header from "../../../Shared/Components/Header/Header";
import { toast, ToastContainer } from "react-toastify";
import headerImg from "../../../../assets/images/HeaderImg.png";
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

export default function FavList() {
  const [FavRecipeList, setFavRecipeList] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [RecipeId, setRecipeId] = useState();
  const [showRecipeDetails, setShowRecipeDetails] = useState(false);
  const [RecipeDetailsData, setRecipeDetailsData] = useState({});
  const [TagList, setTagList] = useState([]);
  const [SearchInput, setSearchInput] = useState("");
  const [SelectedTagId, setSelectedTagId] = useState("");
  const [SelectedCategoryId, setSelectedCategoryId] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [clickedHearts, setClickedHearts] = useState([]); // ✅ هنا الحالة الجديدة

  const navigate = useNavigate();

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

  const getRecipeList = async (pageSize, pageNumber) => {
    try {
      let response = await axiosInstance.get(FAV_RECIPE_LIST_URL.GET_FAV_RECIPES, {
        params: { pageSize, pageNumber },
      });
      setFavRecipeList(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handelFavoriteClick = async (recipeId) => {
    setClickedHearts((prev) => [...prev, recipeId]);

    try {
      await axiosInstance.delete(FAV_RECIPE_LIST_URL.DELETE_FAV_RECIPE(recipeId));
      toast.success("Deleted From Favorite Successfully ");
      setFavRecipeList((prev) => prev.filter((item) => item.id !== recipeId));
    } catch (error) {
      toast.error("Failed to Delete From Favorite");
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipeList(10, 1);
    (async () => {
      try {
        const tags = await axiosInstance.get(TAG_URL.GET_TAG);
        setTagList(tags?.data);
        const cats = await axiosInstance.get(CATEGORIES_URLS.GET_CATEGORIES, {
          params: { pageSize: 10, pageNumber: 1 },
        });
        setCategoriesList(cats?.data?.data);
      } catch (err) {
        console.error(err);
      }
    })();
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

      <div className="home-content mx-4 p-2 mt-4">
        <div className="row d-flex align-items-center">
          <div className="col-md-8">
            <h3>Recipe Table Details</h3>
            <p>You can check all details</p>
          </div>
        </div>

    

        <div className="row">
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
    <Loading />
  </div>
          ) : FavRecipeList.length > 0 ? (
            FavRecipeList.map((item, index) => (
              <div key={index} className="col-md-4 mb-2 g-4">
                <div className="card position-relative mt-3" >
                  <button
                    onClick={() => handelFavoriteClick(item.id)}
                    className="btn btn-light position-absolute top-0 end-0 m-2 px-2 py-1 rounded-circle shadow-sm"
                    title="Favorite"
                  >
                    <i className={`${
                      clickedHearts.includes(item.id)
                        ? "fa-regular fa-heart text-success"
                        : "fa-solid fa-heart text-success"
                    }`} />
                  </button>

                 <div className="card-body text-center p-2">
  <div className="w-100 rounded overflow-hidden mb-2" style={{ height: "200px" }}>
    <img
      src={`${baseImg}${item.recipe.imagePath}`}
      className="w-100 h-100 object-fit-cover"
      alt={item.recipe.name}
    />
  </div>
  <p className="card-text fw-bold mb-1">{item.recipe.name}</p>
  <p className="card-text text-muted small">{item.recipe.description}</p>
  <div className="d-flex justify-content-between align-items-center mt-2 px-1">
  <div className="text-start">
   <p className="mb-0 text-success fw-bold"> Price:<span className='text-muted'>{item.recipe.price}</span></p>
  </div>
  <div className="text-end">
   
    <p className="mb-0 text-success fw-bold">
     Category:<span className='text-muted'> {item.recipe.category?.[0]?.name }</span>
    </p>
  </div>
</div>

</div>

                </div>
              </div>
            ))
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </>
  );
}
