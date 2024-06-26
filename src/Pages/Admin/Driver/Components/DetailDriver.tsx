import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Api from "../../../../Function/Api"
import Spinner from "../../../../Components/Spinner"
import { Card } from "react-bootstrap"
import ParseDate from "../../../../Function/ParseDate"

const DetailDriver = () => {
    const { id } = useParams()
    const [driver, setDriver] = useState<Driver.Driver>()

    const getDriver = useCallback(async (id: string | number) => {
        const driver = await Api.request(`driver-status/${id}`)
        if (driver) setDriver(driver)
    }, [])

    useEffect(() => {
        if (id) getDriver(id)
    }, [])

    return (
        <div className="container">
            {!driver && <Spinner />}

            {driver && (
                <Card className="card-body border-0 shadow-sm">
                    <h2 className="fs-4 mb-0">{driver.name}</h2>
                    <hr />

                    <div className="mt-3">
                        <table className="table table-bordered text-center">
                            <thead className="align-top">
                                <tr>
                                    <th scope="col" rowSpan={2}>
                                        No
                                    </th>
                                    <th scope="col" rowSpan={2}>
                                        Tanggal & Waktu
                                    </th>
                                    <th scope="col" colSpan={3}>
                                        Status
                                    </th>
                                    <th scope="col" rowSpan={2}>
                                        Keadaan
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="col">BPM</th>
                                    <th scope="col">SpO2</th>
                                    <th scope="col">Kedipan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {driver.status?.map(
                                    (
                                        {
                                            id,
                                            blink_count,
                                            state_status,
                                            bpm,
                                            spO2,
                                            updated_at
                                        }: Record<string, any>,
                                        i: number
                                    ) => (
                                        <tr key={id}>
                                            <th scope="row">{++i}</th>
                                            <td>
                                                {ParseDate.date(updated_at)}
                                            </td>
                                            <td>{bpm}</td>
                                            <td>{spO2}</td>
                                            <td>{blink_count}/menit</td>
                                            <td
                                                className={`bg-${
                                                    state_status === "Lelah"
                                                        ? "warning"
                                                        : "success"
                                                }`}
                                            >
                                                {state_status}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    )
}

export default DetailDriver
