Add-Type -AssemblyName System.Drawing

$projectDir = "C:\Users\madya\OneDrive\Microsoft Copilot Chat Files\Purifier Water Business Ramesh"
$publicDir = Join-Path $projectDir "public"

$dirs = @(
    "images\brand",
    "images\products\water-purifiers",
    "images\products\fridges",
    "images\products\washing-machines",
    "images\products\air-coolers",
    "images\products\ac-spare-parts",
    "images\gallery",
    "videos"
)

foreach ($d in $dirs) {
    $targetPath = Join-Path $publicDir $d
    if (-not (Test-Path $targetPath)) {
        New-Item -ItemType Directory -Path $targetPath -Force | Out-Null
    }
}

$srcDir = "C:\Users\madya\OneDrive\New folder - Copy\New folder\Pictures"

# 1. Copy promotional video
$videoSrc = Join-Path $srcDir "WhatsApp Video 2026-11-02 at 7.20.22 PM.mp4"
$videoDst = Join-Path $publicDir "videos\promotional-video.mp4"
if (Test-Path $videoSrc) {
    Copy-Item $videoSrc $videoDst -Force
    Write-Host "Copied promotional-video.mp4"
}

# 2. Copy banners & posters
$bannerSrc = Join-Path $srcDir "WhatsApp Image 2026-11-02 at 7.20.22 PM.jpeg"
$posterSrc = Join-Path $srcDir "WhatsApp Image 2026-11-02 at 7.25.39 PM.jpeg"
$heroRefSrc = Join-Path $srcDir "Antalya Su Aritma Cihazi _ Umar Su Aritma Satis & Teknik Servis.jpg"
$contactSheetSrc = Join-Path $srcDir "Analysis output 1.png"

Copy-Item $posterSrc (Join-Path $publicDir "images\brand\business-poster.jpg") -Force
Copy-Item $bannerSrc (Join-Path $publicDir "images\brand\business-banner.jpg") -Force
Copy-Item $heroRefSrc (Join-Path $publicDir "images\brand\hero-water-purifiers.jpg") -Force

Write-Host "Copied primary assets."

# Function to crop and save an image
function Crop-Image($sourcePath, $targetPath, $x, $y, $w, $h) {
    $srcImg = [System.Drawing.Bitmap]::FromFile($sourcePath)
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($cropped)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($srcImg, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $cropped.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $cropped.Dispose()
    $srcImg.Dispose()
    Write-Host "Created $targetPath"
}

# Inspect dimensions of business-banner.jpg
$bannerBmp = [System.Drawing.Bitmap]::FromFile($bannerSrc)
$bWidth = $bannerBmp.Width
$bHeight = $bannerBmp.Height
$bannerBmp.Dispose()
Write-Host "Banner dimensions: $bWidth x $bHeight"

# Extract Logo from Banner (Centered at top)
# Priya's Aquafresh logo is roughly X: 32% to 65%, Y: 2% to 23%
$logoX = [int]($bWidth * 0.32)
$logoY = [int]($bHeight * 0.02)
$logoW = [int]($bWidth * 0.33)
$logoH = [int]($bHeight * 0.22)
Crop-Image $bannerSrc (Join-Path $publicDir "images\brand\business-logo.png") $logoX $logoY $logoW $logoH

# Extract left purifier from banner
$pur1X = [int]($bWidth * 0.015)
$pur1Y = [int]($bHeight * 0.09)
$pur1W = [int]($bWidth * 0.175)
$pur1H = [int]($bHeight * 0.44)
Crop-Image $bannerSrc (Join-Path $publicDir "images\products\water-purifiers\domestic-ro-transparent.png") $pur1X $pur1Y $pur1W $pur1H

# Extract top right sleek purifier from banner
$pur2X = [int]($bWidth * 0.82)
$pur2Y = [int]($bHeight * 0.23)
$pur2W = [int]($bWidth * 0.165)
$pur2H = [int]($bHeight * 0.36)
Crop-Image $bannerSrc (Join-Path $publicDir "images\products\water-purifiers\priya-aquafresh-sleek-ro.png") $pur2X $pur2Y $pur2W $pur2H

# Extract bottom right 5-stage open purifier from banner
$pur3X = [int]($bWidth * 0.82)
$pur3Y = [int]($bHeight * 0.60)
$pur3W = [int]($bWidth * 0.17)
$pur3H = [int]($bHeight * 0.32)
Crop-Image $bannerSrc (Join-Path $publicDir "images\products\water-purifiers\five-stage-ro-filtration.png") $pur3X $pur3Y $pur3W $pur3H

# Inspect dimensions of vertical poster
$posterBmp = [System.Drawing.Bitmap]::FromFile($posterSrc)
$pWidth = $posterBmp.Width
$pHeight = $posterBmp.Height
$posterBmp.Dispose()
Write-Host "Poster dimensions: $pWidth x $pHeight"

# Extract Lasya Logo with water drop from vertical poster (Left middle)
# Roughly X: 2% to 48%, Y: 22% to 36%
$lasyaLogoX = [int]($pWidth * 0.01)
$lasyaLogoY = [int]($pHeight * 0.22)
$lasyaLogoW = [int]($pWidth * 0.47)
$lasyaLogoH = [int]($pHeight * 0.14)
Crop-Image $posterSrc (Join-Path $publicDir "images\brand\lasya-brand-logo.png") $lasyaLogoX $lasyaLogoY $lasyaLogoW $lasyaLogoH

# Extract 1-Year Guarantee badge from poster
$guarX = [int]($pWidth * 0.84)
$guarY = [int]($pHeight * 0.21)
$guarW = [int]($pWidth * 0.14)
$guarH = [int]($pHeight * 0.13)
Crop-Image $posterSrc (Join-Path $publicDir "images\brand\one-year-guarantee-badge.png") $guarX $guarY $guarW $guarH

# Extract Product Categories Row from vertical poster:
# Y is roughly 60% to 70% of poster
$catY = [int]($pHeight * 0.605)
$catH = [int]($pHeight * 0.125)

# Water Purifiers category card
$cat1X = [int]($pWidth * 0.02)
$cat1W = [int]($pWidth * 0.19)
Crop-Image $posterSrc (Join-Path $publicDir "images\products\water-purifiers\category-purifiers.png") $cat1X $catY $cat1W $catH

# Fridges category card
$cat2X = [int]($pWidth * 0.24)
$cat2W = [int]($pWidth * 0.17)
Crop-Image $posterSrc (Join-Path $publicDir "images\products\fridges\category-fridges.png") $cat2X $catY $cat2W $catH

# Washing Machines category card
$cat3X = [int]($pWidth * 0.42)
$cat3W = [int]($pWidth * 0.19)
Crop-Image $posterSrc (Join-Path $publicDir "images\products\washing-machines\category-washing-machines.png") $cat3X $catY $cat3W $catH

# Air Coolers category card
$cat4X = [int]($pWidth * 0.62)
$cat4W = [int]($pWidth * 0.17)
Crop-Image $posterSrc (Join-Path $publicDir "images\products\air-coolers\category-air-coolers.png") $cat4X $catY $cat4W $catH

# AC Spare Parts category card
$cat5X = [int]($pWidth * 0.80)
$cat5W = [int]($pWidth * 0.18)
Crop-Image $posterSrc (Join-Path $publicDir "images\products\ac-spare-parts\category-ac-spare-parts.png") $cat5X $catY $cat5W $catH

# Also extract the woman drinking pure water (top portion)
$drkW = [int]($pWidth * 0.48)
$drkH = [int]($pHeight * 0.22)
Crop-Image $posterSrc (Join-Path $publicDir "images\brand\pure-drinking-water-health.png") 0 0 $drkW $drkH

Write-Host "All assets prepared and cropped successfully!"
