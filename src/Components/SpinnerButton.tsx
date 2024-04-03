import { FC } from "react"
import { Button, Spinner } from "react-bootstrap"

const SpinnerButton: FC<SpinnerButtonI> = ({ hidden, children, ...rest }) => {
    return (
        <Button variant="success" type="submit" {...rest}>
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-1"
                hidden={hidden}
            />
            {children}
        </Button>
    )
}

export default SpinnerButton
