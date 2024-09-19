import "./HeaderStyles.css";
import logo from "../assets/myjumia-top-logo.png";

const Header2 = () => {
  return (
    // <div className="main" style={{marginTop: '18px'}}>
    //   <div className="list">
    //     <p className="mt-2"><img src={logo} style={{ width: "18px" , marginTop: '-5px'}} /> Sell on Jumia</p>
    //     <h6>JUMIA <img src={logo} style={{ width: "20px", marginTop: '-6px' }} /></h6>
    //     <ul className="list-group list-group-horizontal food">
    //       <li className="list-group-item-light food1">FOOD</li>
    //       <li className="list-group-item-light food2">PAY</li>
    //       <li className="list-group-item-light food1"><img src={logo} style={{ width: "18px" ,  marginTop: '-5px'}}/> FORCE</li>
    //     </ul>
    //   </div>
    // </div>
    <>
          <div className="main main2">
        <div className="header-list">
          <div className="sell ">
          <img src={logo}  /> 
          <p className="mt-2">Sell on Jumia</p>
          </div>
          <div className="jumia">
          <h6>JUMIA </h6>
          <img src={logo} />
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

export default Header2;
