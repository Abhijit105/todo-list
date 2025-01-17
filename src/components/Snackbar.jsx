import { useEffect } from "react";
import Container from "../common/Container";
import Text from "../common/Text";

function Snackbar({title, onClose}) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 3000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <Container cx={'snackbar'}>
            <Text cx={'snackbar-text'} title={title} />
        </Container>
    )
}

export default Snackbar