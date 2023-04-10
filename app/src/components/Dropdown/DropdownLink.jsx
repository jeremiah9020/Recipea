import './Dropdown.scss'
import { Link } from "react-router-dom";

function DropdownLink({To,Name}) {
    return (
        <div className="DropdownLink">
            <Link className="Link" to={To}>
                {Name}
            </Link>
        </div>
       
    )
}

export default DropdownLink;