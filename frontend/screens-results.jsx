// VERITAS AI — Results screen

const useTween = (target, dur = 1400) => {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, dur]);
  return val;
};

const CardHead = ({ icon, title, meta }) => (
  React.createElement('div', { className: 'card-head' },
    React.createElement('div', { className: 'ico-bubble' }, icon),
    React.createElement('h3', null, title),
    meta && React.createElement('div', { className: 'meta' }, meta)
  )
);

const ResultsScreen = ({ data, onRestart }) => {
  const score = data.ats_score;
  const scoreAnim = useTween(score, 1400);
  const missing = data.missing_skills || [];
  const ai = data.ai_coaching || {};
  const vibe = data.vibe_check || {};

  // approximate matched skills for visualization
  const ALL_SKILLS = ['python', 'fastapi', 'postgresql', 'machine learning', 'scikit-learn', 'docker', 'aws', 'kubernetes', 'nlp'];
  const matched = ALL_SKILLS.filter(s => !missing.includes(s)).slice(0, 6);
  const matchPct = matched.length / (matched.length + missing.length) * 100;

  return React.createElement('section', { className: 'screen' },
    // ----- Head -----
    React.createElement('div', { className: 'results-head' },
      React.createElement('div', null,
        React.createElement('h2', { className: 'h2' }, 'Ваш результат'),
        React.createElement('p', { style: { fontSize: 16, color: 'var(--t-mid)', marginTop: 8, maxWidth: '60ch', lineHeight: 1.5 } },
          'Що сильно, що варто покращити та як подаватись саме в цю компанію.'
        )
      ),
      React.createElement('div', { className: 'actions' },
        React.createElement('button', { className: 'btn-ghost btn', onClick: onRestart }, '↻ Новий аналіз'),
        React.createElement('button', { className: 'btn' },
          React.createElement('span', null, 'Зберегти звіт'),
          React.createElement('span', { className: 'arrow' }, '↓')
        )
      )
    ),

    React.createElement('div', { className: 'results' },

      // ===== Score card =====
      React.createElement('div', { className: 'score-card' },
        React.createElement('div', { className: 'orb-side' },
          React.createElement('div', { className: 'score-orb' },
            React.createElement('div', { className: 'num' },
              Math.round(scoreAnim),
              React.createElement('span', { className: 'pct' }, '%')
            )
          ),
          React.createElement('div', { className: 'score-orb-label' },
            React.createElement('span', { style: {
              color: score >= 65 ? 'var(--lime)' : (score >= 50 ? 'var(--amber)' : 'var(--rose)')
            } }, scoreLabel(score))
          )
        ),

        React.createElement('div', { className: 'info-side' },
          React.createElement('p', { className: 'verdict-text' }, ai.verdict || '—'),

          React.createElement('div', { className: 'stat-row' },
            React.createElement('div', { className: 'stat' },
              React.createElement('div', { className: 'lbl' }, 'Збіг навичок'),
              React.createElement('div', { className: 'val cy' }, matched.length + '/' + (matched.length + missing.length))
            ),
            React.createElement('div', { className: 'stat' },
              React.createElement('div', { className: 'lbl' }, 'Чого бракує'),
              React.createElement('div', { className: 'val ' + (missing.length > 2 ? 'amber' : 'lime') }, missing.length)
            ),
            React.createElement('div', { className: 'stat' },
              React.createElement('div', { className: 'lbl' }, 'Готових правок'),
              React.createElement('div', { className: 'val cy' }, (ai.improvements || []).length)
            )
          ),

          data.warning && data.warning !== 'No warnings from the system!' &&
            React.createElement('div', { className: 'warning-banner' },
              React.createElement('span', { className: 'ico' }, '!'),
              React.createElement('span', null, data.warning)
            )
        )
      ),

      // ===== Skills =====
      React.createElement('div', { className: 'skills-row' },
        React.createElement('div', { className: 'card' },
          React.createElement(CardHead, {
            icon: '✓',
            title: 'Що вже у вас є',
            meta: matched.length + ' навичок'
          }),
          React.createElement('div', { className: 'card-body' },
            React.createElement('div', { className: 'chips' },
              ...matched.map((s) => React.createElement('span', { key: s, className: 'chip match' }, fmtSkill(s)))
            ),
            React.createElement('div', { style: { marginTop: 20, display: 'flex', alignItems: 'center', gap: 14 } },
              React.createElement('div', { className: 'bar', style: { flex: 1 } },
                React.createElement('div', { className: 'bar-fill', style: { width: matchPct + '%' } })
              ),
              React.createElement('span', { style: { color: 'var(--lime)', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' } },
                Math.round(matchPct) + '% покриття')
            )
          )
        ),

        React.createElement('div', { className: 'card' },
          React.createElement(CardHead, {
            icon: '⋯',
            title: 'Чого не вистачає',
            meta: missing.length + ' пунктів'
          }),
          React.createElement('div', { className: 'card-body' },
            missing.length === 0
              ? React.createElement('p', { style: { color: 'var(--lime)' } },
                  'Чудово — усі ключові навички з вакансії знайшлися у вашому резюме.')
              : React.createElement(React.Fragment, null,
                  React.createElement('div', { className: 'chips' },
                    ...missing.map((s) => React.createElement('span', { key: s, className: 'chip miss' }, fmtSkill(s)))
                  ),
                  React.createElement('p', { style: { color: 'var(--t-mid)', marginTop: 18, fontSize: 14, lineHeight: 1.55 } },
                    'Якщо ви з ними працювали — додайте дослівно.')
                )
          )
        )
      ),

      // ===== Strengths =====
      React.createElement('div', { className: 'card' },
        React.createElement(CardHead, {
          icon: '✦',
          title: 'Ваші сильні сторони',
          meta: (ai.strengths || []).length + ' знайдено'
        }),
        React.createElement('div', { className: 'card-body' },
          React.createElement('div', { className: 'strength-list' },
            (ai.strengths || []).map((s, i) => React.createElement('div', { key: i, className: 'strength-item' },
              React.createElement('div', { className: 'ico' }, '✓'),
              React.createElement('div', { className: 'txt' }, s)
            ))
          )
        )
      ),

      // ===== Patches =====
      React.createElement('div', null,
        React.createElement('div', { className: 'section-h' },
          React.createElement('div', { className: 'left' },
            React.createElement('div', { className: 'title' }, 'Правки до тексту'),
            React.createElement('div', { className: 'sub' }, 'Готові формулювання — копіюйте й вставляйте в резюме.')
          ),
          React.createElement('div', { className: 'tag' },
            React.createElement('span', { className: 'dot' }),
            React.createElement('span', null, (ai.improvements || []).length + ' правки')
          )
        ),
        ...(ai.improvements || []).map((p, i) => React.createElement('div', { key: i, className: 'patch', style: { marginBottom: 16 } },
          React.createElement('div', { className: 'patch-head' },
            React.createElement('span', { className: 'badge' }, 'Правка ' + (i + 1)),
            React.createElement('span', { className: 'section' }, p.section)
          ),
          React.createElement('div', { className: 'patch-body' },
            React.createElement('div', { className: 'patch-side before' },
              React.createElement('div', { className: 'lbl' },
                React.createElement('span', { className: 'pip' }),
                React.createElement('span', null, 'Зараз у резюме')
              ),
              React.createElement('div', { className: 'quote' }, p.original_text)
            ),
            React.createElement('div', { className: 'patch-side after' },
              React.createElement('div', { className: 'lbl' },
                React.createElement('span', { className: 'pip' }),
                React.createElement('span', null, 'Краще написати так')
              ),
              React.createElement('div', { className: 'quote' }, p.suggested_text)
            )
          ),
          React.createElement('div', { className: 'patch-reason' },
            React.createElement('span', { className: 'lbl' }, 'Чому'),
            React.createElement('span', null, p.reason)
          )
        ))
      ),

      // ===== Dossier =====
      React.createElement('div', null,
        React.createElement('div', { className: 'section-h' },
          React.createElement('div', { className: 'left' },
            React.createElement('div', { className: 'title' }, 'Про компанію'),
            React.createElement('div', { className: 'sub' }, 'Контекст для адаптації подачі — яким тоном розмовляти і на чому наголосити.')
          ),
          React.createElement('div', { className: 'tag' },
            React.createElement('span', { className: 'dot' }),
            React.createElement('span', null, 'Дані з відкритих джерел')
          )
        ),
        React.createElement('div', { className: 'dossier' },
          React.createElement('div', { className: 'dossier-head' },
            React.createElement('div', { className: 'company' }, vibe.company_name || 'Компанія'),
            React.createElement('div', { className: 'summary' }, vibe.culture_summary || '')
          ),

          React.createElement('div', { className: 'dossier-grid' },
            React.createElement('div', { className: 'dossier-cell' },
              React.createElement('div', { className: 'head' },
                React.createElement('span', { className: 'dot' }),
                React.createElement('span', null, 'Рекомендований тон')
              ),
              React.createElement('div', { className: 'tone-pill ' + (vibe.application_tone || 'balanced') },
                React.createElement('span', null, toneRu[vibe.application_tone] || 'Збалансований')
              ),
              React.createElement('div', { className: 'tone-why' }, vibe.tone_explanation || '')
            ),

            React.createElement('div', { className: 'dossier-cell' },
              React.createElement('div', { className: 'head' },
                React.createElement('span', { className: 'dot' }),
                React.createElement('span', null, 'Винести на перший план')
              ),
              React.createElement('ul', null,
                ...(vibe.emphasize || []).map((x, i) => React.createElement('li', { key: i }, x))
              )
            ),

            React.createElement('div', { className: 'dossier-cell warn' },
              React.createElement('div', { className: 'head' },
                React.createElement('span', { className: 'dot' }),
                React.createElement('span', null, 'Чого краще уникати')
              ),
              React.createElement('ul', null,
                ...(vibe.avoid || []).map((x, i) => React.createElement('li', { key: i }, x))
              )
            ),

            (vibe.red_flags || []).length > 0 && React.createElement('div', { className: 'dossier-cell danger' },
              React.createElement('div', { className: 'head' },
                React.createElement('span', { className: 'dot' }),
                React.createElement('span', null, 'На що звернути увагу')
              ),
              React.createElement('ul', null,
                ...(vibe.red_flags || []).map((x, i) => React.createElement('li', { key: i }, x))
              )
            )
          ),

          vibe.recent_news && React.createElement('div', { className: 'dossier-news' },
            React.createElement('div', { className: 'ico' }, '◉'),
            React.createElement('div', { className: 'body' },
              React.createElement('span', { className: 'lbl' }, 'Свіжі новини'),
              vibe.recent_news
            )
          ),

          (vibe.sources || []).length > 0 && React.createElement('div', { className: 'dossier-sources' },
            React.createElement('span', { className: 'lbl' }, 'Джерела:'),
            ...vibe.sources.map((s, i) => {
              let host = s;
              try { host = new URL(s).hostname.replace(/^www\./, ''); } catch (e) {}
              return React.createElement('a', { key: i, href: s, target: '_blank', rel: 'noopener' }, host);
            })
          )
        )
      )
    )
  );
};

Object.assign(window, { ResultsScreen });
