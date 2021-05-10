import React from "react";
import PropTypes from "prop-types";
import { Navbar, Container } from "react-bootstrap";
import ModeToggle from "./ModeToggle";

function Nav({ show, setShow }) {
	return (
		<Navbar className="py-3" expand="lg" variant="dark" bg="dark" sticky="top">
			<Container>
				<Navbar.Brand href="/">Topshot Filter</Navbar.Brand>
				<ModeToggle show={show} setShow={setShow} />
			</Container>
		</Navbar>
	);
}

Nav.propTypes = {
	show: PropTypes.bool,
	setShow: PropTypes.func,
};

export default Nav;
