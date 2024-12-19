### Installing node modules
```bash
npm i 
cd frontend
npm i
```

### Building
```bash
npm run build
cd frontend
npm run build
```

### Serving
Build
```bash
npm run start
```

### Serving dev
TTY1: 
```bash
npm run dev
```
TTY2: 
```bash
cd frontend && ng build --watch --configuration development
```
Turn off browser network caching


### ENV
```
SECRET=appSecret - Used to encrypt session
GOOGLE_APPLICATION_CREDENTIALS=path - Path to firebase admin sdk credentials, absolute or relative
```
