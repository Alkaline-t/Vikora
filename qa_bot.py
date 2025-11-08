import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# Load model and embeddings
model = SentenceTransformer('all-MiniLM-L6-v2')
local_embeddings = np.load("local_embedding.npy")

# Load your website text chunks (split your text in scrape step accordingly)
with open("website_content.txt", "r", encoding="utf-8") as f:
    text = f.read()

# For demo, split text into chunks by paragraphs
chunks = [chunk.strip() for chunk in text.split('\n\n') if chunk.strip()]

def answer_question(question):
    q_emb = model.encode([question])
    emb_array = local_embeddings
    if emb_array.ndim == 1:
        emb_array = emb_array.reshape(1, -1)
    sims = cosine_similarity(q_emb, emb_array)[0]
    best_idx = sims.argmax()
    full_text = chunks[best_idx]

    # Clean text by removing URLs and new lines
    import re
    clean_text = re.sub(r"http\S+|\n", " ", full_text).strip()

    # Get first 20 words for brevity
    words = clean_text.split()
    short_answer = " ".join(words[:20]) + ("..." if len(words) > 20 else "")
    
    return short_answer

def main():
    print("Ask me anything about your site! (type 'exit' to quit)")
    while True:
        q = input("Question: ")
        if q.lower() == 'exit':
            break
        ans = answer_question(q)
        print(f"Answer: {ans}\n")

if __name__ == "__main__":
    main()
