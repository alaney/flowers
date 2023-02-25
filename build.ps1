$staticPath = "$PSScriptRoot\backend\static"
$buildPath = "$PSScriptRoot\client\build"

if (Test-Path $staticPath) {
    Remove-Item $staticPath -Recurse 
}
mkdir $staticPath

cd "$PSScriptRoot\client"

npm run build --omit-dev

cd $PSScriptRoot

Copy-Item -Path "$PSScriptRoot\client\build\*" -Destination $staticPath -Recurse

cd "$PSScriptRoot\backend"

go build .