import Spin from "react-bootstrap/Spinner"

const Spinner = () => {
    return (
        <div className="text-center">
            <Spin animation="border" role="status" />
        </div>
    )
}

export default Spinner
