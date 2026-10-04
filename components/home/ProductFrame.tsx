// A real product screen goes here (copy/DESIGN-REFRESH.md §1, §9.3). Until Valentin has a screenshot, this is a
// clearly marked empty frame - nothing is drawn. Replace `children` (or pass `src`) when the screen exists.

export function ProductFrame({ what, children, className = '' }: { what: string; children?: React.ReactNode; className?: string }) {
  return (
    <figure className={`m-0 overflow-hidden rounded-[12px] border border-[#E8E1D6] bg-white ${className}`} data-product-screen={what}>
      {/* window bar: a thin line, no dots or colours */}
      <div className="flex h-9 items-center border-b border-[#E8E1D6] px-4 text-[12px] text-stone">{what}</div>
      {children ?? (
        <div className="flex aspect-[16/10] items-center justify-center bg-[#FCFAF7] p-6 text-center">
          <span className="text-[15px] text-stone">екран на продукта</span>
        </div>
      )}
    </figure>
  )
}
