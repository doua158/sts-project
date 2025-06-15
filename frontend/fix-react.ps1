Write-Host "🛠 Nettoyage des fichiers précédents..."
Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue

Write-Host "🧹 Nettoyage du cache npm..."
npm cache clean --force

Write-Host "📦 Installation forcée de react-scripts@5.0.1..."
npm install react-scripts@5.0.1 --save --force

Write-Host "📦 Installation des autres dépendances..."
npm install

Write-Host "✅ Vérification de l'installation de react-scripts..."
if (Test-Path ".\node_modules\react-scripts\bin\react-scripts.js") {
    Write-Host "✅ react-scripts installé avec succès !"
    Write-Host "🚀 Lancement du projet React..."
    npx react-scripts start
} else {
    Write-Host "❌ Échec : react-scripts n'a pas été installé. Vérifie ta connexion ou npm."
}
