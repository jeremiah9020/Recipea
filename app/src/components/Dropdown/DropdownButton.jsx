import './Dropdown.scss'

function DropdownButton({Name,Click}) {
    return (
        <button className="DropdownButton" onClick={Click}>
            {Name}
        </button>
    )
}

export default DropdownButton;