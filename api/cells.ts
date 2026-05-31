export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      message: "Blood Cell API aktif",
      data: [
        {
          id: 1,
          name: "Sel Darah Merah",
          function: "Mengangkut oksigen"
        },
        {
          id: 2,
          name: "Sel Darah Putih",
          function: "Melawan infeksi"
        },
        {
          id: 3,
          name: "Trombosit",
          function: "Pembekuan darah"
        }
      ]
    })
  }

  return res.status(405).json({
    success: false,
    message: "Method tidak diizinkan"
  })
}