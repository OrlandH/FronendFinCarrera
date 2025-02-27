import { Link } from "react-router-dom";
import React from "react";

interface DefaultLayoutProps {
  children?: React.ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <header>
        <nav>
        <center><ul>
            <li><h1>Bienvenido - Sistema de Citas Medicas</h1></li>
          </ul>
          </center>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/signup">Registro</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
