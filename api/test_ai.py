import os

from dotenv import load_dotenv
from openai import OpenAI


load_dotenv("api/.env")

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("OPENAI_API_KEY was not found in api/.env")

client = OpenAI(api_key=api_key)

response = client.responses.create(
    model="gpt-5.6-luna",
    input="Reply with exactly: Sentra AI connection successful"
)

print(response.output_text)