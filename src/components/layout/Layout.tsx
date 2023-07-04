import "./layout.scss";

import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="Layout">
      <nav>
        <Link to="/">
          <h1>Questionnaire</h1>
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;
