import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function ComingSoon() {
  return (
    <>
      <Navbar />

      <section className="coming-soon">

        <div className="container text-center">

          <h1>🚧 Page Under Development 🚧</h1>

          <p>
            This section is currently being developed.
            Please visit again soon.
          </p>

          <Link
            to="/"
            className="btn btn-warning btn-lg mt-4"
          >
            ← Back to Home
          </Link>

        </div>

      </section>

    </>
  );
}

export default ComingSoon;
