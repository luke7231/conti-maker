import { ScaleLoader } from "react-spinners";

interface Props {
    width?: number;
    height?: number;
}
function Loader({ width = 10, height = 56 }: Props) {
    return <ScaleLoader width={width} height={height} color="#ff006e" />;
}

export default Loader;
