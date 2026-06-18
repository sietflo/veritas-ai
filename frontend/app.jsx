// VERITAS//AI — App orchestration with Tweaks panel

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "cyan"
}/*EDITMODE-END*/;

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [step, setStep] = React.useState('boot');
  const [jobText, setJobText] = React.useState('');
  const [cvFile, setCvFile] = React.useState(null);
  const [results, setResults] = React.useState(null);
  const [apiError, setApiError] = React.useState(null);
  const [demoMode, setDemoMode] = React.useState(false);

  const runAnalysis = React.useCallback(async (useMock = false) => {
    setApiError(null);
    if (useMock || !cvFile) {
      setResults(MOCK_RESULTS);
      return;
    }
    try {
      const fd = new FormData();
      fd.append('job_description', jobText);
      fd.append('cv_file', cvFile);
      const resp = await fetch(VERITAS_API, { method: 'POST', body: fd });
      const data = await resp.json();
      if (data.status === 'success') {
        setResults(data.results);
      } else {
        setApiError(data.message || 'Щось пішло не так на сервері');
        setResults(MOCK_RESULTS);
      }
    } catch (e) {
      console.error(e);
      setApiError('Не вдалося звʼязатися з сервером. Показуємо демо-результат.');
      setResults(MOCK_RESULTS);
    }
  }, [jobText, cvFile]);

  React.useEffect(() => {
    if (step === 'scan' && !demoMode) {
      runAnalysis(false);
    }
  }, [step, runAnalysis, demoMode]);

  const handleDemo = () => {
    setJobText(SAMPLE_JOB);
    setResults(MOCK_RESULTS);
    const f = new File(['demo'], 'demo_resume.pdf', { type: 'application/pdf' });
    setCvFile(f);
    setDemoMode(true);
    setStep('scan');
  };

  const restart = () => {
    setResults(null);
    setApiError(null);
    setDemoMode(false);
    setStep('boot');
  };

  let screen;
  if (step === 'boot') {
    screen = React.createElement(HeroScreen, {
      onStart: () => setStep('job'),
      onDemo: handleDemo
    });
  } else if (step === 'job') {
    screen = React.createElement(JobScreen, {
      value: jobText, onChange: setJobText,
      onNext: () => setStep('cv'), onBack: () => setStep('boot')
    });
  } else if (step === 'cv') {
    screen = React.createElement(CVScreen, {
      file: cvFile, onFile: setCvFile,
      onNext: () => setStep('scan'), onBack: () => setStep('job')
    });
  } else if (step === 'scan') {
    // Сигнал готовності: дані прийшли (успіх або помилка), або ми в демо-режимі
    const isDataReady = results !== null || demoMode;
    
    screen = React.createElement(ScanScreen, { 
      isReady: isDataReady,
      onDone: () => setStep('res') 
    });
  } else if (step === 'res') {
    screen = React.createElement(ResultsScreen, {
      data: results || MOCK_RESULTS, onRestart: restart
    });
  }

  return React.createElement(React.Fragment, null,
    React.createElement('div', {
      className: 'app',
      'data-step': step,
      'data-palette': t.palette
    },
      React.createElement(BgStack, null),
      React.createElement('div', { className: 'shell' },
        React.createElement(Nav, { step: step, onLogo: () => setStep('boot') }),
        apiError && React.createElement('div', { className: 'warning-banner' },
          React.createElement('span', { className: 'ico' }, '!'),
          React.createElement('span', null, apiError)
        ),
        screen
      )
    ),

    React.createElement(TweaksPanel, { title: 'Veritas//AI · Tweaks' },
      React.createElement(TweakSection, { label: 'Палітра' }),
      React.createElement(TweakColor, {
        label: 'Колір',
        value: t.palette === 'cyan' ? ['#00e5ff', '#4d8cff', '#b18cff']
            : t.palette === 'violet' ? ['#c084ff', '#ff5fa8', '#6ee0ff']
            : t.palette === 'amber'  ? ['#ffb84d', '#ff6b8a', '#b18cff']
            :                          ['#4dffb1', '#00e5ff', '#4d8cff'],
        options: [
          ['#00e5ff', '#4d8cff', '#b18cff'],
          ['#c084ff', '#ff5fa8', '#6ee0ff'],
          ['#ffb84d', '#ff6b8a', '#b18cff'],
          ['#4dffb1', '#00e5ff', '#4d8cff']
        ],
        onChange: (v) => {
          const map = {
            '["#00e5ff","#4d8cff","#b18cff"]': 'cyan',
            '["#c084ff","#ff5fa8","#6ee0ff"]': 'violet',
            '["#ffb84d","#ff6b8a","#b18cff"]': 'amber',
            '["#4dffb1","#00e5ff","#4d8cff"]': 'emerald'
          };
          setTweak('palette', map[JSON.stringify(v)] || 'cyan');
        }
      })
    )
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App, null));
