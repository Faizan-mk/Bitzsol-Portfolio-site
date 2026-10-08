import { HiOutlineEye, HiOutlineRocketLaunch } from "react-icons/hi2";
import Heading from "@/components/ui/Heading";
import { company, values } from "@/lib/data";

const purposeCards = [
  { label: "Our Mission", text: company.mission, Icon: HiOutlineRocketLaunch },
  { label: "Our Vision", text: company.vision, Icon: HiOutlineEye },
];

export default function Purpose() {
  return (
    <section id="purpose" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="Our Purpose" title="Mission & Vision" />
      <div className="grid gap-5 md:grid-cols-2">
        {purposeCards.map(({ label, text, Icon }) => (
          <div key={label} data-reveal className="spotlight panel panel-hover p-7 sm:p-9">
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-neon/10 text-2xl text-neon">
              <Icon />
            </span>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neon">{label}</p>
            <p className="text-sm leading-relaxed text-white/70 sm:text-base">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <Heading kicker="What Guides Us" title="Our Core Values" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.num} data-reveal className="spotlight panel panel-hover group p-6">
              <div className="mb-4 text-4xl font-extrabold text-white/10 transition group-hover:text-neon">{v.num}</div>
              <h3 className="mb-2 text-base font-semibold text-brand">{v.title}</h3>
              <p className="text-sm leading-relaxed text-white/60">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
