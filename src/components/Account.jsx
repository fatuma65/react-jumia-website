import { useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchUserFailure,
  fetchUserSuccess,
  handleLogout,
} from "../redux/actions/userActions";
import "./AccountStyles.css";
import Header2 from "./Header2";
import MainHeader from "./MainHeader";
const Account = () => {
  const { error, loading, UserId, userData } = useSelector(
    (state) => state.user
  );
  const id  = UserId;
  console.log("is the id", id);
  console.log(typeof id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLog = () => {
    dispatch(handleLogout());
    navigate("/");
  };

  useEffect(() => {
    // dispatch(fetchUserRequest());
    fetch(`http://localhost:4000/users/get/user/${id}, `)
      .then((response) => response.json())
      .then((data) => {
        return (
          String(id),
        dispatch(fetchUserSuccess(data)),
        console.log(data)
        )
      
      })
      .catch((error) => dispatch(fetchUserFailure(error.meesage)));
  }, [dispatch]);

  if (loading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (UserId === undefined || UserId === null) {
    return <div>No id returned</div>;
  }

  if (!userData || isNaN(UserId)) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <Header2 />
      <MainHeader />
      <div>
        <ListGroup
          className="List d-flex justify-content-between "
          variant="dark"
        >
          <ListGroup.Item style={{ border: "none" }} variant="dark">
            My Jumia Account
          </ListGroup.Item>
          <ListGroup.Item style={{ border: "none" }}>Orders</ListGroup.Item>
          <ListGroup.Item style={{ border: "none" }}>Inbox</ListGroup.Item>
          <ListGroup.Item style={{ border: "none" }}>Reviews</ListGroup.Item>
          <ListGroup.Item style={{ border: "none" }}>Vouchers</ListGroup.Item>
          <ListGroup.Item style={{ border: "none" }}>
            Saved Items
          </ListGroup.Item>
          <ListGroup.Item style={{ border: "none" }}>
            Followed Sellers
          </ListGroup.Item>
          <ListGroup.Item style={{ borderLeft: "none", borderRight: "none" }}>
            Recently Reviewed
          </ListGroup.Item>
          <ListGroup.Item style={{ border: "none" }}>
            Account Managment
          </ListGroup.Item>
          <ListGroup.Item style={{ border: "none" }}>
            Address Book
          </ListGroup.Item>
          <ListGroup.Item style={{ border: "none" }}>
            NewsLetter Preferances
          </ListGroup.Item>
          <ListGroup.Item style={{ borderLeft: "none", borderRight: "none" }}>
            Close Account
          </ListGroup.Item>
          <ListGroup.Item style={{ border: "none" }}>
            <Button className="but" onClick={handleLog}>
              LOGOUT
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </div>

      <div className="List2 container">
        <h2 className="fw-bold">Account Overview</h2>
        <hr />

        <div className="row">
          <ListGroup
            className="d-flex justify-content-between align-items-start group1"
            style={{ width: "60px" }}
          >
            <div className="ms-2 me-auto" style={{ width: "430px" }}>
              <ListGroup.Item
                className="fw-bold "
              >
                Account Details
              </ListGroup.Item>
              <ListGroup.Item style={{ borderBottom: "none" }} className="">
              {userData.firstName + ' ' + userData.lastName}
              </ListGroup.Item>
              <ListGroup.Item style={{ marginTop: "10px", height: "5rem" }}>
              {userData.email}
              </ListGroup.Item>
            </div>
          </ListGroup>

          <ListGroup className="d-flex justify-content-between align-items-start group2">
            <div className="ms-2 me-auto start1" >
              <ListGroup.Item className="fw-bold ">Address Book</ListGroup.Item>
              <ListGroup.Item>
                Your default shipping address:
                <br /> {userData.firstName + ' ' + userData.lastName}
                <br /> White gold apartments <br />
                bukoto Kampala Bukoto,
                <br /> {userData.city}
                <br /> {userData.phoneNumber}
              </ListGroup.Item>
            </div>
          </ListGroup>
        </div>
        <div className="row">
          <ListGroup className="d-flex justify-content-between align-items-start group3 col-1">
            <div
              className="ms-2 me-auto start2"
              // style={{ width: "400px", height: "270px" }}
            >
              <ListGroup.Item className="fw-bold ">
                JUMIA STORE CREDIT
              </ListGroup.Item>
              <ListGroup.Item style={{ height: "150px", color: "blue" }}>
                Jumia Pay Balance: UGX 0
              </ListGroup.Item>
            </div>
          </ListGroup>

          <ListGroup className="d-flex justify-content-between align-items-start group4 col-1">
            <div
              className="ms-2 me-auto start3"
              // style={{ width: "420px", height: "270px" }}
            >
              <ListGroup.Item className="fw-bold ">
                NEWSLETTER PREFERENCES
              </ListGroup.Item>
              <ListGroup.Item style={{ height: "10rem" }}>
                You are currently not subscribed to any of
                <br /> our newsletters.
                <br />
                <Button className="but1">EDIT NEWSLETTER PREFFERANCES</Button>
              </ListGroup.Item>
            </div>
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default Account;
