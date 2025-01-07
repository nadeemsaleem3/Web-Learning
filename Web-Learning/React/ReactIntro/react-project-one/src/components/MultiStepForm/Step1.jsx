import PropTypes from 'prop-types';

const Step1 = ({ formData, handleChange }) => {
  return (
    <div>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

Step1.propTypes = {
    formData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
      }).isRequired,
    handleChange: PropTypes.func.isRequired,
  }

export default Step1;