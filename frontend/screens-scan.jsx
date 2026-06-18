// VERITAS AI — Scan screen (clean, single orb + simple steps)

const SCAN_STEPS = [
  { label: 'Читаємо резюме',                 dur: 800 },
  { label: 'Порівнюємо з вакансією',          dur: 1100 },
  { label: 'Дивимося на компанію',           dur: 1200 },
  { label: 'Готуємо правки',                 dur: 1500 }
];

const ScanScreen = ({ isReady, onDone }) => {
  const [active, setActive] = React.useState(0);
  const [doneSteps, setDoneSteps] = React.useState([]);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (active >= SCAN_STEPS.length) {
      // ЧЕКАЄМО БЕКЕНД: Переходимо далі ТІЛЬКИ якщо дані вже є
      if (isReady) {
        const id = setTimeout(onDone, 500);
        return () => clearTimeout(id);
      }
      return; // Якщо даних ще немає - просто висимо і чекаємо
    }
    const id = setTimeout(() => {
      setDoneSteps((d) => [...d, active]);
      setActive((a) => a + 1);
    }, SCAN_STEPS[active].dur);
    return () => clearTimeout(id);
  }, [active, onDone, isReady]);

  React.useEffect(() => {
    const total = SCAN_STEPS.reduce((s, x) => s + x.dur, 0);
    const passed = SCAN_STEPS.slice(0, active).reduce((s, x) => s + x.dur, 0);
    let p = passed;
    const id = setInterval(() => {
      p += 40;
      let pct = (p / total) * 100;
      
      // ЗАМОРОЗКА: Тримаємо прогрес на 98%, якщо бекенд ще "думає"
      if (!isReady && pct > 98) {
        pct = 98;
      }
      
      setProgress(Math.min(pct, 99));
      if (p >= total && isReady) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [active, isReady]);

// Далі йде твій стандартний return React.createElement...

  return React.createElement('section', { className: 'scan-screen' },
    React.createElement('div', { className: 'scan-stage' },
      React.createElement('div', { className: 'scan-ring r2' }),
      React.createElement('div', { className: 'scan-ring' }),
      React.createElement('div', { className: 'scan-orb' }),
      React.createElement('div', { className: 'scan-progress' }, Math.floor(progress) + '%')
    ),

    React.createElement('h2', { className: 'scan-title' }, 'Аналізуємо'),
    React.createElement('p', { className: 'scan-sub' },
      'Кілька секунд.'
    ),

    React.createElement('div', { className: 'scan-steps' },
      ...SCAN_STEPS.map((s, i) => {
        const cls = doneSteps.includes(i) ? 'done' : (i === active ? 'run' : '');
        return React.createElement('div', { key: i, className: 'scan-step ' + cls },
          React.createElement('span', { className: 'ico' },
            doneSteps.includes(i) ? '✓' : (i + 1)
          ),
          React.createElement('span', null, s.label)
        );
      })
    )
  );
};

Object.assign(window, { ScanScreen });
