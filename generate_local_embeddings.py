from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

with open("website_content.txt", "r", encoding="utf-8") as f:
    text = f.read()

embedding = model.encode(text)

print(f"Embedding vector length: {len(embedding)}")

# Optionally save embedding to a file for later use
import numpy as np
np.save("local_embedding.npy", embedding)
print("✅ Embedding saved to local_embedding.npy")
