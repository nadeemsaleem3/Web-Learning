import { useState } from 'react';

// Step components
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
    console.log(formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <Step1 formData={formData} handleChange={handleChange} />
        )}
        {currentStep === 2 && (
          <Step2 formData={formData} handleChange={handleChange} />
        )}
        {currentStep === 3 && (
          <Step3 formData={formData} handleChange={handleChange} />
        )}

        <div className="buttons">
          {currentStep > 1 && (
            <button type="button" onClick={handleBack}>
              Back
            </button>
          )}
          {currentStep < 3 ? (
            <button type="button" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;