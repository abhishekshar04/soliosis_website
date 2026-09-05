import { useEffect, useRef, useState } from 'react'
import { cn } from './utils'

export function TypewriterEffect({ words, className, cursorClassName }) {
  // words: [{ text: string, className?: string }]
  const [displayedWords, setDisplayedWords] = useState([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (isComplete) return
    if (currentWordIndex >= words.length) {
      setIsComplete(true)
      return
    }

    const currentWord = words[currentWordIndex]
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
  }, [currentWordIndex, currentCharIndex, words, isComplete])

  const currentWord = words[currentWordIndex]
  const partialText = currentWord ? currentWord.text.slice(0, currentCharIndex) : ''

  return (
    <span className={cn('inline', className)}>
      {displayedWords.map((word, i) => (
        <span key={i}>
          <span className={cn('', word.className)}>{word.text}</span>
          {' '}
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
      <style>{`
        @keyframes typewriter-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  )
}
