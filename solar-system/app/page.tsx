import Apod from '@/components/apod/Apod';
import DwarfPlanets from '@/components/dwarf/DwarfPlanets';
import Eclipse from '@/components/eclipse/Eclipse';
import Fact from '@/components/fact/Fact';
import GetStarted from '@/components/getstarted/GetStarted';
import PlanetsCarousel from '@/components/planets/PlanetsCarousel';
import { getApod } from '@/lib/apodData';
import { getDwarf } from '@/lib/dwarf';
import { getEclipse } from '@/lib/eclipse';
import getFactOfTheDay from '@/lib/fact';
import { getStarted } from '@/lib/getStarted';
import { getPlanets } from '@/lib/planets';

export default async function Home() {
  const planets = await getPlanets();
  const factData = await getFactOfTheDay();
  const eclipse = await getEclipse();
  const started = await getStarted();
  const dwarf = await getDwarf();
  const apod = await getApod();

  return (
    <>
      <PlanetsCarousel planets={planets} />
      <div className='flex flex-col gap-20'>
        <Fact fact={factData.fact} />
        <Eclipse eclipse={eclipse} />
      </div>
      <GetStarted started={started} />
      <DwarfPlanets dwarf={dwarf} />
      <Apod apod={apod} />
    </>
  );
}
