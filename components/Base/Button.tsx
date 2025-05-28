
interface ButtonProps {
    children : React.ReactElement;
}

const Button : React.FC<ButtonProps> = ({ children }) => {
    return (
        <>
            {children}
        </>
    );
}

export default Button;