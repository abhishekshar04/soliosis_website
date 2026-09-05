import { useEffect, useState } from 'react'
import { cn } from './utils'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

export function TypewriterEffect({
  words,
  wordSets,
  className,
  cursorClassName,
  loop = false,
  loopInterval = 7000,
  suffix = null,
}) {
  // words: [{ text: string, className?: string }] — a single fixed phrase.
  // wordSets: [words, words, ...] — a rotating carousel of phrases; when
  // provided, `loop` advances to the next phrase each cycle instead of
  // just retyping the same one. `words` is ignored if `wordSets` is set.
  const phrases = wordSets && wordSets.length > 0 ? wordSets : [words]
  const reducedMotion = usePrefersReducedMotion()
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayedWords, setDisplayedWords] = useState([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const activeWords = phrases[phraseIndex]

  useEffect(() => {
    if (reducedMotion || isComplete) return
    if (currentWordIndex >= activeWords.length) {
      setIsComplete(true)
      return
    }

    const currentWord = activeWords[currentWordIndex]
    const timeout = setTimeout(() => {
      if (currentCharIndex < currentWord.text.length) {
        // Still typing current word
        setCurrentCharIndex(i => i + 1)
      } else {
        // Word complete, move to next
        setDisplayedWords(prev => [...prev, currentWord])
        setCurrentWordIndex(i => i + 1)
        setCurrentCharIndex(0)
      }
    }, currentCharIndex === 0 && currentWordIndex > 0 ? 80 : 60)

    return () => clearTimeout(timeout)
  }, [currentWordIndex, currentCharIndex, activeWords, isComplete, reducedMotion])

  // Reload the animation from scratch on a fixed cadence. Resetting these
  // three values is enough to restart the typing effect above, since
  // they're exactly what it watches. With multiple phrases, also advance
  // to the next one (wrapping back to the first) so the carousel rotates
  // instead of retyping the same phrase forever.
  useEffect(() => {
    if (!loop || reducedMotion) return
    const id = setInterval(() => {
      setDisplayedWords([])
      setCurrentWordIndex(0)
      setCurrentCharIndex(0)
      setIsComplete(false)
      if (phrases.length > 1) {
        setPhraseIndex(i => (i + 1) % phrases.length)
      }
    }, loopInterval)
    return () => clearInterval(id)
  }, [loop, loopInterval, reducedMotion, phrases.length])

  // A repeating type/erase cycle (and, with multiple phrases, the text
  // changing outright) is exactly the kind of indefinite motion
  // prefers-reduced-motion exists to suppress, and the CSS-level animation
  // freeze elsewhere on the site can't reach this JS-timed effect — so
  // bypass it entirely and render the first phrase's finished text with no
  // further changes.
  if (reducedMotion) {
    return (
      <span className={cn('inline', className)}>
        {phrases[0].map((word, i) => (
          <span key={i}>
            <span className={cn('', word.className)}>{word.text}</span>
            {i < phrases[0].length - 1 ? ' ' : ''}
          </span>
        ))}
        {suffix}
      </span>
    )
  }

  const currentWord = activeWords[currentWordIndex]
  const partialText = currentWord ? currentWord.text.slice(0, currentCharIndex) : ''

  return (
    <span className={cn('inline', className)}>
      {displayedWords.map((word, i) => (
        <span key={i}>
          <span className={cn('', word.className)}>{word.text}</span>
          {/* displayedWords is always a prefix of activeWords in the same
              order, so index i lines up with activeWords[i] — this skips
              the space after the true last word instead of just the last
              one typed so far, which would otherwise glue it to a
              still-typing word (e.g. "a" + "STEP" → "aSTEP"). Without this,
              a trailing space sat invisibly after the final word until
              `suffix` started rendering right after it, turning into a
              visible gap before e.g. a closing quote mark. */}
          {i < activeWords.length - 1 ? ' ' : ''}
        </span>
      ))}
      {!isComplete && currentWord && (
        <span>
          <span className={cn('', currentWord.className)}>{partialText}</span>
          <span
            className={cn(
              'inline-block w-[2px] h-[1em] bg-current align-middle ml-0.5',
              cursorClassName,
            )}
            style={{ animation: 'typewriter-blink 1s step-end infinite' }}
          />
        </span>
      )}
      {/* Rendered only once typing finishes, so a static suffix (e.g. a
          closing quote mark) doesn't appear before the words do — and it
          disappears again on the next loop reset, same as the words. */}
      {isComplete && suffix}
      <style>{`
        @keyframes typewriter-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  )
}
