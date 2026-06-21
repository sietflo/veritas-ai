


# Veritas//AI — ATS Resume Scanner & AI Coach

Veritas//AI is a modern web application designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS). The application parses a user's resume (PDF) and compares it against a specific job description using a hybrid matching approach (Lexical ML + Generative AI) to provide accurate scores and actionable feedback.

---
<img width="2557" height="1307" alt="Screenshot_1" src="https://github.com/user-attachments/assets/0aa54c00-4e0f-4462-8d70-190aaed55c58" />

---

## 🚀 Live Demo
* **Frontend:** [https://ai-veritas-job.vercel.app/]
* **Backend API:** [https://ats-hzsq.onrender.com/]

---

## 🛠️ Architecture & Tech Stack

* **Backend:** Built with **Python** and **FastAPI** (ASGI), leveraging asynchronous routing to handle file processing and concurrent external API calls without blocking.
* **Frontend:** A responsive, fast React-based user interface deployed via **Vercel CDN**.
* **Data Science & ML:** `scikit-learn` (TF-IDF) for text vectorization and lexical similarity.
* **Generative AI:** Integrated with **Google Gemini 2.5 Flash API** for advanced contextual analysis.
* **Deployment & Cloud:** Hosted on **Render** (Backend) and **Vercel** (Frontend) with cross-origin resource sharing (**CORS**) fully configured.

---

## 🧠 How It Works (Pipeline)

1. **Text Extraction:** The backend receives the resume as `multipart/form-data`, extracts text directly from the PDF in-memory (RAM), and prepares it for analysis. No user files are stored, ensuring data privacy.
2. **Lexical Matching (TF-IDF):** To avoid AI hallucinations during strict statistical calculations, the text is processed using **TF-IDF (Term Frequency-Inverse Document Frequency)** via `scikit-learn`. The system calculates the **Cosine Similarity** between the resume and the job description to output a mathematically grounded, reliable ATS Score.
3. **Contextual Analysis (LLM):** The backend constructs a structured prompt and sends it to the **Google Gemini 2.5 Flash** model. 
4. **Structured JSON Output:** The LLM is strictly constrained to return data matching a specific **JSON Schema**. This ensures the frontend can seamlessly render precise blocks like "Missing Skills", "Strengths", and "Line-by-Line Suggestions (Before/After)".

---
<img width="1497" height="1038" alt="Screenshot_2" src="https://github.com/user-attachments/assets/74ad0ffd-dd8b-41aa-94d2-5996da09a416" />

---

## 🛡️ Notable Features

* **Fault Tolerance (Retry Pattern):** Implemented an automated retry mechanism for external API calls to gracefully handle transient network errors or Google API rate limits (`503 Service Unavailable`).
* **Performance Optimization:** The frontend utilizes an optimized loading sequence that keeps the client UI responsive and smoothly manages long-polling states during heavy AI generation.

---

## 👥 Team & Contribution

This project was developed as a collaborative university initiative by team **Algorteam**. 

**My Role & Core Contributions:**
* **Backend Development:** Integrated the ML pipeline into the backend and configured deployment.
* **AI & ML Pipeline:** Built the hybrid analysis engine, combining **scikit-learn (TF-IDF)** for lexical matching and **Google Gemini 2.5 Flash** for structured feedback generation.
* **DevOps & Infrastructure:** Configured environment variables, handled cross-origin resource sharing (**CORS**), and deployed the production-ready backend service to **Render**.
* **API Integration:** Collaborated closely with the frontend developer to seamlessly connect their React UI with the backend API endpoints and optimize the client-side loading sequence.

*Note: This repository hosts the backend core and DevOps infrastructure. The frontend source is linked on the same GitHub account and managed via our unified deployment pipeline to ensure seamless API integration.*

---
