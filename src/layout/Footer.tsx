import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      data-testid="footer-element"
      className="footer footer-center p-10 bg-base-100 text-base-content rounded"
    >
      <nav className="grid grid-flow-col gap-4">
        <Link to="/movies">Movies</Link>
        <li>
          <Link to="/tv-shows">Tv Shows</Link>
        </li>
        <li>
          <Link to="/people">People</Link>
        </li>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a target="_blank" href="https://github.com/frank-mendez">
            <GitHubIcon />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/frank-mendez-47b62090/"
          >
            <LinkedInIcon />
          </a>
          <a target="_blank" href="https://www.facebook.com/frankmendezzz/">
            <FacebookIcon />
          </a>
          <a target="_blank" href="https://www.instagram.com/frankmendezph/">
            <InstagramIcon />
          </a>
        </div>
      </nav>
      <aside>
        <p data-testid="copyright-element">Copyright © 2024 - Frank Mendez</p>
      </aside>
    </footer>
  );
};

export default Footer;
