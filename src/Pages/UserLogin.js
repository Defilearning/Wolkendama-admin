import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [response, setResponse] = useState("");

  const usernameInput = useRef(null);
  const passwordInput = useRef(null);

  const login = async () => {
    const input = {
      username: usernameInput.current.value,
      password: passwordInput.current.value,
    };

    const fetchData = await fetch(
      `${process.env.REACT_APP_FETCH_URL}/api/v1/user-admin/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    const data = await fetchData.json();

    if (data.status === "success") {
      return navigate("/");
    } else {
      setResponse(data.message);
    }
  };
  return (
    <div className="h-screen w-screen relative">
      <div className="p-5 border rounded-xl w-72 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <form className="flex flex-col">
          <label>Username: </label>
          <input
            ref={usernameInput}
            className="bg-slate-100 text-black"
          ></input>
          <label>Password: </label>
          <input
            ref={passwordInput}
            type="password"
            className="bg-slate-100 text-black"
          ></input>
        </form>
        <button
          onClick={login}
          className="mt-4 border p-3 py-1 rounded-md bg-slate-100 font-semibold text-black"
        >
          Login
        </button>
        {response && <p>{response}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
