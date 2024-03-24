import { runPreStartupConfig, setupCoreMiddlewares } from './config';
import app from './app'

const PORT = 5000
runPreStartupConfig();

app.listen(PORT);

console.log(`Server running on port ${PORT}`)
