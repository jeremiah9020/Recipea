import './Dropdown.scss'

function DropdownItem({children,className}) {
    return (
        <div className={"DropdownItem " + className}>
            {children}
        </div>
    )
}

export default DropdownItem;