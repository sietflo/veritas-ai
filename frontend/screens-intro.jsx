// VERITAS AI — Hero, Job, CV screens

const Tips = ({ items }) => (
  React.createElement('div', { className: 'tips' },
    ...items.map((it, i) => React.createElement('div', { key: i, className: 'tip' },
      React.createElement('div', { className: 'k' }, it.k),
      React.createElement('div', { className: 'v' }, it.v)
    ))
  )
);

// ============================================================
// HERO
// ============================================================

const HeroScreen = ({ onStart, onDemo }) => {
  return React.createElement('section', { className: 'screen' },
    React.createElement('div', { className: 'hero' },
      // LEFT
      React.createElement('div', { className: 'hero-left' },
        React.createElement('h1', { className: 'h1' },
          'Знайдіть роботу',
          React.createElement('br', null),
          React.createElement('span', { className: 'grad' }, 'мрії швидше.')
        ),

        React.createElement('p', { className: 'lede' },
          'Veritas//AI порівнює резюме з конкретною вакансією: показує відсоток збігу, які ключові слова додати та як подаватись саме в цю компанію.'
        ),

        React.createElement('div', { className: 'hero-cta-row' },
          React.createElement('button', { className: 'btn', onClick: onStart },
            React.createElement('span', null, 'Перевірити моє резюме'),
            React.createElement('span', { className: 'arrow' }, '→')
          ),
          React.createElement('button', { className: 'btn-text', onClick: onDemo },
            React.createElement('span', { className: 'play' }, '▶'),
            React.createElement('span', null, 'Подивитись приклад звіту')
          )
        )
      ),

      // RIGHT — Orb (no fake badges)
      React.createElement('div', { className: 'hero-orb-wrap' },
        React.createElement('div', { className: 'float-bubble fb1' }),
        React.createElement('div', { className: 'float-bubble fb2' }),
        React.createElement('div', { className: 'float-bubble fb3' }),
        React.createElement('div', { className: 'float-bubble fb4' }),
        React.createElement('div', { className: 'float-bubble fb5' }),
        React.createElement('div', { className: 'hero-orb' })
      )
    )
  );
};

// ============================================================
// STEP 1 — JOB
// ============================================================

const JobScreen = ({ value, onChange, onNext, onBack }) => {
  const isReady = value.trim().length >= 30;
  return React.createElement('section', { className: 'screen' },
    React.createElement('div', { className: 'step-screen' },
      // LEFT
      React.createElement('div', { className: 'left' },
        React.createElement('div', { className: 'step-marker' },
          React.createElement('div', { className: 'num' }, '1'),
          React.createElement('span', null, 'Крок 1 з 2')
        ),
        React.createElement('h2', { className: 'step-title' }, 'Додайте текст вакансії'),
        React.createElement('p', { className: 'step-sub' },
          'Копіюємо весь опис їз сайту — обовʼязки, вимоги, назву компанії.'
        ),
        React.createElement(Tips, { items: [
          { k: 'Весь текст', v: 'Опис, вимоги, умови, інформація про команду — чим більше контексту, тим точніший результат.' },
          { k: 'Назва компанії', v: 'Допоможе зібрати окреме досьє про культуру, новини та рекомендований тон подачі.' },
          { k: 'Мова', v: 'Будь-яка — відповідь буде тією ж мовою, якою написане резюме.' }
        ] })
      ),

      // RIGHT
      React.createElement('div', { className: 'right' },
        React.createElement('div', { className: 'card' },
          React.createElement('div', { className: 'card-pad' },
            React.createElement('div', { className: 'field-label' },
              React.createElement('span', null, 'Опис вакансії'),
              React.createElement('span', { className: 'hint' },
                value.length > 0 ? value.length + ' символів' : 'мінімум 30 символів'
              )
            ),
            React.createElement('textarea', {
              className: 'field',
              value: value,
              onChange: (e) => onChange(e.target.value),
              placeholder: 'Вставте сюди опис посади — наприклад:\n\n"We need a Python developer with FastAPI, PostgreSQL and Machine Learning experience. Must know scikit-learn and Docker..."',
              spellCheck: false
            }),

            React.createElement('div', { className: 'actions' },
              React.createElement('button', { className: 'btn-text', onClick: onBack },
                React.createElement('span', null, '←'),
                React.createElement('span', null, 'Назад')
              ),
              React.createElement('button', {
                className: 'btn-text',
                onClick: () => onChange(SAMPLE_JOB),
                style: { color: 'var(--cy)' }
              },
                React.createElement('span', null, '✦'),
                React.createElement('span', null, 'Спробувати на прикладі')
              ),
              React.createElement('div', { className: 'right' },
                React.createElement('button', { className: 'btn', disabled: !isReady, onClick: onNext },
                  React.createElement('span', null, 'Далі'),
                  React.createElement('span', { className: 'arrow' }, '→')
                )
              )
            )
          )
        )
      )
    )
  );
};

// ============================================================
// STEP 2 — CV
// ============================================================

const CVScreen = ({ file, onFile, onNext, onBack }) => {
  const [over, setOver] = React.useState(false);
  const inputRef = React.useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    if (!/\.(pdf|docx)$/i.test(f.name)) {
      alert('Підтримуються лише .pdf або .docx');
      return;
    }
    onFile(f);
  };

  const formatSize = (b) => {
    if (b < 1024) return b + ' Б';
    if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' КБ';
    return (b / 1024 / 1024).toFixed(2) + ' МБ';
  };

  return React.createElement('section', { className: 'screen' },
    React.createElement('div', { className: 'step-screen' },
      React.createElement('div', { className: 'left' },
        React.createElement('div', { className: 'step-marker' },
          React.createElement('div', { className: 'num' }, '2'),
          React.createElement('span', null, 'Крок 2 з 2')
        ),
        React.createElement('h2', { className: 'step-title' }, 'Завантажте резюме'),
        React.createElement('p', { className: 'step-sub' },
          'PDF або DOCX. Файл обробляється локально й не зберігається.'
        ),
        React.createElement(Tips, { items: [
          { k: 'Формат', v: 'PDF або DOCX до 5 МБ — звичайний резюме-файл, без захисту паролем.' },
          { k: 'Таблиці', v: 'Для DOCX ми вичитуємо й вміст таблиць — туди часто заховані навички та технології.' },
          { k: 'Не підійде', v: 'Скан або фотографія в PDF — потрібен текстовий файл, а не зображення.' }
        ] })
      ),

      React.createElement('div', { className: 'right' },
        React.createElement('div', { className: 'card' },
          React.createElement('div', { className: 'card-pad' },
            React.createElement('div', { className: 'field-label' },
              React.createElement('span', null, 'Файл резюме'),
              React.createElement('span', { className: 'hint' }, file ? 'Файл готовий' : 'PDF або DOCX')
            ),

            !file
              ? React.createElement('div', {
                  className: 'dropzone' + (over ? ' over' : ''),
                  onClick: () => inputRef.current && inputRef.current.click(),
                  onDragOver: (e) => { e.preventDefault(); setOver(true); },
                  onDragLeave: () => setOver(false),
                  onDrop: (e) => {
                    e.preventDefault();
                    setOver(false);
                    handleFile(e.dataTransfer.files[0]);
                  }
                },
                  React.createElement('div', { className: 'dropzone-orb' }, '↑'),
                  React.createElement('div', { className: 'dropzone-title' }, 'Перетягніть файл сюди'),
                  React.createElement('div', { className: 'dropzone-sub' }, 'або натисніть, щоб обрати з комп\'ютера'),
                  React.createElement('input', {
                    ref: inputRef,
                    type: 'file',
                    accept: '.pdf,.docx',
                    style: { display: 'none' },
                    onChange: (e) => handleFile(e.target.files[0])
                  })
                )
              : React.createElement('div', { className: 'dropzone-file' },
                  React.createElement('div', { className: 'ico' },
                    file.name.toLowerCase().endsWith('.pdf') ? 'PDF' : 'DOC'
                  ),
                  React.createElement('div', null,
                    React.createElement('div', { className: 'name' }, file.name),
                    React.createElement('div', { className: 'size' },
                      React.createElement('span', null, formatSize(file.size)),
                      React.createElement('span', null, '·'),
                      React.createElement('span', { className: 'ok' }, '✓ Готовий')
                    )
                  ),
                  React.createElement('button', { className: 'remove', onClick: () => onFile(null), title: 'Видалити' }, '×')
                ),

            React.createElement('div', { className: 'actions' },
              React.createElement('button', { className: 'btn-text', onClick: onBack },
                React.createElement('span', null, '←'),
                React.createElement('span', null, 'Назад')
              ),
              React.createElement('div', { className: 'right' },
                React.createElement('button', {
                  className: 'btn',
                  disabled: !file,
                  onClick: onNext
                },
                  React.createElement('span', null, 'Розпочати аналіз'),
                  React.createElement('span', { className: 'arrow' }, '→')
                )
              )
            )
          )
        )
      )
    )
  );
};

Object.assign(window, { HeroScreen, JobScreen, CVScreen });
