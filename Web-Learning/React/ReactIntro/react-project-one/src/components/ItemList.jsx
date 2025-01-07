import { useState } from 'react';

const ItemList = () => {
  // Initialize the list of items with a 'likeCount' and 'liked' state
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', likeCount: 0, liked: false },
    { id: 2, name: 'Item 2', likeCount: 0, liked: false },
    { id: 3, name: 'Item 3', likeCount: 0, liked: false },
  ]);

  // Function to handle the like/unlike toggle
  const handleLikeToggle = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              liked: !item.liked,
              likeCount: item.liked ? item.likeCount - 1 : item.likeCount + 1,
            }
          : item
      )
    );
  };

  return (
    <div>
      <h1>Item List</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{listStyleType: 'none'}}>
            <div>
              <span>{item.name}</span>
              <button onClick={() => handleLikeToggle(item.id)}>
                {item.liked ? 'Unlike' : 'Like'}
              </button>
              <span> Likes: {item.likeCount}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;