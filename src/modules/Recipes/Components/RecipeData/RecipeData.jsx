import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  axiosInstance,
  baseImg,
  CATEGORIES_URLS,
  RECIPES_URL,
  TAG_URL,
} from "../../../../Services/url";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function RecipeData() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  const [TagList, setTagList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const mode = location.state?.mode;
  const RecipeDataDetails = location.state?.RecipeData;
  const RecipeId=location.state.RecipeId;

  const GetRecipeForUpdate=()=>{
     if (mode === "update" && RecipeDataDetails) {
        reset({
          name: RecipeDataDetails.name,
          price: RecipeDataDetails.price,
          description: RecipeDataDetails.description,
          categoriesIds: RecipeDataDetails.category[0]?.id,
          tagId: RecipeDataDetails.tag.id,
          imagePath:RecipeDataDetails.imagePath
        });
      }

  }

  const onSubmit = async (data) => {
    if (mode === "Add") {
      await AddRecipe(data);
    } else {
      await EditRecipe(data);
    }
  };

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("tagId", data.tagId);
    formData.append("recipeImage", data.recipeImage[0]);
    return formData;
  };

  const AddRecipe = async (data) => {
    try {
      const recipeData = appendToFormData(data);
      const response = await axiosInstance.post(
        RECIPES_URL.ADD_RECIPES,
        recipeData
      );
      toast.success(response.data.message);
      navigate("/dashboard/recipes");
    } catch (error) {
      console.error(error);
    }
  };

  const EditRecipe = async (data) => {
    try {
      const response = await axiosInstance.put(RECIPES_URL.UPDATE_RECIPES(RecipeId), {
        name: data.name,
        price: data.price,
        description: data.description,
        categoriesIds:data.categoriesIds,
        tagId: data.tagId,
        // recipeImage: data.recipeImage[0],
      });
      console.log(response);
      
      toast.success("The recipe has been successfully modified.");
      navigate("/dashboard/recipes");
    } catch (error) {
      console.error(error);
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

  useEffect(() => {
       GetTagList();
       getCategoryList(4, 1);
       GetRecipeForUpdate()
  }, []);



  return (
        <div className="mx-4">
      <div className="recipes-header container p-4">
        <div className="row d-flex align-items-center ">
          <div className="col-md-8">
            <h3>Fill the Recipes!</h3>
            <p className="w-75">
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            <button
              onClick={() => navigate("/dashboard/recipes")}
              className="btn btn-success px-5"
            >
              All Recipes <i className="fa-solid fa-arrow-right ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    <div className="p-4 w-75 m-auto">
      <h5 className="my-4 text-muted">
        {mode === "Add" ? "Add New Recipe" : "Edit Recipe"}
      </h5>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Recipe Name"
            {...register("name", { required: "Name is Required" })}
          />
        </div>

        <div className="input-group mb-3">
          <select
            className="form-control"
            {...register("tagId", { required: "Tag is required" })}
          >
              {mode == "update" ? <option value={RecipeDataDetails.tag.id}>{RecipeDataDetails.tag.name}</option>: <option value="">Choose Category</option>}
            {TagList.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Recipe Price"
            {...register("price", { required: "Price is Required" })}
          />
        </div>

        <div className="input-group mb-3">
          <select
            className="form-control"
            {...register("categoriesIds", { required: "Category is required" })}
          >
            {mode == "update" ? <option value={RecipeDataDetails.category[0]?.id}>{RecipeDataDetails.category[0]?.name}</option>: <option value="">Choose Category</option>}
            {categoriesList.map((category) => (
              <option key={category.id} value={category.id}>
                    {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group mb-3">
          <textarea
            className="form-control"
            placeholder="Recipe Description"
            {...register("description", {
              required: "Description is Required",
            })}
          ></textarea>
        </div>

        <div
          className="upload-box"
          onClick={() => document.getElementById("fileInput").click()}
          style={{ cursor: "pointer" }}
        >
          <i className="fa-solid fa-upload"></i>
          <div className="div"> {mode == "update"? <img className="item-img" src={`${baseImg}${RecipeDataDetails.imagePath}`} alt=""/>:"" }</div>
          
          <p className="text-secondary">
            Drag & Drop or
            <strong className="text-success"> Choose a Item Image</strong> to
            Upload
          </p>
          <input
            id="fileInput"
            type="file"
            className="d-none"
            {...register("recipeImage")}
          />
        </div>

        <div className="d-flex justify-content-end mt-5 gap-4">
          <button
            type="button"
            className="btn btn-outline-success px-5"
            onClick={() => navigate("/dashboard/recipes")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success px-3">
            Save
          </button>
        </div>
      </form>
    </div>
    </div>

);
}
