Add-Type -AssemblyName System.Drawing

function Optimize-Jpg($sourcePath, $destPath, $maxWidth, $quality) {
    $img = [System.Drawing.Image]::FromFile($sourcePath)
    $origWidth = $img.Width
    $origHeight = $img.Height
    Write-Output "Original: $sourcePath ($origWidth x $origHeight)"

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

Optimize-Jpg "d:\BLOOD CELL\public\assets\heart_surface_openstax.jpg" "d:\BLOOD CELL\public\assets\heart_surface_optimized.jpg" 1200 85
Optimize-Jpg "d:\BLOOD CELL\public\assets\heart_internal_openstax.jpg" "d:\BLOOD CELL\public\assets\heart_internal_openstax_optimized.jpg" 1200 85
