import { NavLink } from "react-router-dom";

/**
 * ERROR PAGE
 * @returns {React.ReactElement} JSX.Element error page
 */
const Error = () => {
  return (
    <section className="error">
      <p className="title-404">404</p>
      <p className="text-404">Oups! La page que vous demandez n'existe pas</p>
      <NavLink to="/">
        <li className="back-home">Retourner sur la page d'accueil</li>
      </NavLink>
    </section>
  );
};

export default Error;
