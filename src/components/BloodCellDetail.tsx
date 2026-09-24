import MicroscopicBloodCells from './anatomical/MicroscopicBloodCells'

interface BloodCellDetailProps {
  cellType?: 'rbc' | 'wbc' | 'platelet' | 'oxygen' | 'co2' | 'glucose'
}

export default function BloodCellDetail({ cellType: _cellType }: BloodCellDetailProps) {
  return (
    <div className="w-full">
      <MicroscopicBloodCells />
    </div>
  )
}
