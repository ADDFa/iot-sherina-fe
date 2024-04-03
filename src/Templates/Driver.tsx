import { NavLink, Outlet } from "react-router-dom"
import { Icon } from "../Components/Icon"
import SignOutButton from "../Components/SignOutButton"

const Driver = () => {
    return (
        <>
            <nav className="navbar fixed-bottom bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold" href="#">
                        IOT
                    </a>

                    <ul className="navbar-nav flex-row gap-3 align-items-center">
                        <li className="nav-item">
                            <NavLink
                                to="/driver"
                                className="nav-link fs-4 fw-bold"
                                title="Dashboard"
                            >
                                <Icon icon="house-door-fill" />
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <SignOutButton />
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="overflow-hidden px-2 py-4 mb-5">
                <h1 className="fs-4 fw-bold mb-5">
                    Pemantauan Tingkat Kelelahan Driver
                </h1>
                <Outlet />
            </div>
        </>
    )
}

export default Driver
