import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export function NextArrow({ onClick }) {
    return (
        <div className="nextArrow" onClick={onClick}>
            <FaAngleRight size={30} />
        </div>
    );
}

export function PrevArrow({ onClick }) {
    return (
        <div className="prevArrow" onClick={onClick}>
            <FaAngleLeft size={30} />
        </div>
    );
}
