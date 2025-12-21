import { useState } from 'react'
import './Room.css'

type Item = {
  id: string
  name: string
  description: string
}

const ITEMS: Item[] = [
  {
    id: 'desk',
    name: 'Desk',
    description: 'Place-holder text'
  }
]

function Room() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  return (
    <div className="room-container">
      <div className="room-background">
        {ITEMS.map(item => (
          <button
            key={item.id}
            className="room-item desk"
            onClick={() => setSelectedItem(item)}
          >
            📦
          </button>
        ))}
      </div>

      {selectedItem && (
        <aside className="side-panel">
          <button
            className="close-button"
            onClick={() => setSelectedItem(null)}
          >
            ×
          </button>

          <h2>{selectedItem.name}</h2>
          <p>{selectedItem.description}</p>
        </aside>
      )}
    </div>
  )
}

export default Room