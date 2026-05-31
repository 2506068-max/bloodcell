import { useEffect, useState } from "react"

type Cell = {
  id: number
  name: string
  function: string
}

function App() {
  const [cells, setCells] = useState<Cell[]>([])

  useEffect(() => {
    fetch("/api/cells")
      .then((res) => res.json())
      .then((data) => {
        setCells(data.data)
      })
      .catch((err) => {
        console.error("Gagal ambil data:", err)
      })
  }, [])

  return (
    <div>
      <h1>Blood Cell Edu</h1>

      {cells.map((cell) => (
        <div key={cell.id}>
          <h2>{cell.name}</h2>
          <p>{cell.function}</p>
        </div>
      ))}
    </div>
  )
}

export default App