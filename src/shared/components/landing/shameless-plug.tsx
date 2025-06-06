import Link from "next/link"

export default function ShamelessPlug() {
  return (
    <>
      <section className="bg-gradient-to-t from-cyan-200 to-cyan-500 dark:from-fuchsia-600 dark:to-pink-600 text-white rounded-t-3xl h-16 relative">
        <div className="bg-background absolute w-[98%] font-body h-[85%] left-1/2 transform -translate-x-1/2 top-3 rounded-t-3xl flex justify-between items-center flex-wrap text-black dark:text-white">
          <p className="px-10 font-heading text-sm lg:text-lg font-bold">Tenuto</p>
          <p className="px-10 text-xs">
            Created with Love by{" "}
            <Link href={""} className="text-cyan-300 dark:text-fuchsia-600 underline">
              brxjonesdev
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
