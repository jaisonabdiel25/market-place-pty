Pasos para siempre iniciar un proyecto de node con typescript
1. Instalar TypeScript y demás dependencias
``npm i -D typescript @types/node ts-node-dev rimraf``
2. Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto)
``npx tsc --init --outDir dist/ --rootDir src``
3. Crear scripts para dev, build y start
``  
"dev": "tsnd --respawn --clear src/index.ts",
"build": "rimraf ./dist && tsc",
"start": "npm run build && node dist/index.js"
``