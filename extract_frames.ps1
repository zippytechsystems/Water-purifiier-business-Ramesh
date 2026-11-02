Add-Type -AssemblyName System.Drawing
$b = [System.Drawing.Bitmap]::FromFile("C:\Users\madya\OneDrive\New folder - Copy\New folder\Pictures\Analysis output 1.png")
$outDir = "C:\Users\madya\OneDrive\Microsoft Copilot Chat Files\Purifier Water Business Ramesh\public\images\gallery"

# In 990 x 1250, each grid cell:
# 3 columns across 990:
# Col 1 roughly X: 100 to 228 (width 128)
# Col 2 roughly X: 432 to 560 (width 128)
# Col 3 roughly X: 764 to 892 (width 128)
# 5 rows across 1250:
# Height of each frame is ~170 to 175px
# Row 0: Y: 2 to 175 (label is below at Y: 180)
# Row 1: Y: 202 to 375
# Row 2: Y: 402 to 575
# Row 3: Y: 602 to 775
# Row 4: Y: 802 to 975

$cols = @(
    @{ x = 102; w = 125 },
    @{ x = 434; w = 125 },
    @{ x = 764; w = 125 }
)

$rows = @(
    @{ y = 2; h = 175 },
    @{ y = 202; h = 175 },
    @{ y = 402; h = 175 },
    @{ y = 602; h = 175 },
    @{ y = 802; h = 175 }
)

$frameNames = @(
    @("frame-02-water-dispenser.png", "frame-08-showroom-host.png", "frame-09-ac-spare-parts.png"),
    @("frame-04-purifier-display.png", "frame-12-host-greeting.png", "frame-13-host-welcome.png"),
    @("frame-10-purifier-contacts.png", "frame-03-pure-water-glass.png", "frame-01-host-water.png"),
    @("frame-07-air-coolers-appliances.png", "frame-11-pure-water-stream.png", "frame-05-one-year-guarantee.png"),
    @("frame-06-lasya-purifiers.png", "frame-14-priya-aquafresh-card.png", $null)
)

for ($r = 0; $r -lt 5; $r++) {
    for ($c = 0; $c -lt 3; $c++) {
        $name = $frameNames[$r][$c]
        if ($name) {
            $x = $cols[$c].x
            $y = $rows[$r].y
            $w = $cols[$c].w
            $h = $rows[$r].h
            $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
            $cropped = New-Object System.Drawing.Bitmap($w, $h)
            $g = [System.Drawing.Graphics]::FromImage($cropped)
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.DrawImage($b, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
            $target = Join-Path $outDir $name
            $cropped.Save($target, [System.Drawing.Imaging.ImageFormat]::Png)
            $g.Dispose()
            $cropped.Dispose()
            Write-Host "Saved $name"
        }
    }
}

$b.Dispose()
Write-Host "Gallery frames extracted!"
