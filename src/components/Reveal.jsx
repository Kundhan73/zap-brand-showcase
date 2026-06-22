import { motion, useReducedMotion } from 'framer-motion'

/**
 * Scroll-triggered reveal. Fades + slides children in the first time they
 * enter the viewport. Respects prefers-reduced-motion.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 28,
  x = 0,
  className = '',
  once = true,
  duration = 0.7,
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}
