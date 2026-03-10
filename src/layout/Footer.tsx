import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      data-testid="footer-element"
      className="footer footer-horizontal footer-center flex-wrap justify-center gap-6 rounded bg-base-100 p-6 text-base-content sm:p-8"
    >
      <nav className="flex flex-row flex-wrap items-center justify-center gap-4">
        <Link to="/movies">Movies</Link>
        <Link to="/tv-shows">Tv Shows</Link>
        <Link to="/people">People</Link>
      </nav>
      <nav>
        <div className="flex flex-row flex-wrap items-center justify-center gap-4">
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
        <p data-testid="copyright-element">Copyright © 2026 - Frank Mendez</p>
      </aside>
    </footer>
  );
};

export default Footer;
