import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/myjumia-top-logo.png";
import { handleLogout } from "../redux/actions/userActions";
import "./MainHeaderStyles.css";
import Search from "./Search";

const MainHeader = () => {
  const { UserId, isLoggedIn, username } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);
  const [todo, setTodo] = useState("");
  const [previousScroll, setPreviousScroll] = useState(window.scrollY);
  const [isScroll, setScroll] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const dispatch = useDispatch();
  const history = useNavigate();
  const navigate = useNavigate();
  const back = useNavigate();

  const handleClick = () => {
    console.log("clicked");
    history("/login");
  };

  useEffect(() => {
    // If the user scrolls up, we set the scroll state
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      if (
        previousScroll > currentScrollPosition ||
        currentScrollPosition > 100
      ) {
        setScroll(false);
        setScrollPosition("down");
      } else if (currentScrollPosition < previousScroll) {
        setScroll(true);
        setScrollPosition("up");
      }
      setPreviousScroll(currentScrollPosition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [previousScroll]);

  const handleLog = () => {
    dispatch(handleLogout());
    navigate("/");
  };

  const handleBack = () => {
    back("/");
  };

  const handleButton = () => {
    console.log(todo);
    setTodo("");
  };
  useEffect(() => {
    const filteredCategory = categories
      .map((category) =>
        category.subCategories.map((subCategory) =>
          subCategory.NestedSubCategories.filter((nested) =>
            nested.title.toLowerCase().includes(todo)
          )
        )
      )
      .flat(2);
    setFilteredCategories(filteredCategory);
    console.log(filteredCategory);
  }, [todo, categories]);

  const handleSearch = (e) => {
    setTodo(e.target.value);
  };
  return (
    <>
      <div
        className={`main-header ${
          isScroll && scrollPosition ? "scroll" : ""
        } `}>
        <div
          className={`main-header-1 d-flex justify-content-start flex-column align-items-center  `}>
          <div className="header3 d-flex justify-content-start flex-row align-items-center">
            <div className="handle-back">
              <h3 onClick={handleBack} style={{ cursor: "pointer" }}>
                JUMIA{" "}
              </h3>
              <img
                src={logo}
                style={{
                  width: "20px",
                  marginLeft: "-6px",
                }}
              />
            </div>

            <input
              type="search"
              value={todo}
              className="input-search"
              placeholder="Search products, brands and categories"
              onChange={handleSearch}
            />

            <button
              className="search fw-bold"
              type="button"
              onClick={handleButton}>
              SEARCH
            </button>

            <Dropdown>
              {isLoggedIn ? (
                <>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Hi, {username}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="drop1">
                    <Dropdown.Item
                      as={Link}
                      to={`/account/${UserId}`}
                      className="acc">
                      My Account
                    </Dropdown.Item>
                    <Dropdown.Item>Orders</Dropdown.Item>
                    <Dropdown.Item>Inbox</Dropdown.Item>
                    <Dropdown.Item>Saved Items</Dropdown.Item>
                    <Dropdown.Item>Vouchers</Dropdown.Item>
                    <Dropdown.Item>
                      <button
                        className="btn btn-primary sign"
                        onClick={handleLog}>
                        LOGOUT
                      </button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </>
              ) : (
                <>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    <i className="bx bx-user"></i>
                    Account
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="drop3">
                    <Dropdown.Item>
                      <button
                        className="btn btn-primary sign"
                        onClick={handleClick}>
                        Sign in
                      </button>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleClick}>
                      My Account
                    </Dropdown.Item>
                    <Dropdown.Item>Orders</Dropdown.Item>
                    <Dropdown.Item>Saved Items</Dropdown.Item>
                  </Dropdown.Menu>
                </>
              )}
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic1">
                <i className="bx bx-question-mark"></i>
                Help
              </Dropdown.Toggle>

              <Dropdown.Menu className="drop2">
                <Dropdown.Item>Help Center</Dropdown.Item>
                <Dropdown.Item>Place An Order</Dropdown.Item>
                <Dropdown.Item>Payments & Jumia Account</Dropdown.Item>
                <Dropdown.Item>Track Your Order</Dropdown.Item>
                <Dropdown.Item>Order Cancelention</Dropdown.Item>
                <Dropdown.Item>Returns & Refunds</Dropdown.Item>
                <Dropdown.Item>
                  <button className="btn btn-primary btn3 ">Live Help</button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className="cart">
              <i className="bx bx-cart-alt"></i>
              <h4>Cart</h4>
            </div>
          </div>
        </div>
      </div>
      <Search todo={todo} filteredCategories={filteredCategories} />
    </>
  );
};

export default MainHeader;
