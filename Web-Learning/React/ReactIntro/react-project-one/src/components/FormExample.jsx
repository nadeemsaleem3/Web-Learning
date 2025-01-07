import { useState } from 'react';

const FormExample = () => {
  // Initial state object to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  // Handle changes to input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value // Update the specific property in the state
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can process formData here (e.g., send it to an API)
    console.log('Form data submitted:', formData);
    setFormData({
        name: '',
        email: ''
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormExample;
