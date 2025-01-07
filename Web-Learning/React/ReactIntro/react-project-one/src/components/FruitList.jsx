
const FruitList = () => {
    const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

    const listStyle = {
        listStyleType: 'none',
      };

  return (
    <div>
        <h2>Fruits List</h2>
          <ul style={listStyle}>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
    </div>
  )
}

export default FruitList