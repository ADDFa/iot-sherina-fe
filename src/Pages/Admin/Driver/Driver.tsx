import { useCallback, useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import AddDriver from "./Components/AddDriver"
import Api from "../../../Function/Api"
import Spinner from "../../../Components/Spinner"
import ParseDate from "../../../Function/ParseDate"
import DeleteDriver from "./Components/DeleteDriver"
import EditDriver from "./Components/EditDriver"
import { Icon } from "../../../Components/Icon"
import { Link } from "react-router-dom"

const Driver = () => {
    const [drivers, setDrivers] = useState<Record<string, any>[]>()

    const getDrivers = useCallback(async () => {
        const res = await Api.request("driver")
        if (res) setDrivers(res)
    }, [])

    useEffect(() => {
        getDrivers()
    }, [])

    return (
        <>
            <div className="d-flex justify-content-end gap-1 my-4">
                <AddDriver drivers={drivers} setDrivers={setDrivers} />
            </div>

            <div className="container">
                {!drivers && <Spinner />}
                {drivers && (
                    <Table>
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Tanggal Terdaftar</th>
                                <th scope="col" className="text-center">
                                    Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {drivers.map(({ id, name, created_at }, i) => (
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{name}</td>
                                    <td>{ParseDate.date(created_at)}</td>
                                    <td className="d-flex justify-content-center gap-1">
                                        <Link
                                            className="btn btn-info"
                                            to={`/admin/driver/${id}`}
                                        >
                                            <Icon icon="search" />
                                        </Link>
                                        <EditDriver
                                            id={id}
                                            drivers={drivers}
                                            setDrivers={setDrivers}
                                        />
                                        <DeleteDriver
                                            id={id}
                                            drivers={drivers}
                                            setDrivers={setDrivers}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </>
    )
}

export default Driver
