import app from './app';
import '@configs/dotenv';

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.info(`🎉 API is running on port: ${PORT}`));
