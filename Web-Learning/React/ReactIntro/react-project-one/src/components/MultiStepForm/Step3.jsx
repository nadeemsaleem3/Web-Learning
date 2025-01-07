import PropTypes from 'prop-types';

const Step3 = ({ formData, handleChange }) => {
  return (
    <div>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

Step3.propTypes = {
    formData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
      }).isRequired,
    handleChange: PropTypes.func.isRequired,
  }

export default Step3;