export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      message: "Blood Cell API aktif",
      data: [
        {
          id: 1,
          name: "Sel Darah Merah",
          latin: "Erythrocyte",
          function: "Mengangkut oksigen ke seluruh tubuh",
          color: "Merah",
          icon: "🩸"
        },
        {
          id: 2,
          name: "Sel Darah Putih",
          latin: "Leukocyte",
          function: "Melawan infeksi dan menjaga imun tubuh",
          color: "Putih",
          icon: "🛡️"
        },
        {
          id: 3,
          name: "Trombosit",
          latin: "Platelet",
          function: "Membantu proses pembekuan darah",
          color: "Ungu",
          icon: "🧬"
        }
      ]
    })
  }

  return res.status(405).json({
    success: false,
    message: "Method tidak diizinkan"
  })
}