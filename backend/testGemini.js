const dotenv = require('dotenv');
const { generateGeminiContent } = require('./services/geminiService');

// Load environment variables
dotenv.config();

async function run() {
  console.log('Testing Google Gemini API Integration...');
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key' || apiKey.trim() === '') {
    console.error('❌ Error: GEMINI_API_KEY is not configured or detected in environment variables.');
    process.exit(1);
  }

  console.log('✓ GEMINI_API_KEY is detected in environment.');

  const prompt = 'Suggest the best smartphone under ₹20000';
  console.log(`Prompt: "${prompt}"`);
  console.log('Sending request to Gemini API...');

  try {
    const startTime = Date.now();
    const response = await generateGeminiContent(prompt);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log(`\n--- Gemini Response (Received in ${duration}s) ---`);
    console.log(response);
    console.log('--------------------------------------------\n');
    console.log('✓ Gemini API test completed successfully!');
  } catch (error) {
    console.error('❌ Gemini API request failed:');
    console.error(error.message || error);
  }
}

run();
