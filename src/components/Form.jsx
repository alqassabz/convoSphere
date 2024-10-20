import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import Home from './Home';


const Form = ({getCommunities, communities, setCommunities}) => {
const navigate = useNavigate()

  const [iconValue, setIconValue] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // List of images from the public folder
  const images = [
    { value: 'art', src: '/art.png' },
    { value: 'basketball', src: '/basketball.png' },
    { value: 'code', src: '/code.png' },
    { value: 'duck', src: '/duck.png' },
    { value: 'explore', src: '/explore.png' },
    { value: 'food', src: '/food.png' },
    { value: 'gaming', src: '/gaming.png' },
    { value: 'medical', src: '/medical.png' },
    { value: 'race', src: '/race.png' },
    { value: 'space', src: '/space.png' },
    { value: 'surf', src: '/surf.png' },
    { value: 'travel', src: '/travel.png' }
  
    // Add more images as needed
  ];

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon.value);
    setIconValue(icon.value);
    setDropdownOpen(false); // Close the dropdown after selecting
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name,
      email,
      icon: iconValue,
      description,
    };

    try {
      const response = await fetch('http://localhost:3001/communities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newCommunity = await response.json();
        console.log('Community created:', newCommunity);
        navigate("/")
      } else {
        console.error('Error creating community:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    
    
  };

  const CustomSelect = () => (
    <div className="custom-select">
      <label htmlFor="icon-select">Select an Icon:</label>
      <div 
        className="icon-selector" 
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {selectedIcon ? (
          <img
            src={images.find(image => image.value === selectedIcon)?.src}
            alt={selectedIcon}
            className="icon-preview"
          />
        ) : (
          'Select an icon'
        )}
      </div>
      {dropdownOpen && (
        <div className="dropdown-menu">
          {images.map((icon) => (
            <div 
              key={icon.value} 
              className="dropdown-item" 
              onClick={() => handleIconSelect(icon)}
            >
              <img
                src={icon.src}
                alt={icon.value}
                className="icon-option"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <form className="community-form" onSubmit={handleSubmit}>
      <h1>Create Community</h1>
      <CustomSelect />
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="submit-button">Create Community</button>
    </form>
  );
};

export default Form;