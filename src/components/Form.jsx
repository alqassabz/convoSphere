import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaLessThanEqual } from 'react-icons/fa6'

const Form = ({ getCommunities, communities, setCommunities, user }) => {
  const navigate = useNavigate()
  const [iconValue, setIconValue] = useState('')
  const [name, setName] = useState('')
  const [emails, setEmails] = useState('')
  const [description, setDescription] = useState('')
  const [selectedIcon, setSelectedIcon] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [fields, setFields] = useState([{ name: 'General', description: 'A space for open discussions, sharing ideas, and connecting with fellow community members on a variety of topics.' }])

  const BASE_URL = 'http://localhost:3001'
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
  ]

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon.value)
    setIconValue(icon.value)
    setDropdownOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const communityData = {
      icon: iconValue,
      name,
      creator: user.email,
      emails,
      description,
      fields,
      participants: user
    }

    try {
      console.log(communityData.fields)
      await axios.post(`${BASE_URL}/community`, communityData)
      navigate('/')
    } catch (error) {
      console.error('Error creating community:', error)
    }
  }

  const addField = () => {
    if (fields.length < 5) {
      setFields([...fields, ''])
    }
  }

  const removeField = (index) => {
    const newFields = fields.filter((_, i) => i !== index)
    setFields(newFields)
  }

  const handleFieldChange = (index, event, isDescription = false) => {
    const newFields = [...fields]
    if (isDescription) {
      newFields[index] = {
        ...newFields[index],
        description: event.target.value
      }
    } else {
      newFields[index] = {
        ...newFields[index],
        name: event.target.value
      }
    }
    setFields(newFields)
  }

  return (
    <form className="community-form" onSubmit={handleSubmit}>
      <h1>Create Community</h1>
      <div className="custom-select">
        <label>Select an Icon:</label>
        <div
          className="icon-selector"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {selectedIcon ? (
            <img
              src={images.find((image) => image.value === selectedIcon)?.src}
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
                <img src={icon.src} alt={icon.value} className="icon-option" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="name">Community name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="emails">Special Invitations:</label>
        <input
          type="email"
          id="emails"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
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

      <div id="new-input-container" className="form-group">
        {fields.map((field, index) => (
          <div className="dynamic-field" key={index}>
            <input
              type="text"
              className="dynamic-input"
              placeholder={`Field ${index + 1} Name`}
              value={field.name}
              onChange={(e) => handleFieldChange(index, e, false)} // For name
            />
            <input
              type="text"
              className="dynamic-input"
              placeholder={`Field ${index + 1} Description`}
              value={field.description}
              onChange={(e) => handleFieldChange(index, e, true)} // For description
            />
            <button
              type="button"
              onClick={() => removeField(index)}
              className="remove-button"
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      <button type="button" onClick={addField} className="add-button">
        ➕
      </button>

      <button type="submit" className="submit-button">
        Create Community
      </button>
    </form>
  )
}

export default Form
