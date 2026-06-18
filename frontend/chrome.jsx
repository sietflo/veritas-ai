// VERITAS AI — Nav + ambient bg

const BgStack = () => (
  React.createElement('div', { className: 'bg-stack' },
    React.createElement('div', { className: 'bg-blob b1' }),
    React.createElement('div', { className: 'bg-blob b2' }),
    React.createElement('div', { className: 'bg-blob b3' }),
    React.createElement('div', { className: 'bg-blob b4' })
  )
);

const Brand = () => (
  React.createElement('div', { className: 'brand' },
    React.createElement('div', { className: 'brand-mark' },
      React.createElement('i', null), React.createElement('i', null),
      React.createElement('i', null), React.createElement('i', null)
    ),
    React.createElement('div', { className: 'brand-text' },
      React.createElement('span', { className: 'brand-name' }, 'Veritas'),
      React.createElement('span', { className: 'brand-slash' }, '//'),
      React.createElement('span', { className: 'brand-ai' }, 'AI')
    )
  )
);

const STEPS_FLOW = [
  { id: 'job',  label: 'Вакансія' },
  { id: 'cv',   label: 'Резюме' },
  { id: 'scan', label: 'Аналіз' },
  { id: 'res',  label: 'Звіт' }
];

const Nav = ({ step, onLogo }) => {
  const showSteps = ['job', 'cv', 'scan', 'res'].includes(step);
  const idx = STEPS_FLOW.findIndex(s => s.id === step);

  return React.createElement('nav', { className: 'nav' },
    React.createElement('button', { className: 'brand', onClick: onLogo, style: { background: 'none', cursor: 'pointer', padding: 0 } },
      React.createElement('div', { className: 'brand-mark' },
        React.createElement('i', null), React.createElement('i', null),
        React.createElement('i', null), React.createElement('i', null)
      ),
      React.createElement('div', { className: 'brand-text' },
        React.createElement('span', { className: 'brand-name' }, 'Veritas'),
        React.createElement('span', { className: 'brand-slash' }, '//'),
        React.createElement('span', { className: 'brand-ai' }, 'AI')
      )
    ),

    showSteps && React.createElement('div', { className: 'steps-pill' },
      STEPS_FLOW.map((s, i) => {
        const cls = i < idx ? 'done' : (i === idx ? 'active' : '');
        return React.createElement('div', { key: s.id, className: 'step ' + cls },
          React.createElement('span', { className: 'n' }, i < idx ? '✓' : (i + 1)),
          React.createElement('span', null, s.label)
        );
      })
    )
  );
};

Object.assign(window, { BgStack, Brand, Nav });
