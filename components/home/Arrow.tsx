/** "→" that nudges 5 px right when its link or card is hovered (mockup .nb-arrow). Needs a `group` parent. */
export function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-block transition-transform duration-[250ms] ease-out group-hover:translate-x-[5px] motion-reduce:transition-none"
    >
      →
    </span>
  )
}
