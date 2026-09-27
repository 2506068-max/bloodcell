Add-Type -AssemblyName System.Drawing

function Optimize-CellImage($sourcePath, $destPath, $maxWidth, $quality) {
    $img = [System.Drawing.Image]::FromFile($sourcePath)
    $origWidth = $img.Width
    $origHeight = $img.Height

    $newWidth = $origWidth
    $newHeight = $origHeight
    if ($origWidth -gt $maxWidth) {
        $ratio = $maxWidth / $origWidth
        $newWidth = $maxWidth
        $newHeight = [int]($origHeight * $ratio)
    }

    $resized = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
    $g = [System.Drawing.Graphics]::FromImage($resized)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $g.DrawImage($img, 0, 0, $newWidth, $newHeight)
    $g.Dispose()
    $img.Dispose()

    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)

    $resized.Save($destPath, $codec, $encoderParams)
    $resized.Dispose()

    $newSize = (Get-Item $destPath).Length
    Write-Output "Saved: $destPath ($newWidth x $newHeight) Size: $([math]::Round($newSize/1024)) KB"
}

Optimize-CellImage "d:\BLOOD CELL\public\assets\blood_cells_rbc.png" "d:\BLOOD CELL\public\assets\blood_cells_rbc_optimized.jpg" 800 85
Optimize-CellImage "d:\BLOOD CELL\public\assets\blood_cells_wbc.png" "d:\BLOOD CELL\public\assets\blood_cells_wbc_optimized.jpg" 800 85
Optimize-CellImage "d:\BLOOD CELL\public\assets\blood_cells_platelets.png" "d:\BLOOD CELL\public\assets\blood_cells_platelets_optimized.jpg" 800 85
