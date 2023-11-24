import { Container } from "react-bootstrap";
import style from "./NavBar.module.css";
import { BiSolidFoodMenu } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={style.NavBar}>
      <Container className="d-flex justify-content-between align-items-center">
        <div className={style.img}>
          <img src="/quranImg.png" alt="img" />
        </div>
        <div className={style.menu} id="clickable">
          <NavLink to="/">
          <BiSolidFoodMenu size={30} fill="white" />
          </NavLink>
        </div>
        <Tooltip anchorSelect="#clickable" clickable>
          عرض الفهرس
        </Tooltip>
      </Container>
    </div>
  );
};

export default NavBar;
