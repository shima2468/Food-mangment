import React, { useEffect, useState } from "react";
import Header from "../../../Shared/Components/Header/Header.jsx";
import Loading from "../../../Shared/Components/Loading/loading.jsx";
import NoData from "../../../Shared/Components/NoData/NoData.jsx";
import DeleteConiformation from "../../../Shared/Components/DeletConiformation/DeletConiformation.jsx";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";
import { axiosInstance, USERS_LIST_URL } from "../../../../Services/url.js";
import headerImg from "../../../../assets/images/HeaderImg.png";

export default function UsersList({ loginData }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [NameValue, setNameValue] = useState("");
  const [ArrayOfPages, setArrayOfPages] = useState([]);
  const [UserState, setUserState] = useState({});

  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getUsers(4, 2, input.target.value, UserState);
  };

  const getUserState = (input) => {
    const value = Number(input.target.value);
    setUserState(value);
    getUsers(4, 2, NameValue, value);
  };

  const handleCloseDelete = () => setShowDelete(false);
  const handleCloseDetails = () => setShowDetails(false);

  const handleShowDelete = (id) => {
    setUserId(id);
    setShowDelete(true);
  };

  const handleShowDetails = (user) => {
    setCurrentUser(user);
    setShowDetails(true);
  };

  const getUsers = async (pageSize, pageNumber, name, groupId) => {
    try {
      const response = await axiosInstance.get(USERS_LIST_URL.GET_USERS, {
        params: {
          pageSize,
          pageNumber,
          userName: name,
          groups: groupId ? [groupId] : undefined,
        },
      });

      setUsers(response?.data?.data);
      setArrayOfPages(
        Array.from(
          { length: Math.min(5, response.data.totalNumberOfPages) },
          (_, i) => i + 1
        )
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const deleteUser = async () => {
    try {
      let response = await axiosInstance.delete(
        USERS_LIST_URL.DELETE_USERS(userId)
      );
      toast.success(response.data.message || "User deleted successfully");
      getUsers(3, 1);
      handleCloseDelete();
    } catch (error) {
      toast.error(error.response.data.message || "Failed");
    }
  };

  useEffect(() => {
    getUsers(4, 1, NameValue, UserState);
  }, []);

  return (
    <>
      <ToastContainer />
      <Header
        titel="Users Management"
        description="Manage your application's users: view and delete."
        imgPath={headerImg}
        loginData={loginData}
      />

      <div className="container-fluid px-3 px-md-4 mt-4">
        <div className="row d-flex align-items-center">
          <div className="col-12 col-md-8">
            <h3>Users Table</h3>
            <p>List of all registered users</p>
          </div>
        </div>

        <div className="ActionAboveTable mt-3">
          <div className="row g-2">
            <div className="col-12 col-md-9">
              <div className="input-group border rounded-3">
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
            <div className="col-12 col-md-3">
              <div className="input-group border rounded-3">
                <select
                  className="form-control border-light"
                  onChange={(input) => getUserState(input)}
                >
                  <option value="">All Users</option>
                  <option value="1">User</option>
                  <option value="2">Admin</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive mt-3">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>City</th>
                <th>Phone</th>
                <th className="text-center">Created</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            {isLoading ? (
              <Loading />
            ) : (
              <tbody>
                {users?.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>{user.country}</td>
                      <td>{user.phoneNumber}</td>
                      <td className="text-center">
                        {new Date(user.creationDate).toLocaleString()}
                      </td>
                      <td className="text-center">
                        <div className="dropdown">
                          <button
                            className="btn p-0 border-0 bg-transparent"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fa fa-ellipsis-h fs-5 text-secondary"></i>
                          </button>
                          <ul className="dropdown-menu shadow">
                            <li>
                              <button
                                className="dropdown-item d-flex align-items-center gap-2 text-success"
                                onClick={() => handleShowDetails(user)}
                              >
                                <i className="fa fa-eye text-success"></i> View Details
                              </button>
                            </li>
                            {user.role !== "Admin" && (
                              <li>
                                <button
                                  className="dropdown-item d-flex align-items-center gap-2 text-success"
                                  onClick={() => handleShowDelete(user.id)}
                                >
                                  <i className="fa fa-trash text-success"></i> Delete
                                </button>
                              </li>
                            )}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
                      <NoData />
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>

        <div className="d-flex mt-3 w-100">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link text-success" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>

              {ArrayOfPages?.map((pageNu) => (
                <li
                  key={pageNu}
                  onClick={() => getUsers(3, pageNu, NameValue)}
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

        <Modal show={showDelete} onHide={handleCloseDelete}>
          <Modal.Header closeButton />
          <Modal.Body>
            <DeleteConiformation deletitem="User" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={deleteUser}>
              Delete User
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDetails} onHide={handleCloseDetails}>
          <Modal.Header closeButton />
          <Modal.Body>
            {currentUser && (
              <div className="text-center">
                <h5>Username: {currentUser.userName}</h5>
                <p>Email: {currentUser.email}</p>
                <p>City: {currentUser.country}</p>
                <p>Phone: {currentUser.phoneNumber}</p>
                <p>
                  Created at: {new Date(currentUser.creationDate).toLocaleString()}
                </p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetails}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
