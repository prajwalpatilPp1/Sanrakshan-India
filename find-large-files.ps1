# PowerShell Script to Find Large Files
# Run this to identify files that need optimization

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "FINDING LARGE FILES FOR OPTIMIZATION" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Find images larger than 2MB
Write-Host "📸 IMAGES LARGER THAN 2MB:" -ForegroundColor Yellow
Write-Host "-----------------------------------"
Get-ChildItem -Path "img" -Recurse -File -Include *.jpg,*.jpeg,*.png,*.JPG,*.JPEG,*.PNG | 
    Where-Object {$_.Length -gt 2MB} | 
    Sort-Object Length -Descending | 
    Select-Object @{Name="File";Expression={$_.FullName.Replace((Get-Location).Path + "\","")}}, 
                  @{Name="Size(MB)";Expression={[math]::Round($_.Length/1MB,2)}} |
    Format-Table -AutoSize

# Find PDFs larger than 5MB
Write-Host ""
Write-Host "📄 PDFs LARGER THAN 5MB:" -ForegroundColor Yellow
Write-Host "-----------------------------------"
Get-ChildItem -Path "img" -Recurse -File -Include *.pdf,*.PDF | 
    Where-Object {$_.Length -gt 5MB} | 
    Sort-Object Length -Descending | 
    Select-Object @{Name="File";Expression={$_.FullName.Replace((Get-Location).Path + "\","")}}, 
                  @{Name="Size(MB)";Expression={[math]::Round($_.Length/1MB,2)}} |
    Format-Table -AutoSize

# Summary
Write-Host ""
Write-Host "📊 SUMMARY:" -ForegroundColor Green
Write-Host "-----------------------------------"
$totalImages = (Get-ChildItem -Path "img" -Recurse -File -Include *.jpg,*.jpeg,*.png,*.JPG,*.JPEG,*.PNG | Measure-Object -Property Length -Sum)
$totalPDFs = (Get-ChildItem -Path "img" -Recurse -File -Include *.pdf,*.PDF | Measure-Object -Property Length -Sum)
$largeImages = (Get-ChildItem -Path "img" -Recurse -File -Include *.jpg,*.jpeg,*.png,*.JPG,*.JPEG,*.PNG | Where-Object {$_.Length -gt 2MB} | Measure-Object -Property Length -Sum)
$largePDFs = (Get-ChildItem -Path "img" -Recurse -File -Include *.pdf,*.PDF | Where-Object {$_.Length -gt 5MB} | Measure-Object -Property Length -Sum)

Write-Host "Total Images: $($totalImages.Count) files, $([math]::Round($totalImages.Sum/1MB,2)) MB"
Write-Host "Total PDFs: $($totalPDFs.Count) files, $([math]::Round($totalPDFs.Sum/1MB,2)) MB"
Write-Host ""
Write-Host "Images >2MB: $($largeImages.Count) files, $([math]::Round($largeImages.Sum/1MB,2)) MB" -ForegroundColor Red
Write-Host "PDFs >5MB: $($largePDFs.Count) files, $([math]::Round($largePDFs.Sum/1MB,2)) MB" -ForegroundColor Red
Write-Host ""
Write-Host "💡 TIP: Focus on optimizing these large files first!" -ForegroundColor Cyan
Write-Host "    Use TinyPNG.com for images and SmallPDF.com for PDFs" -ForegroundColor Cyan
