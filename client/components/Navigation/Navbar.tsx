import React from "react";
import styles from "./Navbar.module.scss";
import { Title, Burger, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { useUser } from "../../Contexts/User";
import { logout } from "../../utils/auth";

function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const { user } = useUser();

  const unauthedRoutes = () => {
    return (
      <>
        <li onClick={toggle}>
          <Link to="/signup">
            <button className="btn btn-secondary">Sign Up</button>
          </Link>
        </li>
        <li onClick={toggle}>
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        </li>
      </>
    );
  };

  const authedRoutes = () => {
    return (
      <>
        <li onClick={toggle}>
          <Link to="/services">Services</Link>
        </li>
        <li onClick={toggle}>
          <Link to="/services/knowledge_base">Knowledge Base</Link>
        </li>
        <li className={styles.desktopItem}>
          <button
            className="btn btn-secondary"
            color="red"
            onClick={() => logout()}
          >
            Logout
          </button>
        </li>
      </>
    );
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.name}>
        <img src="/assets/branding/logo.svg" alt="Logo" />
        <Link to="/">
          <Title order={2}>OPMS</Title>
        </Link>
      </div>
      <div className={styles.mobileMenu}>
        <Burger color="white" size="lg" opened={opened} onClick={toggle} />
      </div>
      {opened && (
        <ul className={styles.mobileItems} onClick={toggle}>
          <li onClick={toggle}>
            <Link to="/">Home</Link>
          </li>
          {!user && unauthedRoutes()}
          {user && authedRoutes()}
        </ul>
      )}
      <ul className={styles.desktopItems}>
        <li className={styles.desktopItem}>
          <Link to="/">Home</Link>
        </li>
        {!user && unauthedRoutes()}
        {user && authedRoutes()}
      </ul>
    </div>
  );
}

export default Navbar;
