import './Dropdown.scss'

function DropdownItem({children}) {
    return (
        <div className="DropdownItem">
            {children}
        </div>
    )
}

export default DropdownItem;