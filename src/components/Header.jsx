import "./HeaderStyles.css";
import image1 from "../assets/SAACHI_BRAND-SALE_Sticky_Header.gif";
import logo from "../assets/myjumia-top-logo.png";

const Header= () => {
  return (
    <>
      <div className="main">
        <div className="setter">
          <img src={image1} className="inner mb-3" />
        </div>
        <div className="list">
          <div className="sell">
          <img src={logo} style={{  }} /> 
          <p className="mt-2">Sell on Jumia</p>
          </div>
          <div className="jumia">
          <h6>JUMIA </h6>
          <img src={logo} style={{}} />
          {/* <img src={logo} style={{ width: "18px", marginTop: '-6px' }} /> */}
          </div>
          <ul className="list-group list-group-horizontal food">
            <li className="list-group-item-light food1">FOOD</li>
            <li className="list-group-item-light food2">PAY</li>
            <div className="logo">
            <img src={logo} style={{ width: "18px" }}/>
            <li className="list-group-item-light food1"> FORCE</li>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
