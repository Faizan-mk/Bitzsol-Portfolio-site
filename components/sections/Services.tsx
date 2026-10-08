import type { IconType } from "react-icons";
import {
  HiOutlineChartBar, HiOutlineCodeBracket, HiOutlineCpuChip, HiOutlineFilm, HiOutlineFunnel,
  HiOutlineMagnifyingGlass, HiOutlineSparkles, HiOutlineUserGroup,
} from "react-icons/hi2";
import Heading from "@/components/ui/Heading";
import { services } from "@/lib/data";

// one icon per service, in the same order as `services` in lib/data
const icons: IconType[] = [
  HiOutlineCodeBracket, HiOutlineCpuChip, HiOutlineFunnel, HiOutlineChartBar,
  HiOutlineUserGroup, HiOutlineMagnifyingGlass, HiOutlineSparkles, HiOutlineFilm,
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Heading kicker="What We Offer" title="Our Services" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={s.num} data-reveal className="spotlight panel panel-hover group p-6">
              <div className="mb-5 flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neon/10 text-2xl text-neon transition duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-neon group-hover:text-on-neon">
                  <Icon />
                </span>
                <span className="text-3xl font-extrabold text-white/10 transition group-hover:text-neon/40">{s.num}</span>
              </div>
              <h3 className="mb-2 text-base font-semibold text-brand">{s.title}</h3>
              <p className="text-sm leading-relaxed text-white/60">{s.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
