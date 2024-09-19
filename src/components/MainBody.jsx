// import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/actions/categoryActions";
import image from "../assets/main-banner.png";
import banner from "../assets/main-gif.gif";
import Footer from "./Footer";
import MainBody2 from "./MainBody2";
import "./MainBodyStyles.css";

const MainBody = () => {
  const [showCategories, setShowCategories] = useState(null);
  const { categories } = useSelector((state) => state.category);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:4000/category/get/allCategories"
        );
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data)) {
          dispatch(fetchCategories(data));
          setLoading(false);
        } else {
          console.log("The data is not an array", typeof data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCategories();
  }, []);
  const handleHoveredCategoryMouse = (category) => {
    setShowCategories(category.id);
  };
  const handleHoveredCategoryLeave = () => {
    setShowCategories(null);
  };
  return (
    <>
      <div className="container1 ">
        <div className="con">
          <div className="shadow border-5">
            <div className="list1 ">
              {loading && <p>Loading...</p>}
              {categories.length === 0 ? (
                <p>No categories available</p>
              ) : (
                categories.map((category) => {
                  return (
                    <>
                      <ul
                        className="ul1 container"
                        key={category.id}
                        onMouseEnter={() =>
                          handleHoveredCategoryMouse(category)
                        }
                        onMouseLeave={() => handleHoveredCategoryLeave()}>
                        <li className="categories ">
                          {category.title}
                          {showCategories === category.id && (
                            <div className="category row">
                              <div className="sub col">
                                {category.subCategories.map((subCategory) => (
                                  <>
                                    <ul>
                                      <li key={subCategory.id}>
                                        {subCategory.name}
                                        <ul className="nestedSubCat col">
                                          {subCategory.NestedSubCategories.map(
                                            (nestedCategory) => (
                                              <li key={nestedCategory.id}>
                                                {nestedCategory.title}
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </li>
                                    </ul>
                                  </>
                                ))}
                              </div>
                            </div>
                          )}
                        </li>
                      </ul>
                    </>
                  );
                })
              )}
            </div>
            <img
              src={image}
              alt="jumia banner"
              className="banner img-fluid banner"
            />
            <div className="list2 ">
              <ul className=" ul2 ">
                <li
                  className="list-group-item d-flex justify-content-start mb-1 align-items-start"
                  style={{ border: "none" }}>
                  <div className="ms-1 ">
                    <h6 className=" fw-regular" style={{ marginTop: "10px" }}>
                      {" "}
                      HELP CENTER{" "}
                    </h6>
                    <p>Guide to Customer care</p>
                  </div>
                </li>
                <li
                  className="list-group-item d-flex justify-content-start mb-1 align-items-start"
                  style={{ border: "none" }}>
                  <div className="ms-1 ">
                    <h6 className="fw-regular">EASY RETURN </h6>
                    <p>Quick Refund</p>
                  </div>
                </li>
                <li
                  className="list-group-item d-flex justify-content-start mb-1 align-items-center"
                  style={{ border: "none" }}>
                  <div className="ms-1 ">
                    <h6 className="fw-regular">SELL ON JUMIA </h6>
                    <p>Millions of Customers</p>
                  </div>
                </li>
              </ul>
            </div>
            <img src={banner} alt="image" className="image img-fluid" />
            <MainBody2 />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainBody;
