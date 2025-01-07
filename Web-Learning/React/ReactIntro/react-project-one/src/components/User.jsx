import PropTypes from 'prop-types' 

const User = (props) => {
    return (
        <div>
            <h3>My Name is {props.name}</h3>
        </div>
    )
}

User.propTypes = {
    name: PropTypes.string.isRequired,
}

export default User