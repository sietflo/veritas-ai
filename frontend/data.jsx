// VERITAS AI — shared data + helpers

// ---------- Mock results ----------
const MOCK_RESULTS = {
  ats_score: 73,
  missing_skills: ["docker", "aws", "kubernetes"],
  warning: "No warnings from the system!",
  ai_coaching: {
    verdict: "Сильний кандидат на роль Python/ML інженера. Технічна основа є, але резюме звучить як список обов'язків, а не як список перемог.",
    strengths: [
      "Глибокий стек Python + FastAPI + scikit-learn точно лягає на вимоги вакансії.",
      "Реальний production-досвід з ML-моделями збігається з тим, що шукає компанія."
    ],
    improvements: [
      {
        section: "Досвід роботи",
        original_text: "Working on ML pipelines and helping team with data tasks.",
        suggested_text: "Designed and shipped 3 ML pipelines on FastAPI, cutting candidate-screening time by 64% (from 12h to 4.3h).",
        reason: "Замість пасивних фраз — активні дієслова та конкретні цифри. Рекрутер за 6 секунд побачить ваш реальний вплив, а не просто перелік технологій."
      },
      {
        section: "Навички",
        original_text: "Python, ML, deep learning, some cloud experience.",
        suggested_text: "Python (5y) · FastAPI · scikit-learn · NLP · Docker · PostgreSQL · AWS (EC2, S3).",
        reason: "Системи відбору шукають конкретні ключові слова. «Some cloud experience» їх не пройде — потрібні точні назви: AWS, Docker, версії, роки досвіду."
      },
      {
        section: "Підсумок",
        original_text: "Motivated developer looking for new challenges in Python.",
        suggested_text: "Python ML-інженер з 5-річним досвідом. Будую production NLP-системи, які витримують 100k запитів на добу.",
        reason: "«Motivated developer» нічого не каже про ваш рівень. Конкретика з цифрами одразу позиціонує вас як senior."
      }
    ]
  },
  vibe_check: {
    company_name: "Datacore Labs",
    culture_summary: "Швидкозростаючий стартап (~180 людей), Series B у 2025 році. Сильна інженерна культура з фокусом на code review та технічні дискусії.",
    application_tone: "active",
    tone_explanation: "Команда цінує проактивних людей з власною думкою. Стандартний загальний cover letter тут спрацює гірше за пряму технічну розмову.",
    emphasize: [
      "Кейси, де ви самостійно ініціювали технічне рішення.",
      "Конкретні метрики: latency, accuracy, cost.",
      "Pet-проєкти або open-source внески."
    ],
    avoid: [
      "Загальні фрази на кшталт «team player», «fast learner».",
      "Cover letter довжиною на 4 абзаци про мотивацію."
    ],
    red_flags: [
      "Кілька свіжих відгуків на Glassdoor згадують переробки перед релізами (Q4 2025)."
    ],
    recent_news: "У квітні 2026 запустили платформу Helix. Найм Python/ML позицій активний — це гарний момент подати заявку.",
    sources: [
      "https://glassdoor.com/datacore-labs",
      "https://techcrunch.com/2025/12/datacore-series-b",
      "https://dou.ua/companies/datacore-labs/reviews/"
    ]
  }
};

const SAMPLE_JOB = `Senior Python / ML Engineer @ Datacore Labs (remote / Kyiv hybrid)

We need a Python developer with strong experience in FastAPI, PostgreSQL and Machine Learning. Must know scikit-learn, Docker and have shipped production NLP systems. Experience with AWS (EC2/S3), Kubernetes and CI/CD is a strong plus.

You will:
— design ML scoring pipelines for our resume-matching platform;
— work alongside the data team on NLP / embedding models;
— own deployment from notebook to production endpoint;
— write code that 60+ engineers will read and extend.

We value ownership, taste, and the ability to argue with a senior over a PR. We don't value 4-paragraph cover letters.`;

const VERITAS_API = "https://ats-hzsq.onrender.com/api/analyze";

const fmtSkill = (s) => s
  .split(/[\s\.]/)
  .map(w => /^[a-z]+$/.test(w) && w.length > 3 ? w[0].toUpperCase() + w.slice(1) : w.toUpperCase())
  .join(' ');

const scoreLabel = (n) => {
  if (n >= 80) return "Чудовий збіг";
  if (n >= 65) return "Сильний збіг";
  if (n >= 50) return "Помірний збіг";
  return "Слабкий збіг";
};

const toneRu = {
  active: "Впевнений",
  conservative: "Стриманий",
  balanced: "Збалансований"
};

Object.assign(window, {
  MOCK_RESULTS, SAMPLE_JOB, VERITAS_API,
  fmtSkill, scoreLabel, toneRu
});
