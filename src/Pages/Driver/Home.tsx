import { useEffect, useState } from "react"
import { Card, Container } from "react-bootstrap"
import Auth from "../../Function/Auth"
import { db } from "../../Function/Firebase"
import { onValue, ref } from "firebase/database"
import type { DataSnapshot } from "firebase/database"
import Spinner from "../../Components/Spinner"
import Api from "../../Function/Api"

const Home = () => {
    const targetData = "data_kedipan_2/0"
    const [driver] = useState<Record<string, any>>(
        Auth.auth.payload?.driver || {}
    )
    const [flashData, setFlashData] = useState<Record<string, any>>()

    useEffect(() => {
        const timeout = setTimeout(() => {
            onValue(ref(db, targetData), (dataSnapshot: DataSnapshot) => {
                const data = dataSnapshot.val()
                setFlashData(data)

                const body = new FormData()
                body.append("blink_count", data.blink_count)
                body.append("confidence", data.confidence)
                body.append("eye_status", data.eye_status.split(" ")[1])
                body.append("state_status", data.status_keadaan)

                Api.request(`driver-status/${driver.id}/upsert`, { body })
            })
        }, 500)
        return () => {
            clearTimeout(timeout)
        }
    }, [])

    return (
        <Container>
            <Card className="mx-auto col-lg-4 col-md-6 col-12">
                <Card.Body>
                    <h1 className="fs-4 text-center">{driver.name}</h1>
                    <hr />

                    {!flashData && <Spinner />}

                    {flashData && (
                        <table className="table mt-4">
                            <tbody>
                                <tr>
                                    <th scope="row">Jumlah Kedipan</th>
                                    <td>:</td>
                                    <td>{flashData.blink_count || 0}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Detak Jantung</th>
                                    <td>:</td>
                                    <td>{0}</td>
                                </tr>
                                <tr>
                                    <th scope="row">SP02</th>
                                    <td>:</td>
                                    <td>{0}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Status Mata</th>
                                    <td>:</td>
                                    <td>{flashData.eye_status || "-"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Keadaan (Detak Jantung)</th>
                                    <td>:</td>
                                    <td>{0}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Keadaan (Mata)</th>
                                    <td>:</td>
                                    <td>{flashData.status_keadaan || "0"}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Home
