import './Dropdown.scss'

function DropdownMenu({children, position}) {
    const posArray = position.split(/[ ]+/)
    const right = posArray[0]
    const top = posArray[1]

    return (
        <div className="DropdownMenu">
            <div className="Dropdown" style={{right: right, top: top}}>
                {children}
            </div>
        </div>
    )
}

export default DropdownMenu;