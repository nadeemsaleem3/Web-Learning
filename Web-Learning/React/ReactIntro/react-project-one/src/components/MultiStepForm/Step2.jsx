import PropTypes from 'prop-types';

const Step2 = ({ formData, handleChange }) => {
  return (
    <div>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

Step2.propTypes = {
    formData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
      }).isRequired,
    handleChange: PropTypes.func.isRequired,
  }

export default Step2;