import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div data-theme={"light"} className="relative">
      <Outlet />
    </div>
  );
};

export default Main;
