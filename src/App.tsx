import { useEffect, useState } from "react"

type Cell = {
  id: number
  name: string
  latin: string
  function: string
  color: string
  icon: string
}

function App() {
  const [cells, setCells] = useState<Cell[]>([])

  useEffect(() => {
    fetch("/api/cells")
      .then((res) => res.json())
      .then((data) => {
        setCells(data.data)
      })
      .catch((error) => {
        console.error("Gagal ambil data:", error)
      })
  }, [])

  return (
    <div>
      <h1>Blood Cell Edu</h1>

      {cells.map((cell) => (
        <div key={cell.id}>
          <h2>{cell.icon} {cell.name}</h2>
          <p>{cell.latin}</p>
          <p>{cell.function}</p>
          <p>{cell.color}</p>
        </div>
      ))}
    </div>
  )
}

export default App