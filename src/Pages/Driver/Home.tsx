import { useEffect, useState } from "react"
import { Card, Container } from "react-bootstrap"
import Auth from "../../Function/Auth"
import { db } from "../../Function/Firebase"
import { onValue, ref } from "firebase/database"
import type { DataSnapshot } from "firebase/database"
import Spinner from "../../Components/Spinner"
import Api from "../../Function/Api"

const Home = () => {
    const [driver] = useState<Record<string, any>>(
        Auth.auth.payload?.driver || {}
    )
    const [blink, setBlink] = useState<Record<string, any>>()
    const [bpm, setBpm] = useState<Record<string, any>>()

    useEffect(() => {
        const timeout = setTimeout(() => {
            onValue(ref(db), (dataSnapshot: DataSnapshot) => {
                const {
                    IOT: { latest },
                    data_kedipan_2: { 0: data_kedipan }
                } = dataSnapshot.val()
                setBlink(data_kedipan)
                setBpm(latest)

                const body = new FormData()
                body.append("blink_count", data_kedipan.blink_count)
                body.append("eye_status", data_kedipan.eye_status.split(" ")[1])
                body.append("state_status", data_kedipan.status_keadaan)
                body.append("spO2", latest.SpO2)
                body.append("bpm", latest.bpm)
                body.append("bpm_status", latest.keadaan)

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

                    {!blink && <Spinner />}

                    {blink && bpm && (
                        <table className="table mt-4">
                            <tbody>
                                <tr>
                                    <th scope="row">Jumlah Kedipan</th>
                                    <td>:</td>
                                    <td>{blink.blink_count || 0}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Detak Jantung</th>
                                    <td>:</td>
                                    <td>{bpm.bpm}</td>
                                </tr>
                                <tr>
                                    <th scope="row">SP02</th>
                                    <td>:</td>
                                    <td>{bpm.SpO2}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Status Mata</th>
                                    <td>:</td>
                                    <td>{blink.eye_status || "-"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Keadaan (Detak Jantung)</th>
                                    <td>:</td>
                                    <td>{bpm.keadaan}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Keadaan (Mata)</th>
                                    <td>:</td>
                                    <td>{blink.status_keadaan || "0"}</td>
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
