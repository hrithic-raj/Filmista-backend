import app from './app';
import { config } from './config/confiq';
import { globalErrorHandler } from './middlewares/globalErrorHandler';

// Start the server
const PORT = config.PORT || 3000;

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
