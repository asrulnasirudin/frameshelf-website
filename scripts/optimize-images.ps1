<#
.SYNOPSIS
  Resize source images into web-ready JPEG renditions for the sample library.

.DESCRIPTION
  Windows-only helper (uses System.Drawing from .NET). For each PNG/JPEG in -Source
  it writes <name>-<width>.jpg for every width in -Widths into -Destination.
  Use it when swapping sample media: drop new originals in
  local/production-assets/generated and rerun, then update src/data/sampleLibrary.ts.

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File scripts/optimize-images.ps1
#>
param(
  [string]$Source = (Join-Path $PSScriptRoot '..' | Join-Path -ChildPath 'local' | Join-Path -ChildPath 'production-assets' | Join-Path -ChildPath 'generated'),
  [string]$Destination = (Join-Path $PSScriptRoot '..' | Join-Path -ChildPath 'public' | Join-Path -ChildPath 'media' | Join-Path -ChildPath 'library'),
  [int[]]$Widths = @(480, 960),
  [int]$Quality = 80
)

Add-Type -AssemblyName System.Drawing
New-Item -ItemType Directory -Force -Path $Destination | Out-Null

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]$Quality)

Get-ChildItem -Path $Source -File | Where-Object { $_.Extension -match '^\.(png|jpe?g)$' } | ForEach-Object {
  $img = [System.Drawing.Image]::FromFile($_.FullName)
  try {
    foreach ($w in $Widths) {
      $targetW = [Math]::Min($w, $img.Width)
      $targetH = [int][Math]::Round($img.Height * $targetW / $img.Width)
      $bmp = New-Object System.Drawing.Bitmap $targetW, $targetH
      $g = [System.Drawing.Graphics]::FromImage($bmp)
      $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $g.DrawImage($img, 0, 0, $targetW, $targetH)
      $out = Join-Path $Destination ("{0}-{1}.jpg" -f $_.BaseName, $w)
      $bmp.Save($out, $codec, $params)
      $g.Dispose(); $bmp.Dispose()
      Write-Output ("{0}  {1}x{2}" -f (Split-Path $out -Leaf), $targetW, $targetH)
    }
  } finally { $img.Dispose() }
}
