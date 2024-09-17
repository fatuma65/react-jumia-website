import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/myjumia-top-logo.png";
import "./JumiaFormStyles.css";

const JumiaForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const move = useNavigate()

  const handleClick = () => {
    move('/form')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/users/create/user", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          username,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("Registration is Successfull");
        navigate("/form");
      } else {
        console.log("Register Failed");
      }
    } catch (error) {
      console.log("an error has occured", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1>Loading.....</h1>;
  }
  return (
    <div className="form">
      <img src={logo} />
      <h5 style={{ fontSize: "22px" }}>Welcome to Jumia</h5>
      <p>
       Create an Account or Log In to your account
      </p>
      <form>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="first Name"
          required
        />
        <input
          type="text"
          defaultValue={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="last Name"
          required
        />
        <input
          type="text"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          defaultValue={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button className="bnt1" role="continueLogin" onClick={handleSubmit}>
          Continue
        </Button>
        <p className="aaa">
          By continuing you agree to Jumia
          <br /> <a href="#">Terms and Conditions</a>
        </p>
      </form>

      <Button className="bnt" onClick={handleClick}>Login With Your Account</Button>
      <h5 className="p1">
        For further support, you may visit the Help Center or contact <br />
      </h5>
      <h5 className="p1">our customer service team.</h5>
      <h3>
        Jumia <img src={logo} style={{ width: "20px", marginLeft: "-4px" }} />
      </h3>
    </div>
  );
};

export default JumiaForm;
