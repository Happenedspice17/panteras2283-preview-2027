import { useState } from 'react'
import { useAuth } from '../../lib/auth'
import type { Quiz, QuizAttempt } from '../../lib/types'
import { Badge, Button, Card, Stat } from '../../components/ui'

export function QuizTomar({ quiz, registrar, onSalir }: { quiz: Quiz; registrar: (v: Partial<QuizAttempt>) => Promise<boolean>; onSalir: () => void }) {
  const { profile, refresh } = useAuth()
  const [respuestas, setRespuestas] = useState<(number | undefined)[]>(() => quiz.questions.map(() => undefined))
  const [resultado, setResultado] = useState<{ score: number; aprobado: boolean; aciertos: boolean[] } | null>(null)
  const [enviando, setEnviando] = useState(false)
  const completo = respuestas.every((r) => r !== undefined)

  async function enviar() {
    if (!profile || !completo) return
    setEnviando(true)
    const aciertos = quiz.questions.map((q, i) => respuestas[i] === q.answer)
    const score = Math.round((100 * aciertos.filter(Boolean).length) / quiz.questions.length)
    const aprobado = score >= quiz.pass_score
    const ok = await registrar({ quiz_id: quiz.id, user_id: profile.id, score })
    setEnviando(false)
    if (!ok) return
    setResultado({ score, aprobado, aciertos })
    if (aprobado && quiz.area === 'seguridad') await refresh()
  }

  function reintentar() {
    setRespuestas(quiz.questions.map(() => undefined))
    setResultado(null)
  }

  return (
    <Card title={quiz.title} actions={<Button variant="ghost" onClick={onSalir}>Salir</Button>}>
      <p className="muted small" style={{ marginTop: 0 }}>Mínimo para aprobar: {quiz.pass_score}%. Revisa cada pregunta y elige una opción.</p>

      {quiz.questions.map((q, i) => (
        <div key={i} style={{ borderTop: '1px solid var(--line)', padding: '12px 0' }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>{i + 1}. {q.q}</div>
          {q.options.map((opt, j) => (
            <label key={j} className="row" style={{ padding: '2px 0' }}>
              <input
                type="radio"
                name={`q-${quiz.id}-${i}`}
                style={{ width: 'auto' }}
                disabled={!!resultado}
                checked={respuestas[i] === j}
                onChange={() => setRespuestas(respuestas.map((r, k) => (k === i ? j : r)))}
              />
              {opt}
              {resultado && j === q.answer && <Badge tone="ok">Correcta</Badge>}
              {resultado && respuestas[i] === j && j !== q.answer && <Badge tone="bad">Tu respuesta</Badge>}
            </label>
          ))}
          {resultado && (
            <div className={`alert ${resultado.aciertos[i] ? 'alert-info' : 'alert-warn'}`} style={{ marginTop: 8 }}>
              <strong>{resultado.aciertos[i] ? 'Correcto.' : 'Incorrecto.'}</strong> {q.why ?? ''}
            </div>
          )}
        </div>
      ))}

      {!resultado ? (
        <div className="row" style={{ marginTop: 8 }}>
          <Button onClick={enviar} disabled={!completo || enviando}>{enviando ? 'Enviando…' : 'Enviar respuestas'}</Button>
          {!completo && <span className="muted small">Responde todas las preguntas para enviar.</span>}
        </div>
      ) : (
        <div style={{ marginTop: 8 }}>
          <div className="grid" style={{ marginBottom: 12 }}>
            <Stat label="Calificación" value={`${resultado.score}%`} hint={`mínimo ${quiz.pass_score}%`} />
            <Stat label="Resultado" value={resultado.aprobado ? <Badge tone="ok">Aprobado</Badge> : <Badge tone="bad">No aprobado</Badge>} />
          </div>
          {quiz.area === 'seguridad' && resultado.aprobado && <div className="alert alert-info">Inducción de seguridad completa.</div>}
          <div className="row">
            <Button onClick={reintentar}>Reintentar</Button>
            <Button variant="ghost" onClick={onSalir}>Cerrar</Button>
          </div>
        </div>
      )}
    </Card>
  )
}
