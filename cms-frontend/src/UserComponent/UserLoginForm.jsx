import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLoginForm = () => {
  const api_Url = process.env.REACT_APP_API_URL;

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const loginAction = (e) => {
    fetch(`${api_Url}/api/user/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.href = "/home";
            }, 1000); // Redirect after 3 seconds

            if (res.user.role === "admin") {
              sessionStorage.setItem("active-admin", JSON.stringify(res.user));
              sessionStorage.setItem("admin-jwtToken", res.jwtToken);
            } else if (res.user.role === "customer") {
              sessionStorage.setItem(
                "active-customer",
                JSON.stringify(res.user)
              );
              sessionStorage.setItem("customer-jwtToken", res.jwtToken);
            } else if (res.user.role === "surveyor") {
              sessionStorage.setItem(
                "active-surveyor",
                JSON.stringify(res.user)
              );
              sessionStorage.setItem("surveyor-jwtToken", res.jwtToken);
            } else if (res.user.role === "irda") {
              sessionStorage.setItem("active-irda", JSON.stringify(res.user));
              sessionStorage.setItem("irda-jwtToken", res.jwtToken);
            }
          } else {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    e.preventDefault();
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div className="form-card" style={{ width: "25rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "38px",
              }}
            >
              <h4 className="card-title">User Login</h4>
            </div>
            <div className="card-body mt-3">
              <form className="text-color">
                <div class="mb-3">
                  <label for="role" class="form-label">
                    <b>User Role</b>
                  </label>
                  <select
                    onChange={handleUserInput}
                    className="form-control"
                    name="role"
                  >
                    <option value="0">Select Role</option>
                    <option value="admin"> Admin </option>
                    <option value="customer"> Customer </option>
                    <option value="surveyor"> Surveyor </option>
                    <option value="irda"> IRDA </option>
                  </select>
                </div>

                <div className="mb-3">
                  <label for="emailId" class="form-label">
                    <b>Email Id</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    onChange={handleUserInput}
                    value={loginRequest.emailId}
                  />
                </div>
                <div className="mb-3">
                  <label for="password" className="form-label">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={handleUserInput}
                    value={loginRequest.password}
                    autoComplete="on"
                  />
                </div>
                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    onClick={loginAction}
                  >
                    <b> Login</b>
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginForm;
