import Image from 'next/image'

// WEB (copy/VISUALS.md): our own site - real work, not a made-up client site - in a browser frame and on a phone,
// side by side. Cropped screenshots of nextbot.me (title + chat; public/screens/web-hero-*.png). Text under it from the brief.

export function WebShowcase() {
  return (
    <figure className="m-0 flex flex-col gap-4">
      <div className="relative flex items-end gap-5 min-[700px]:gap-6">
        {/* browser */}
        <div className="min-w-0 flex-1 overflow-hidden rounded-[12px] border border-line bg-white">
          <div className="flex h-9 items-center border-b border-line px-4">
            <span className="mx-auto rounded-[6px] bg-cream px-3 py-0.5 text-[13px] text-stone">nextbot.me</span>
          </div>
          <Image src="/screens/web-hero-desktop.png" alt="Началото на nextbot.me на компютър: заглавието и чатът на NEO" width={1950} height={1094} sizes="(min-width: 960px) 760px, 100vw" className="block h-auto w-full" />
        </div>
        {/* phone */}
        <div className="hidden w-[150px] shrink-0 rounded-[26px] border border-line bg-white p-1.5 min-[560px]:block min-[700px]:w-[170px]">
          <div className="overflow-hidden rounded-[20px]">
            <Image src="/screens/web-hero-phone.png" alt="Началото на nextbot.me на телефон" width={780} height={1276} sizes="170px" className="block h-auto w-full" />
          </div>
        </div>
      </div>
      <figcaption className="text-[16px] text-ink">Този сайт е направен от нас.</figcaption>
    </figure>
  )
}
