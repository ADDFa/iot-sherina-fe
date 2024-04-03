import { Link } from "react-router-dom"
import { Icon } from "../../../Components/Icon"
import { Card, Col, Row } from "react-bootstrap"
import { useCallback, useEffect, useState } from "react"
import Api from "../../../Function/Api"
import DriverGraph from "./Components/DriverGraph"

const Dashboard = () => {
    const [drivers, setDrivers] = useState<Record<string, any>[]>()
    const [driversStatuses, setDriversStatuses] =
        useState<Record<string, any>[]>()

    const getDrivers = useCallback(async () => {
        const drivers = await Api.request("driver")
        if (drivers) setDrivers(drivers)
    }, [])

    const getDriversStatuses = useCallback(async () => {
        let path = "driver-status"
        path += `?filter=theLastSevenData`

        const driversStatuses = await Api.request(path)
        if (driversStatuses) setDriversStatuses(driversStatuses)
        console.log({ driversStatuses })
    }, [])

    useEffect(() => {
        getDrivers()
        getDriversStatuses()
    }, [])

    return (
        <Row md={2}>
            <Col md={6} lg={3}>
                <Card className="rounded-0">
                    <Card.Body>
                        <div className="d-flex justify-content-between">
                            <h5 className="card-title">Jumlah Pengemudi</h5>
                            <Link to="/admin/driver" className="link">
                                <Icon
                                    icon="kanban"
                                    className="fs-5"
                                    role="button"
                                    title="Kelola"
                                />
                            </Link>
                        </div>

                        <div className="text-end">
                            <p className="fs-1 fw-bold m-0">
                                {drivers ? drivers.length : "-"}
                            </p>
                        </div>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={6} lg={9} className="mt-4 mt-md-0">
                {driversStatuses && (
                    <DriverGraph driverStatuses={driversStatuses} />
                )}
            </Col>
        </Row>
    )
}

export default Dashboard
