# Image Compression Script for Sanrakshan India
# This script requires ImageMagick to be installed
# Download from: https://imagemagick.org/script/download.php

Write-Host "Checking for ImageMagick..." -ForegroundColor Cyan

# Check if ImageMagick is installed
$magickPath = Get-Command magick -ErrorAction SilentlyContinue

if (-not $magickPath) {
    Write-Host "ImageMagick is not installed!" -ForegroundColor Red
    Write-Host "Please install ImageMagick from: https://imagemagick.org/script/download.php" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Alternative: Use online tools like https://tinypng.com" -ForegroundColor Green
    exit
}

Write-Host "ImageMagick found! Starting compression..." -ForegroundColor Green
Write-Host ""

# Create backup folder
$backupFolder = "img_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
Write-Host "Creating backup folder: $backupFolder" -ForegroundColor Cyan
New-Item -ItemType Directory -Path $backupFolder -Force | Out-Null

# Get all images
$images = Get-ChildItem -Path img -Recurse -Include *.jpg,*.jpeg,*.png,*.JPG,*.JPEG,*.PNG

$totalImages = $images.Count
$processed = 0
$totalSaved = 0

Write-Host "Found $totalImages images to compress" -ForegroundColor Cyan
Write-Host ""

foreach ($image in $images) {
    $processed++
    $originalSize = $image.Length
    
    Write-Progress -Activity "Compressing Images" -Status "Processing $($image.Name)" -PercentComplete (($processed / $totalImages) * 100)
    
    try {
        # Compress image (reduce quality to 85%, resize if larger than 1920px)
        $tempFile = "$($image.FullName).tmp"
        
        & magick convert "$($image.FullName)" -quality 85 -resize "1920x1920>" "$tempFile"
        
        if (Test-Path $tempFile) {
            $newSize = (Get-Item $tempFile).Length
            
            # Only replace if compressed version is smaller
            if ($newSize -lt $originalSize) {
                $saved = $originalSize - $newSize
                $totalSaved += $saved
                
                # Backup original
                $relativePath = $image.FullName.Replace((Get-Location).Path + "\img\", "")
                $backupPath = Join-Path $backupFolder $relativePath
                $backupDir = Split-Path $backupPath -Parent
                
                if (-not (Test-Path $backupDir)) {
                    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
                }
                
                Copy-Item $image.FullName $backupPath -Force
                
                # Replace with compressed version
                Move-Item $tempFile $image.FullName -Force
                
                $savedMB = [math]::Round($saved/1MB, 2)
                Write-Host "✓ $($image.Name) - Saved: $savedMB MB" -ForegroundColor Green
            } else {
                Remove-Item $tempFile -Force
                Write-Host "○ $($image.Name) - Already optimized" -ForegroundColor Yellow
            }
        }
    } catch {
        Write-Host "✗ Failed to compress $($image.Name): $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Compression Complete!" -ForegroundColor Green
Write-Host "Total space saved: $([math]::Round($totalSaved/1MB, 2)) MB" -ForegroundColor Cyan
Write-Host "Backup location: $backupFolder" -ForegroundColor Cyan
Write-Host ""
Write-Host "If you're happy with the results, you can delete the backup folder." -ForegroundColor Yellow
